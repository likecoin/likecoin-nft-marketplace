<template>
  <div>
    <section>
      <h2>Search NFT Class</h2>
      <form @submit.prevent="onSearchClassId">
        <input v-model="classIdText" placeholder="Search NFT Class ID">
        <input type="submit" value="Search" />
      </form>
    </section>
    <section>
      <h2>View and Sell NFT</h2>
      <button @click="onViewOwned">View my NFTs</button>
    </section>
    <section v-if="listingEvents.length">
      <h2>Recent NFT Listings</h2>
      <ul>
        <li v-for="i in listingEvents">
          <NuxtLink :to="`/listings/${i.class_id}`">
            {{ i.class_id }} | {{ i.nft_id }} | {{ new BigNumber(i.price).shiftedBy(-9).toFixed() }}LIKE
          </NuxtLink>
        </li>
      </ul>
    </section>
    <section v-if="buyNFTEvents.length">
      <h2>Recent NFT Purchases</h2>
      <li v-for="i in buyNFTEvents">
        <NftLink :class-id="i.class_id" /> |
        <NftLink :class-id="i.class_id" :nft-id="i.nft_id" /> | {{ new BigNumber(i.price).shiftedBy(-9).toFixed() }}LIKE
      </li>
    </section>
  </div>
</template>

<script setup lang="ts">
import BigNumber from 'bignumber.js';

const router = useRouter();
const classIdText = ref('');

const listingEvents = ref([] as any[]);
const buyNFTEvents = ref([] as any[]);

onMounted(async () => {
  [listingEvents.value, buyNFTEvents.value] = await Promise.all([
    getRecentListingEvents(),
    getRecentBuyNFTEvents(),
  ]);
})

function onSearchClassId() {
  router.push({ path: `/listings/${classIdText.value}` });
}

function onViewOwned() {
  router.push({ path: '/owned' });
}

</script>
