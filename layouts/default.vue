<template>
  <div>
    <header>
      <div style="display: flex; flex-wrap:wrap; background-color:#28646e; color: white; padding: 20px;">
        <h1>LikeCoin NFT Marketplace</h1>
        <div style="flex: 1"></div>
        <WalletHeader />
      </div>
      <div style="margin: 10px">
        <NavHeader />
      </div>
    </header>
    <div style="margin: 10px">
      <slot />
    </div>
    <footer>
      <a href="https://liker.land">Writing NFT</a>
      <a href="https://likecoin.github.io/likecoin-nft-dashboard/">NFT Dashboard</a>
      <a href="https://github.com/likecoin/likecoin-nft-marketplace">GitHub</a>
      <a href="https://like.co">About LikeCoin</a>
    </footer>
  </div>
</template>
<style>
body {
  margin: 0;
}

h1 {
  display: inline-block;
}

table,
td,
th {
  border-collapse: collapse;
  border: 1px solid;
}

footer {
  padding: 12px 12px 20px;
  
  display: flex;
  gap: 10px;
}
</style>
