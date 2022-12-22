<template>
  <a :href="`https://${LIKER_LAND_HOST}/${props.wallet}`" target="_blank" rel="noopener">{{ wallet }} </a>
</template>

<script setup lang="ts">
import { LIKER_LAND_HOST } from '~/constant';

const props = defineProps<{
  wallet: string,
}>()
</script>
