<template>
  <div>
    <h1>{{ metadata.name }}</h1><br />
    <img v-if="metadata.data?.metadata?.image" :src="convertImageSrc(metadata.data.metadata.image)" width="256"
      height="256" /><br />
    <p>{{ metadata.description }}</p>
    <div>Class ID:
      <NftLink :class-id="classId" />
    </div>
    <a v-if="metadata.data?.metadata?.external_url" :href="metadata.data.metadata.external_url" target="_blank"
      rel="noopener">View External Link</a><br />
    <h2>Listings</h2>
    <section>
      <div v-if="!listing.length">No one is selling this NFT yet</div>
      <table v-else>
        <thead>
          <tr>
            <th>#</th>
            <th>NFT information</th>
            <th>Listing Price</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item, i in listing"
            :key="`${item.classId}_${item.nftId}`"
          >
            <td>#{{ i + 1 }}</td>
            <td>
              <div>
                NFT ID:
                <NftLink :class-id="item.classId" :nft-id="item.nftId" /><br />
                Sold by:
                <UserLink :wallet="item.seller" />
              </div>
            </td>
            <td>
              <section>
                <div>{{ convertLongToNumber(item.price) }} LIKE</div>
                <div>till {{ item.expiration }}</div>
              </section>
              <button @click="buyNFT(item)">Buy</button>
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
import { queryNFTClass, queryListingByNFTClassId } from '../../utils/cosmos';
import { convertLongToNumber, convertImageSrc } from '../../utils';

const router = useRouter();
const route = useRoute();
const store = useWalletStore();
const { wallet, signer } = storeToRefs(store);
const listing = ref([] as any[]);
const metadata = ref({} as any);

const classId = computed(() => route.params.classId as string);
onMounted(async () => {
  metadata.value = await queryNFTClass(classId.value);
  listing.value = await queryListingByNFTClassId(classId.value);
})

const { connect } = store;
async function buyNFT({
  classId,
  nftId,
  seller,
  price,
}: {
  classId: string,
  nftId: string,
  seller: string,
  price: any,
}) {
  if (!wallet.value || !signer.value) {
    await connect();
  }
  if (!wallet.value || !signer.value) return;
  const p = new BigNumber(price).shiftedBy(-9).toNumber();
  const res = await signBuyNFT(classId, nftId, seller, p, signer.value, wallet.value);
  console.log(res);
  router.push({ path: '/owned' });
}
</script>
