// eslint-disable-next-line import/no-extraneous-dependencies
import { OfflineSigner } from "@cosmjs/proto-signing";
import { ISCNSigningClient, ISCNQueryClient } from "@likecoin/iscn-js";
import axios from "axios";
import {
  BankExtension,
  DeliverTxResponse,
  QueryClient,
} from "@cosmjs/stargate";
import { RPC_URL, LCD_URL } from "~~/constant";
import {
  ISCNExtension,
  NFTExtension,
  LikeNFTExtension,
} from "@likecoin/iscn-js/dist/queryExtensions";
import { formatMsgSend } from '@likecoin/iscn-js/dist/messages/likenft.js';
import { AuthzExtension } from "@cosmjs/stargate/build/modules/authz/queries";
import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";

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

export async function getCosmosQueryClient(): Promise<
  QueryClient &
    ISCNExtension &
    BankExtension &
    AuthzExtension &
    NFTExtension &
    LikeNFTExtension
> {
  const c = await getQueryClient();
  const q = await c.getQueryClient();
  return q;
}

export async function queryListingByNFTClassId(classId: string) {
  const c = await getCosmosQueryClient();
  let nextKey = new Uint8Array(0);
  let result: any[] = [];
  do {
    const res: any = await c.likenft.ListingsByClass(
      classId,
      PageRequest.fromPartial({ key: nextKey })
    );
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
    const res: any = await c.queryNFTByClassAndOwner(
      "",
      owner,
      PageRequest.fromPartial({ key: nextKey })
    );
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

export async function queryNFT(classId: string, nftId: string) {
  const c = await getQueryClient();
  const res = await c.queryNFT(classId, nftId);
  return res?.nft;
}

export async function signBuyNFT(
  classId: string,
  nftId: string,
  seller: string,
  price: number,
  signer: OfflineSigner,
  address: string
) {
  const signingClient = await getSigningClient();
  await signingClient.connectWithSigner(RPC_URL, signer);
  const res = await signingClient.buyNFT(
    address,
    classId,
    nftId,
    seller,
    price
  );
  return res as DeliverTxResponse;
}

export async function signCreateNFTListing(
  classId: string,
  nftId: string,
  price: number,
  expirationInMs: number,
  signer: OfflineSigner,
  address: string
) {
  const signingClient = await getSigningClient();
  await signingClient.connectWithSigner(RPC_URL, signer);
  const res = await signingClient.createNFTListing(
    address,
    classId,
    nftId,
    price,
    expirationInMs
  );
  return res as DeliverTxResponse;
}

export async function signSendNFTs(
  targetAddresses: string[],
  classId: string,
  nftIds: string[],
  signer: OfflineSigner,
  address: string,
  memo: string,
) {
  const signingClient = await getSigningClient();
  await signingClient.connectWithSigner(RPC_URL, signer);
  const messages = targetAddresses.map((target, i) => formatMsgSend(
    address,
    target,
    classId,
    nftIds[i],
  ));
  const res = await signingClient.sendMessages(
    address,
    messages,
    { memo },
  );
  return res as DeliverTxResponse;
}

export async function getRecentListingEvents() {
  const { data } = await axios.get(
    `${LCD_URL}/cosmos/tx/v1beta1/txs?events=message.action%3D%27create_listing%27&pagination.limit=100&order_by=ORDER_BY_DESC`
  );
  const events = data.tx_responses
    .filter((t: any) => !t.code)
    .map((t: any) =>
      t.tx.body.messages.find(
        (m: any) => m["@type"] === "/likechain.likenft.v1.MsgCreateListing"
      )
    );
  return events;
}

export async function getRecentBuyNFTEvents() {
  const { data } = await axios.get(
    `${LCD_URL}/cosmos/tx/v1beta1/txs?events=message.action%3D%27buy_nft%27&pagination.limit=100&order_by=ORDER_BY_DESC`
  );
  const events = data.tx_responses
    .filter((t: any) => !t.code)
    .map((t: any) =>
      t.tx.body.messages.find(
        (m: any) => m["@type"] === "/likechain.likenft.v1.MsgBuyNFT"
      )
    );
  return events;
}

export async function getNFTs({ classId = '', owner = '', needCount = 0 }) {
  const baseURL = `${LCD_URL}/cosmos/nft/v1beta1/nfts?owner=${owner}&class_id=${classId}`;
  const nfts = [];
  let pageCounts = 0;
  let key = '';
  let total = 0;
  do {
    /* eslint-disable no-await-in-loop */
    const { data } = await axios.get(`${baseURL}&pagination.key=${key}`);
    key = data.pagination.next_key;
    nfts.push(...data.nfts);
    if (!total) total = data.pagination.total;
    if ((needCount && nfts.length > needCount) || nfts.length >= total) break;
    pageCounts += 1;
  } while (key);
  return { nfts };
}
