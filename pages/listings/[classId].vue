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

    <section>
      <h3>Royalty Table</h3>
      <table v-if="royaltyList && royaltyList.length">
        <thead>
          <tr>
            <th>Account</th>
            <th>Ratio</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="config in royaltyList"
            :key="config.account"
          >
            <td><UserLink :wallet="config.account" /></td>
            <td>{{ config.weight }}%</td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        No royalty config found, all revenue is collected by seller except for liker.land sales.
      </div>
      <button v-if="isShowSyncRoyaltyButton" @click="syncRoyaltyWithISCN">
        Press to sync NFT royalty config according to ISCN stakeholders
      </button>
    </section>

    <h2>Listings</h2>
    <section>
      <div v-if="!combinedListing.length">No one is selling this NFT yet</div>
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
            v-for="item, i in combinedListing"
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
                <div v-if="item.expiration">till {{ item.expiration }}</div>
              </section>
              <NftLink v-if="item.isWritingNFT" :class-id="classId">Buy from liker.land</NftLink>
              <button v-else @click="buyNFT(item)">Buy</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import BigNumber from 'bignumber.js';
import Long from 'long';
import { bech32 } from 'bech32';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '~/stores/wallet';
import { useMetadataStore } from '~/stores/metadata';
import { queryListingByNFTClassId, queryISCNById } from '../../utils/cosmos';
import { queryWritingNFTData } from '../../utils/likeco'
import { convertLongToNumber, convertImageSrc } from '../../utils';

const router = useRouter();
const route = useRoute();
const walletStore = useWalletStore();
const metadataStore = useMetadataStore();
const { wallet, signer } = storeToRefs(walletStore);
const listing = ref([] as any[]);
const writingNFTListing = ref([] as any[]);
const royaltyConfig = ref(null as any);
const metadata = ref({} as any);
const iscnData = ref({} as any);
const iscnRoyalty = ref(null as any);

const classId = computed(() => route.params.classId as string);
const combinedListing = computed(() => ([] as any)
  .concat(...listing.value, ...writingNFTListing.value)
  .sort((a: any, b: any) => a.price.toNumber() - b.price.toNumber()));
const royaltyList = computed(() => {
  const rateBasisPoints = (royaltyConfig.value?.rateBasisPoints / 100) || 0;
  const totalWeight = royaltyConfig.value?.stakeholders.reduce((acc: number, s: any) => acc + s.weight, 0) || 1;
  return royaltyConfig.value?.stakeholders?.map((s: any) => ({ ...s, weight: (s.weight / totalWeight) * rateBasisPoints }))
})
const isShowSyncRoyaltyButton = computed(() => {
  const isReady = !!iscnData.value;
  const isOwner = iscnData.value.owner === wallet.value;
  const isNotEqual = iscnRoyalty.value?.length !== royaltyConfig.value?.stakeholders.length;
  const needsUpdate = iscnRoyalty.value?.some((data: any, index: number) => {
    const royaltyData = royaltyConfig.value?.stakeholders[index];
    return (!royaltyData || data.account !== royaltyData.account || data.weight !== royaltyData.weight);
  })
  return isReady && isOwner && isNotEqual && needsUpdate;
});

const { connect } = walletStore;
const { lazyFetchClassMetadata } = metadataStore;

onMounted(async () => {
  await Promise.all([
    lazyFetchClassMetadata(classId.value).then(res => {
      metadata.value = res;
      if (res.data.parent.iscnIdPrefix) {
        queryISCNData(metadata.value.data.parent.iscnIdPrefix);
      }
    }),
    queryListingByNFTClassId(classId.value).then(res => listing.value = res),
    queryWritingNFTListing(classId.value),
    queryRoyalty(),
  ]);
})

async function queryISCNData(iscnId: string) {
  iscnData.value = await queryISCNById(iscnId);
  iscnRoyalty.value = await calcualteRoyaltyFromISCN(iscnData.value.data, iscnData.value.owner);
}

async function queryRoyalty() {
  try {
    const config = await queryNFTClassRoyalty(classId.value);
    if (!config) return;
    const stakeholders = config.stakeholders.map(s => ({
      account: bech32.encode('like', bech32.toWords(s.account)),
      weight: s.weight.toNumber(),
    }));
    royaltyConfig.value = {
      rateBasisPoints: config.rateBasisPoints.toNumber(),
      stakeholders,
    }
  } catch (err) { // might not exists
    console.error(err)
  }
}

async function syncRoyaltyWithISCN() {
  if (!wallet.value || !signer.value) {
    await connect();
  }
  if (!wallet.value || !signer.value) return;
  if (!iscnData.value) return;
  const res = await signCreateRoyltyConfig(
    classId.value,
    iscnData.value.data,
    iscnData.value.owner,
    !!royaltyConfig.value,
    signer.value,
    wallet.value,
  );
  console.log(res);
  await queryRoyalty();
}

async function queryWritingNFTListing(classId: string) {
  const res = await queryWritingNFTData(classId);
  if (res) {
    const { price, metadata : { nextNewNFTId, ownerWallet } } = res;
    writingNFTListing.value = [{
      classId,
      nftId: nextNewNFTId,
      price: Long.fromNumber(price * 1000000000),
      seller: ownerWallet,
      isWritingNFT: true,
    }];
  }
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
