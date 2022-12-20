<template>
  <div>
    <h1>List NFT for sell</h1>
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
              <h4>{{ nftData?.data?.metadata.name }}</h4>
              Class ID: <NftLink :class-id="classId" /><br />
              NFT ID: <NftLink :class-id="classId" :nft-id="nftId" />
            </div>
            <button @click="viewClassListings(classId)">View current listing for class</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent="createNFTListing">
      <label for="listing-price">Price:</label>
      <input type="number" id="listing-price" v-model="listingPrice" /> LIKE
      <br />
      <label for="listing-expiration">Offer expiration:</label>
      <input type="date" id="listing-expiration" v-model="listingExpiration" :max="maxExpirationValue"
        :min="minExpirationValue" />
      <br />
      <input type="submit" value="Confirm" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWalletStore } from '~/stores/wallet';
import { queryNFTClass, queryNFT, signCreateNFTListing } from '../../../utils/cosmos';

const router = useRouter();
const route = useRoute();
const store = useWalletStore();
const { wallet, signer } = storeToRefs(store);
const classData = ref({} as any);
const nftData = ref({} as any);
const listingPrice = ref(32);
const listingExpiration = ref(new Date(Date.now() + 15552000000).toISOString().split('T')[0]);

const maxExpirationValue = computed(() => new Date(Date.now() + 15552000000).toISOString().split('T')[0]);
const minExpirationValue = computed(() => new Date(Date.now()).toISOString().split('T')[0]);
const classId = computed(() => route.params.classId as string);
const nftId = computed(() => route.params.nftId as string);
onMounted(async () => {
  classData.value = await queryNFTClass(classId.value);
  nftData.value = await queryNFT(classId.value, nftId.value);
})

const { connect } = store;

async function viewClassListings(classId: string) {
  router.push({ path: `/listings/${classId}` });
}

async function createNFTListing() {
  if (!wallet.value || !signer.value) {
    await connect();
  }
  if (!wallet.value || !signer.value) return;
  const expirationInMs = new Date(listingExpiration.value).getTime();
  const res = await signCreateNFTListing(classId.value, nftId.value, listingPrice.value, expirationInMs, signer.value, wallet.value);
  console.log(res);
  viewClassListings(classId.value);
}
</script>

<style scoped>
table,
td,
th {
  border-collapse: collapse;
  border: 1px solid;
}
</style>
