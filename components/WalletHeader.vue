<template>
  <div style="padding: 20px;">
    <span v-if="wallet">
      <span>{{ wallet }}</span> &nbsp;
      <NuxtLink :to="'/owned'">View my NFT</NuxtLink> &nbsp;
      <button @click="disconnect">Logout</button>
    </span>
    <button v-if="!wallet" @click="connect">Connect</button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWalletStore } from '~/stores/wallet';

const store = useWalletStore();
const { wallet } = storeToRefs(store);
const { connect, disconnect } = store;
</script>
