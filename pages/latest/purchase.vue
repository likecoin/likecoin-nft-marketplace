<template>
  <section v-if="buyNFTEvents.length">
    <h2>Recent NFT Purchases</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>NFT information</th>
          <th>Purchase Time</th>
          <th>Purchase Price</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item, i in buyNFTEvents"
          :key="`${item.message.class_id}_${item.message.nft_id}`"
        >
          <td>#{{ i + 1 }}</td>
          <td>
            <div>
              <h4>{{ getClassMetadataById(item.message.class_id)?.name }}</h4>
              <img
                v-if="getClassMetadataById(item.message.class_id)?.data?.metadata?.image"
                :src="convertImageSrc(getClassMetadataById(item.message.class_id).data?.metadata.image)"
                height="64"
                width="64"
              /><br />
              Class ID:
              <NftLink :class-id="item.message.class_id" /><br />
              NFT ID:
              <NftLink :class-id="item.message.class_id" :nft-id="item.message.nft_id" /><br />
              Seller:
              <UserLink :wallet="item.message.seller" /><br />
              Buyer:
              <UserLink :wallet="item.message.creator" />
            </div>
            <button @click="viewClassListings(item.message.class_id)">View NFT Class Listing</button>
          </td>
          <td>
            <div v-if="getBlockTime(item.height)">
              {{ (new Date(getBlockTime(item.height))).toString() }}
            </div>
          </td>
          <td>
            <section>
              <div>{{ new BigNumber(item.message.price).shiftedBy(-9).toFixed() }}LIKE</div>
            </section>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import BigNumber from 'bignumber.js';
import { useMetadataStore } from '~/stores/metadata';

const router = useRouter();
const buyNFTEvents = ref([] as any[]);

const metadataStore = useMetadataStore();
const { getClassMetadataById, getBlockTime, lazyFetchClassMetadata, lazyFetchBlockData } = metadataStore;

onMounted(async () => {
  buyNFTEvents.value = await getRecentBuyNFTEvents();
  await Promise.all([
    ...buyNFTEvents.value.map(v => lazyFetchClassMetadata(v.message.class_id)),
    ...buyNFTEvents.value.map(v => lazyFetchBlockData(v.height)),
  ]);
})

function viewClassListings(classId: string) {
  router.push({ path: `/listings/${classId}` });
}

</script>