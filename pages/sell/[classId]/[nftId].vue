<template>
  <div>
    <h1>{{ isEditMode ? 'Edit NFT listing' : 'List NFT for sell' }}</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>NFT information</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#0</td>
          <td>
            <div>
              <h4>{{ nftData.data?.metadata.name }}</h4>
              <img v-if="nftData.data?.metadata?.image" :src="convertImageSrc(nftData.data?.metadata.image)" width="256"
                height="256" /><br />
              Class ID:
              <NftLink :class-id="classId" /><br />
              NFT ID:
              <NftLink :class-id="classId" :nft-id="nftId" />
            </div>
            <button @click="viewClassListings(classId)">View current listing for class</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent="setNFTListing">
      <label for="listing-price">Price:</label>
      <input type="number" id="listing-price" v-model="listingPrice" /> LIKE
      <br />
      <label for="listing-expiration">Offer expiration:</label>
      <input type="date" id="listing-expiration" v-model="listingExpiration" :max="maxExpirationValue"
        :min="minExpirationValue" />
      <br />
      <input type="submit" value="Confirm" />
    </form>
    <div v-if="isEditMode">
      <br />
      <div>Cancel current listing:</div>
      <button @click="deleteNFTListing()">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BigNumber from 'bignumber.js';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '~/stores/wallet';
import { useMetadataStore } from '~/stores/metadata';
import { signCreateNFTListing } from '../../../utils/cosmos';

const router = useRouter();
const route = useRoute();
const walletStore = useWalletStore();
const metadataStore = useMetadataStore();
const { wallet, signer } = storeToRefs(walletStore);
const classData = ref({} as any);
const nftData = ref({} as any);
const listingPrice = ref(32);
const listingExpiration = ref(new Date(Date.now() + 15552000000).toISOString().split('T')[0]);
const isEditMode = ref(false);

const maxExpirationValue = new Date(Date.now() + 15552000000).toISOString().split('T')[0];
const minExpirationValue = new Date(Date.now()).toISOString().split('T')[0];
const classId = computed(() => route.params.classId as string);
const nftId = computed(() => route.params.nftId as string);

const { connect } = walletStore;
const { lazyFetchClassMetadata, lazyFetchNFTMetadata } = metadataStore;

onMounted(async () => {
  const [
    classRes,
    nftRes,
    listing,
    purchaseRes,
  ] = await Promise.all([
    lazyFetchClassMetadata(classId.value),
    lazyFetchNFTMetadata(classId.value, nftId.value),
    getNFTMarketplaceListing({ classId: classId.value, nftId: nftId.value }),
    queryWritingNFTData(classId.value),
  ]);
  classData.value = classRes;
  nftData.value = nftRes;
  if (listing.length) {
    isEditMode.value = true;
    listingPrice.value = new BigNumber(listing[0].price).shiftedBy(-9).toNumber();
  } else {
    listingPrice.value = purchaseRes.price;
  }
})

async function viewClassListings(classId: string) {
  router.push({ path: `/listings/${classId}` });
}

async function setNFTListing() {
  if (!wallet.value || !signer.value) {
    await connect();
  }
  if (!wallet.value || !signer.value) return;
  const expirationInMs = new Date(listingExpiration.value).getTime();
  const action = isEditMode.value
    ? signUpdateNFTListing(classId.value, nftId.value, listingPrice.value, expirationInMs, signer.value, wallet.value)
    : signCreateNFTListing(classId.value, nftId.value, listingPrice.value, expirationInMs, signer.value, wallet.value);
  const res = await action;
  console.log(res);
  viewClassListings(classId.value);
}

async function deleteNFTListing() {
  if (!wallet.value || !signer.value) {
    await connect();
  }
  if (!wallet.value || !signer.value) return;
  const res = await signDeleteNFTListing(classId.value, nftId.value, signer.value, wallet.value);
  console.log(res);
  viewClassListings(classId.value);
}
</script>
