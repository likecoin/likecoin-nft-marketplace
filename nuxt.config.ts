// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "LikeCoin NFT Marketplace",
      meta: [
        { property: "og:title", content: "LikeCoin NFT Marketplace" },
        {
          name: "description",
          content:
            "Marketplace for all NFT on LikeCoin chain using x/likenft chain module.",
        },
        {
          property: "og:description",
          content:
            "Marketplace for all NFT on LikeCoin chain using x/likenft chain module.",
        },
        {
          property: "og:image",
          content: "https://liker.land/images/og/writing-nft.jpg",
        },
        { name: "theme-color", content: "#28646e" },
      ],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui"
  ],
});
