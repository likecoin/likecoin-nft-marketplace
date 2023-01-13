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
    <footer>
      <a href="https://liker.land">Writing NFT</a>
      <a href="https://likecoin.github.io/likecoin-nft-dashboard/">NFT Dashboard</a>
      <a href="https://github.com/likecoin/likecoin-nft-marketplace">Github</a>
      <a href="https://like.co">About LikeCoin</a>
    </footer>
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

footer {
  margin: 5px;
}

footer a {
  margin-left: 10px;
}

</style>
