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
              <h4>{{ getClassMetadataById(item.class_id)?.name }}</h4>
              <img
                v-if="getClassMetadataById(item.class_id)?.data?.metadata?.image"
                :src="convertImageSrc(getClassMetadataById(item.class_id).data?.metadata.image)"
                height="64"
                width="64"
              /><br />
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
import { useMetadataStore } from '~/stores/metadata';

const router = useRouter();
const buyNFTEvents = ref([] as any[]);

const metadataStore = useMetadataStore();
const { getClassMetadataById, lazyFetchClassMetadata } = metadataStore;

onMounted(async () => {
  buyNFTEvents.value = await getRecentBuyNFTEvents();
  await Promise.all(buyNFTEvents.value.map(v => lazyFetchClassMetadata(v.class_id)));
})

function viewClassListings(classId: string) {
  router.push({ path: `/listings/${classId}` });
}

</script>