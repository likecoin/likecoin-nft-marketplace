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
          <tr
            v-for="item, i in effectiveEvents"
            :key="`${item.class_id}_${item.nft_id}`"
          >
            <td>#{{ i + 1 }}</td>
            <td>
              <div>
                <h4>{{ getClassMetadataById(item.class_id)?.name }}</h4>
                <img
                  v-if="getClassMetadataById(item.class_id)?.data?.metadata?.image"
                  :src="convertImageSrc(getClassMetadataById(item.class_id).data?.metadata.image)"
                  height="64"
                  width="64" /><br />
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
              <button @click="viewClassListings(item.class_id)">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import BigNumber from 'bignumber.js';
import { useMetadataStore } from '~/stores/metadata';

const router = useRouter();
const listingEvents = ref([] as any[]);
const buyNFTEvents = ref([] as any[]);

const metadataStore = useMetadataStore();
const { getClassMetadataById, lazyFetchClassMetadata } = metadataStore;

onMounted(async () => {
  listingEvents.value = await getRecentListingEvents()
  buyNFTEvents.value = await getRecentBuyNFTEvents();
  await Promise.all(listingEvents.value.map(v => lazyFetchClassMetadata(v.class_id)));
})

// HACK: assume there will not be a same combo of class id + nft id + seller that is still effective
const effectiveEvents = computed(() => {
  const uuidSet = new Set(buyNFTEvents.value.map(e => `${e.class_id}_${e.nft_id}_${e.seller}`));
  return listingEvents.value.filter(l => !uuidSet.has(`${l.class_id}_${l.nft_id}_${l.creator}`));
})

function viewClassListings(classId: string) {
  router.push({ path: `/listings/${classId}` });
}

</script>
