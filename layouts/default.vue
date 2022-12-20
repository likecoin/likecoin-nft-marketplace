<template>
  <div>
    <header>
      <div style="display: flex">
        <h1>LikeCoin NFT Marketplace</h1>
        <div style="flex: 1"></div>
        <WalletHeader />
      </div>
      <NavHeader />
    </header>
    <slot />
  </div>
</template>
<style scoped>

h1 {
    display: inline-block;
}
</style>
