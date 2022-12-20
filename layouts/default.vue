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
<style>
h1 {
  display: inline-block;
}

table,
td,
th {
  border-collapse: collapse;
  border: 1px solid;
}
</style>
