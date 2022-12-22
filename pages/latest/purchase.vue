<template>
  <section v-if="buyNFTEvents.length">
    <h2>Recent NFT Purchases</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>NFT information</th>
          <th>Purchase Price</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item, i in buyNFTEvents"
          :key="`${item.class_id}_${item.nft_id}`"
        >
          <td>#{{ i + 1 }}</td>
          <td>
            <div>
              Class ID:
              <NftLink :class-id="item.class_id" /><br />
              NFT ID:
              <NftLink :class-id="item.class_id" :nft-id="item.nft_id" /><br />
              Seller:
              <UserLink :wallet="item.seller" /><br />
              Buyer:
              <UserLink :wallet="item.creator" />
            </div>
            <button @click="viewClassListings(item.class_id)">View NFT Class Listing</button>
          </td>
          <td>
            <section>
              <div>{{ new BigNumber(item.price).shiftedBy(-9).toFixed() }}LIKE</div>
            </section>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import BigNumber from 'bignumber.js';

const router = useRouter();
const buyNFTEvents = ref([] as any[]);

onMounted(async () => {
  buyNFTEvents.value = await getRecentBuyNFTEvents();
})

function viewClassListings(classId: string) {
  router.push({ path: `/listings/${classId}` });
}

</script>