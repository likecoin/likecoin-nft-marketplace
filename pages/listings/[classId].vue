<template>
  <div>
    <h1>{{ metadata.name }}</h1>
    <h3>{{ classId }}</h3>
    <p>{{ metadata.description }}</p>
    <h2>Listings</h2>
    <ul>
        <li v-for="i in listing">
            {{ i.nftId }} | {{ convertLongToNumber(i.price) }} | {{ i.expiration }}
        </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Long from 'long';
import { queryNFTClass, queryListingByNFTClassId } from '../../utils/cosmos';

const route = useRoute();
const listing = ref();
const metadata = ref({} as any);

const classId = computed(() => route.params.classId as string);
onMounted(async () => {
  metadata.value = await queryNFTClass(classId.value);
  listing.value = await queryListingByNFTClassId(classId.value);
})

function convertLongToNumber(number: any) {
  return Long.fromValue(number).toString()
}
</script>