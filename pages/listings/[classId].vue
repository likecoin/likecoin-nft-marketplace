<template>
  <div>
    <h1>{{ metadata.name }}</h1>
    <h3><NftLink :class-id="classId" /></h3>
    <p>{{ metadata.description }}</p>
    <h2>Listings</h2>
    <ul>
        <div v-if="!listing.length">No one is selling this NFT yet</div>
        <li v-for="i in listing">
            <div>
              <NftLink :class-id="classId" :nft-id="i.nftId"/>
              <span> | {{ convertLongToNumber(i.price) }} LIKE | </span>
              <UserLink :wallet="i.seller" />
              <span> | {{ i.expiration }}</span>
              <button @click="buyNFT(i)">Buy</button>
            </div>
        </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import BigNumber from 'bignumber.js';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '~/stores/wallet';
import { queryNFTClass, queryListingByNFTClassId } from '../../utils/cosmos';

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
function convertLongToNumber(number: any) {
  return new BigNumber(number).shiftedBy(-9).toFixed();
}
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