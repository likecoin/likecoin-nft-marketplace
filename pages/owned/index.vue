<template>
  <div>
    <h2>Owned NFTs</h2>
    <div v-if="!wallet">Please connect wallet</div>
    <section v-else>
      <ul>
        <div v-if="!ownedList.length">You don't own any NFT on LikeCoin chain</div>
        <li v-for="i in ownedList">
          <div>
            <span>{{ i.classId }} | {{ i.id }} | {{ i.data.metadata.name }}</span>
            <button @click="viewClassListings(i.classId)">View Listing</button>
            <button @click="newNFTListing(i.classId, i.id)">Sell</button>
          </div>
        </li>
      </ul>
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