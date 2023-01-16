import { defineStore } from "pinia";

export const useMetadataStore = defineStore("metadata", () => {
  const classMetadata = ref({} as { [key: string]: any });
  const nftMetadata = ref({} as { [key: string]: any });
  const blockData = ref({} as { [key: string]: any });

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
  const getBlockTime = computed(
    () => (height: number) => blockData.value[height.toString()]?.header.time,
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

  async function fetchBlockData(height: number) {
    blockData.value[height.toString()] = await queryBlock(height);
    return blockData.value[height.toString()];
  }

  async function lazyFetchBlockData(height: number) {
    let block = blockData.value[height.toString()]
    if (!block) {
      block = await fetchBlockData(height);
    }
    return block;
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
    blockData,
    getClassMetadataById,
    getNftMetadataById,
    getBlockTime,
    fetchClassMetadata,
    lazyFetchClassMetadata,
    fetchBlockData,
    lazyFetchBlockData,
    fetchNFTMetadata,
    lazyFetchNFTMetadata,
  };
});
