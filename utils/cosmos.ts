// eslint-disable-next-line import/no-extraneous-dependencies
import { OfflineSigner } from "@cosmjs/proto-signing";
import {
  ISCNSignPayload,
  ISCNSigningClient,
  ISCNQueryClient,
} from "@likecoin/iscn-js";
import { BankExtension, DeliverTxResponse, QueryClient } from "@cosmjs/stargate";
import { RPC_URL } from "~~/constant";
import { ISCNExtension, NFTExtension, LikeNFTExtension } from "@likecoin/iscn-js/dist/queryExtensions";
import { AuthzExtension } from "@cosmjs/stargate/build/modules/authz/queries";
import { PageRequest, PageResponse } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";

let client: ISCNSigningClient | null = null;

export async function getSigningClient(): Promise<ISCNSigningClient> {
  if (!client) {
    const c = new ISCNSigningClient();
    await c.connect(RPC_URL);
    client = c;
  }
  return client;
}

export async function getQueryClient(): Promise<ISCNQueryClient> {
  const c = await getSigningClient();
  return c.getISCNQueryClient();
}

export async function getCosmosQueryClient(): Promise<QueryClient & ISCNExtension & BankExtension & AuthzExtension & NFTExtension & LikeNFTExtension> {
  const c = await getQueryClient();
  const q = await c.getQueryClient();
  return q;
}

export async function queryListingByNFTClassId(classId: string) {
  const c = await getCosmosQueryClient();
  let nextKey = new Uint8Array(0);
  let result: any[] = [];
  do {
    const res: any = await c.likenft.ListingsByClass(classId, PageRequest.fromPartial({ key: nextKey }));
    nextKey = res.pagination?.nextKey;
    result = result.concat(res.listings);
  } while (nextKey && nextKey.length);
  return result;
}

export async function queryOwnedNFTClasses(owner: string) {
  const c = await getQueryClient();
  let nextKey = new Uint8Array(0);
  let result: any[] = [];
  do {
    const res: any = await c.queryNFTByClassAndOwner('', owner, PageRequest.fromPartial({ key: nextKey }));
    nextKey = res.pagination?.nextKey;
    result = result.concat(res.nfts);
  } while (nextKey && nextKey.length);
  return result;
}

export async function queryNFTClass(classId: string) {
  const c = await getQueryClient();
  const res = await c.queryNFTClass(classId);
  return res?.class;
}

export async function signBuyNFT(
  classId: string,
  nftId: string,
  seller: string,
  price: number,
  signer: OfflineSigner,
  address: string,
) {
  const signingClient = await getSigningClient();
  await signingClient.connectWithSigner(RPC_URL, signer);
  const res = await signingClient.buyNFT(address, classId, nftId, seller, price);
  return res as DeliverTxResponse;
}
