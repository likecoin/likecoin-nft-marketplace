<template>
  <header>
    <div v-if="wallet">{{ wallet }}</div>
    <button v-if="!wallet" @click="connect">Connect</button>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWalletStore } from '~/stores/wallet';

const store = useWalletStore();
const { wallet } = storeToRefs(store);
const { connect } = store;
</script>
