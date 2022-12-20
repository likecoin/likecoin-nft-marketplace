<template>
  <div>
    <h2>View my NFTs</h2>
    <div v-if="!wallet">Please connect wallet</div>
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
          <tr v-for="item, i in ownedList">
            <td>#{{ i + 1 }}</td>
            <td>
              <h4>{{ item.data.metadata.name }}</h4>
              Class ID:
              <NftLink :class-id="item.classId" /><br />
              NFT ID:
              <NftLink :class-id="item.classId" :nft-id="item.id" /><br />
              <button @click="viewClassListings(item.classId)">View NFT Class Listing</button>
            </td>
            <td>
              <button @click="newNFTListing(item.classId, item.id)">Sell</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWalletStore } from '~/stores/wallet';
import { queryOwnedNFTClasses } from '../../utils/cosmos';

const router = useRouter();

const store = useWalletStore();
const { wallet } = storeToRefs(store);
const ownedList = ref([] as any[]);

onMounted(async () => {
  if (!wallet.value) {
    await connect();
  }
  if (!wallet.value) {
    return;
  }
  fetchOwnedNFTs();
})

watch(wallet, (newWallet) => {
  if (newWallet) fetchOwnedNFTs();
})


const { connect } = store;

async function fetchOwnedNFTs() {
  ownedList.value = await queryOwnedNFTClasses(wallet.value);
}

async function viewClassListings(classId: string) {
  router.push({ path: `/listings/${classId}` });
}

async function newNFTListing(classId: string, nftId: string) {
  router.push({ path: `/sell/${classId}/${nftId}` });
}
</script>
