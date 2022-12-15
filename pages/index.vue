<template>
  <div>
    <form @submit.prevent="onSearchClassId">
      <input v-model="classIdText" placeholder="Search NFT Class ID">
      <input type="submit" value="Search" />
    </form>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const classIdText = ref('');

function onSearchClassId() {
  router.push({ path: `/listings/${classIdText.value}` });
}

</script>
