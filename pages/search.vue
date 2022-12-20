<template>
    <div>
      <section>
        <h2>Search NFT Class</h2>
        <form @submit.prevent="onSearchClassId">
          <input v-model="classIdText" placeholder="Search NFT Class ID">
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
