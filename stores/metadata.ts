import { defineStore } from "pinia";

export const useMetadataStore = defineStore("metadata", () => {
  const classMetadata = ref({} as { [key: string]: any });
  const nftMetadata = ref({} as { [key: string]: any });

  function getNFTMetadataKey(classId: string, nftId: string) {
    return `${classId}_${nftId}`;
  }

  const getClassMetadataById = computed(
    () => (classId: string) => classMetadata.value[classId]
  );
  const getNftMetadataById = computed(
    () => (classId: string, nftId: string) =>
      nftMetadata.value[getNFTMetadataKey(classId, nftId)]
  );

  async function fetchClassMetadata(classId: string) {
    classMetadata.value[classId] = await queryNFTClass(classId);
    return classMetadata.value[classId];
  }

  async function lazyFetchClassMetadata(classId: string) {
    const value = classMetadata.value[classId];
    if (value) {
      return value;
    }
    return fetchClassMetadata(classId);
  }

  async function fetchNFTMetadata(classId: string, nftId: string) {
    nftMetadata.value[getNFTMetadataKey(classId, nftId)] = await queryNFT(
      classId,
      nftId
    );
    return nftMetadata.value[getNFTMetadataKey(classId, nftId)];
  }

  async function lazyFetchNFTMetadata(classId: string, nftId: string) {
    const value = nftMetadata.value[getNFTMetadataKey(classId, nftId)];
    if (value) {
      return value;
    }
    return fetchNFTMetadata(classId, nftId);
  }

  return {
    classMetadata,
    nftMetadata,
    getClassMetadataById,
    getNftMetadataById,
    fetchClassMetadata,
    lazyFetchClassMetadata,
    fetchNFTMetadata,
    lazyFetchNFTMetadata,
  };
});
