<template>
  <a :href="targetUrl" target="_blank" rel="noopener">{{ displayText }} </a>
</template>

<script setup lang="ts">
import { LIKER_LAND_HOST } from '~/constant';

const props = defineProps<{
  classId: string,
  nftId?: string,
}>()

const displayText = computed(() => {
  return props.nftId || props.classId;
});
const targetUrl = computed(() => {
  let url = `https://${LIKER_LAND_HOST}/nft/class/${props.classId}`
  if (props.nftId) url += `/${props.nftId}`;
  return url;
});
</script>
