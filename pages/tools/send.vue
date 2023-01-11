<template>
  <div>
    <h2>Send NFTs</h2>
    <div v-if="!wallet">Please <a href="#" @click.prevent="connect">connect</a> wallet</div>
    <section v-else>
      <section>
        <label>NFT Class ID</label>
        <br />
        <input v-model="classId" size="50"/>
        <a
          href="#"
          @click.prevent="showNftIdList = true"
          v-if="!showNftIdList"
        >
          Maunally enter ID (optional)
        </a>
        <template v-else>
          <br />
          <label>Enter List of NFT IDs to send (optional)</label>
          <br />
          <textarea
            v-model="nftIdListInput"
            cols="50"
            rows="10"
          ></textarea>
        </template>
      </section>
      <section>
          <label>Recepient Address list</label>
          <br />
          <textarea
            v-model="addressListInput"
            cols="50"
            rows="10"
          ></textarea>
      </section>
      <section>
        <label>Transfer message</label>
        <br />
        <textarea
          v-model="memoString"
          cols="50"
          rows="3"
        ></textarea>
      </section>
      <a
        v-if="transactionHash"
        :href="`${CHAIN_EXPLORER_URL}/${transactionHash}`"
        target="_blank"
        rel="noopener"
      >
        Success, view transaction here
      </a>
      <div v-else-if="isLoading">Loadings...</div>
      <button v-else @click="sendNFTs">Send</button>
      <div v-if="error">{{ error }}</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWalletStore } from '~/stores/wallet';
import { CHAIN_EXPLORER_URL } from '~/constant';

const store = useWalletStore();
const { wallet, signer } = storeToRefs(store);
const classId = ref('');
const showNftIdList = ref(false);
const nftIdListInput = ref('');
const addressListInput = ref('');
const memoString = ref('');
const isLoading = ref(false);
const transactionHash = ref('');
const error = ref('');

const nftIdList = computed(() => nftIdListInput.value.trim().split('\n').filter(n => !!n));
const addressList= computed(() => addressListInput.value.trim().split('\n').filter(n => !!n));

const { connect } = store;
async function sendNFTs() {
  error.value = '';
  isLoading.value = false;
  if (!wallet.value || !signer.value) {
    await connect();
  }
  if (!wallet.value || !signer.value) return;
  try {
    isLoading.value = true;
    let nftList = nftIdList.value;
    if (!nftList || !nftList.length) {
      const { nfts } = await getNFTs({ classId: classId.value , owner: wallet.value, needCount: addressList.value.length });
      nftList = nfts.map(n => n.id);
    }
    if (nftList.length < addressList.value.length) throw new Error('NOT_ENOUGH_NFT_TO_SEND');
    const res = await signSendNFTs(
      addressList.value,
      classId.value,
      nftList,
      signer.value,
      wallet.value,
      memoString.value,
    );
    isLoading.value = false;
    transactionHash.value = res.transactionHash;
  } catch (err) {
    console.error(err);
    error.value = (err as Error).toString();
  }
}

</script>
