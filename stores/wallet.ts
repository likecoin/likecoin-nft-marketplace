import { defineStore } from "pinia";
import {
  Keplr,
  Window as KeplrWindow,
  KeplrSignOptions,
  AccountData,
  OfflineAminoSigner,
  OfflineDirectSigner,
} from "@keplr-wallet/types";
import network from "@/constant/network";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

export const useWalletStore = defineStore("wallet", () => {
  const accounts = ref([] as readonly AccountData[]);
  const signer = ref(null as (OfflineAminoSigner & OfflineDirectSigner) | null);

  const wallet = computed(() => accounts.value[0]?.address);
  const isConnected = computed(() => !!wallet);

  async function connect() {
    if (!window.keplr) return;
    const { keplr } = window;
    await keplr.experimentalSuggestChain(network);
    await keplr.enable(network.chainId);
    if (!window.getOfflineSigner) throw new Error("CANNOT_FIND_OFFLINE_SIGNER");
    const offlineSigner = window.getOfflineSigner(network.chainId);
    signer.value = offlineSigner;
    const acc = await offlineSigner.getAccounts();
    accounts.value = acc;
  }

  async function disconnect() {
    signer.value = null;
    accounts.value = [];
  }

  return { accounts, signer, wallet, isConnected, connect, disconnect };
});
