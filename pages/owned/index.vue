<template>
  <div>
    <h2>View my NFTs</h2>
    <div v-if="!wallet">Please <a href="#" @click.prevent="connect">connect</a> wallet</div>
    <section v-else>
      <div v-if="!ownedList.length">You don't own any NFT on LikeCoin chain</div>
      <table v-else>
        <thead>
          <tr>
            <th>#</th>
            <th>NFT information</th>
            <th>Your Listing</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item, i in ownedList"
            :key="makeKey(item.classId, item.id)"
          >
            <td>#{{ i + 1 }}</td>
            <td>
              <h4>{{ item.data.metadata.name }}</h4>
              <img v-if="item.data.metadata.image" :src="convertImageSrc(item.data.metadata.image)" width="64" height="64"/><br />
              Class ID:
              <NftLink :class-id="item.classId" /><br />
              NFT ID:
              <NftLink :class-id="item.classId" :nft-id="item.id" /><br />
              <button @click="viewClassListings(item.classId)">View NFT Class Listing</button>
            </td>
            <td>
              <section v-if="item.price">
                <div>{{ new BigNumber(item.price).shiftedBy(-9).toFixed() }}LIKE</div>
                <div>till {{ item.expiration }}</div>
                <button @click="goToSellPage(item.classId, item.id)">Edit</button>
                <button @click="deleteNFTListing(item.classId, item.id)">Cancel</button>
              </section>
              <button v-else @click="goToSellPage(item.classId, item.id)">Sell</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import BigNumber from 'bignumber.js';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '~/stores/wallet';
import { queryOwnedNFTClasses, signDeleteNFTListing } from '../../utils/cosmos';

const router = useRouter();

const store = useWalletStore();
const { wallet, signer } = storeToRefs(store);
const ownedMap = ref({} as any);

onMounted(async () => {
  if (!wallet.value) {
    await connect();
  }
  if (!wallet.value) {
    return;
  }
  fetchOwnedAndListingNFTs();
})

watch(wallet, (newWallet) => {
  if (newWallet) fetchOwnedAndListingNFTs();
})


const { connect } = store;

function makeKey(classId: string, nftId: string) {
  return `${classId}_${nftId}`;
}

async function fetchOwnedAndListingNFTs() {
  const [
    ownedList,
    listingEvents
  ] = await Promise.all([
    queryOwnedNFTClasses(wallet.value),
    getNFTMarketplaceListing({ creator: wallet.value }),
  ]);
  ownedList.forEach((n) => {
    ownedMap.value[makeKey(n.classId, n.id)] = n;
  });

  listingEvents.forEach((e: any) => {
    const n = ownedMap.value[makeKey(e.class_id, e.nft_id)];
    n.price = e.price;
    n.expiration = e.expiration;
  });
}

async function viewClassListings(classId: string) {
  router.push({ path: `/listings/${classId}` });
}

async function goToSellPage(classId: string, nftId: string) {
  router.push({ path: `/sell/${classId}/${nftId}` });
}

async function deleteNFTListing(classId: string, nftId: string) {
  if (!wallet.value || !signer.value) {
    await connect();
  }
  if (!wallet.value || !signer.value) return;
  const res = await signDeleteNFTListing(classId, nftId, signer.value, wallet.value);
  console.log(res);
  const nft = ownedMap.value[makeKey(classId, nftId)];
  nft.price = null;
  nft.expiration = null;
}

const ownedList = computed(() => Object.values<any>(ownedMap.value).sort(
  (a, b) => {
    if (a.price && b.price) {
      const expA = Date.parse(a.expiration);
      const expB = Date.parse(b.expiration);
      if (expA < expB) return -1;
      if (expA > expB) return 1;
      return 0;
    }
    if (a.price) return -1; 
    if (b.price) return 1; 
    return 0;
  }
));
</script>
