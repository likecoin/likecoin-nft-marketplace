<template>
  <div>
    <section>
      <h2>Search NFT Class</h2>
      <form @submit.prevent="onSearchClassId">
        <input v-model="classIdText" placeholder="Search NFT Class ID">
        <input type="submit" value="Search" />
      </form>
    </section>
    <section>
      <h2>View and Sell NFT</h2>
      <button @click="onViewOwned">View my NFTs</button>
    </section>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const classIdText = ref('');

function onSearchClassId() {
  router.push({ path: `/listings/${classIdText.value}` });
}

function onViewOwned() {
  router.push({ path: '/owned' });
}

</script>
