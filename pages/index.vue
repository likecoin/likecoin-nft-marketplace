<template>
  <div>
    <section v-if="listingEvents.length">
      <h2>Recent NFT Listings</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>NFT information</th>
            <th>Listing Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item, i in listingEvents">
            <td>#{{ i + 1 }}</td>
            <td>
              <div>
                Class ID:
                <NftLink :class-id="item.class_id" /><br />
                NFT ID:
                <NftLink :class-id="item.class_id" :nft-id="item.nft_id" /><br />
                Owner:
                <UserLink :wallet="item.creator" />
              </div>
              <button @click="viewClassListings(item.class_id)">View NFT Class Listing</button>
            </td>
            <td>
              <section>
                <div>{{ new BigNumber(item.price).shiftedBy(-9).toFixed() }}LIKE</div>
                <div>till {{ item.expiration }}</div>
              </section>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import BigNumber from 'bignumber.js';

const router = useRouter();
const listingEvents = ref([] as any[]);

onMounted(async () => {
  listingEvents.value = await getRecentListingEvents()
})

function viewClassListings(classId: string) {
  router.push({ path: `/listings/${classId}` });
}

</script>
