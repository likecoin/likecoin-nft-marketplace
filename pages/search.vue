<template>
  <div>
    <section>
      <h2>Search NFT</h2>
      <form @submit.prevent="onSearchClassId">
        <input v-model="classIdText" placeholder="Search NFT by Class">
        <input type="submit" value="Search" />
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const classIdText = ref('');

function onSearchClassId() {
  router.push({ path: `/listings/${classIdText.value}` });
}
</script>
