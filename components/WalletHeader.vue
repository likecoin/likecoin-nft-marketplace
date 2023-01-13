<template>
  <div style="display:flex; flex-wrap:wrap; justify-content: center; align-items: center; gap: 10px;">
    <template v-if="wallet">
      <span>{{ wallet }}</span>
      <NuxtLink :to="'/owned'">View my NFT</NuxtLink>
      <button @click="disconnect">Logout</button>
    </template>
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
