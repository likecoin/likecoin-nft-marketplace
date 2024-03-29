// eslint-disable-next-line import/no-extraneous-dependencies
import { OfflineSigner } from "@cosmjs/proto-signing";
import { ISCNSigningClient, ISCNQueryClient, ISCNRecordData } from "@likecoin/iscn-js";
import { parseAndCalculateStakeholderRewards } from '@likecoin/iscn-js/dist/iscn/parsing';
import axios from "axios";
import {
  BankExtension,
  DeliverTxResponse,
  QueryClient,
} from "@cosmjs/stargate";
import { RPC_URL, LCD_URL, LIKER_NFT_FEE_WALLET } from "~/constant";
import {
  ISCNExtension,
  NFTExtension,
  LikeNFTExtension,
} from "@likecoin/iscn-js/dist/queryExtensions";
import { formatMsgSend } from '@likecoin/iscn-js/dist/messages/likenft.js';
import { AuthzExtension } from "@cosmjs/stargate/build/modules/authz/queries";
import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";

let iscnSigningClientPromise: Promise<ISCNSigningClient> | null = null;
let iscnSigningClient: ISCNSigningClient | null = null;

export async function getSigningClient(): Promise<ISCNSigningClient> {
  if (!iscnSigningClient) {
    if (!iscnSigningClientPromise) {
      iscnSigningClientPromise = new Promise(async resolve => {
        const c = new ISCNSigningClient();
        await c.connect(RPC_URL);
        iscnSigningClient = c;
        resolve(c);
      });
    }
    return iscnSigningClientPromise;
  } else {
    return iscnSigningClient;
  }
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

export async function queryNFTClassRoyalty(classId: string) {
  const c = await getCosmosQueryClient();
  const res = await c.likenft.RoyaltyConfig(classId);
  return res?.royaltyConfig;
}

export async function queryISCNById(iscnId: string) {
  const c = await getQueryClient();
  const res = await c.queryRecordsById(iscnId);
  if (!res?.records[0].data) return null;
  return {
    owner: res.owner,
    data: res.records[0].data,
  }
}

export async function queryBlock(height: number) {
  const c = await getQueryClient();
  const sc = await c.getStargateClient()
  const block = await sc.getBlock(height);
  return block;
}

export async function queryISCN(classId: string) {
  const c = await getCosmosQueryClient();
  const res = await c.likenft.RoyaltyConfig(classId);
  return res?.royaltyConfig;
}

export async function calcualteRoyaltyFromISCN(iscnData: ISCNRecordData, iscnOwner: string) {
  const feeAmount = 25000; // 2.5%
  const userAmount = 1000000 - feeAmount; // 1000000 - fee
  const rewardMap = await parseAndCalculateStakeholderRewards(iscnData, iscnOwner, {
    precision: 0,
    totalAmount: userAmount,
  });
  const rewards = Array.from(rewardMap.entries());
  const stakeholders = rewards.map((r) => {
    const [
      account,
      { amount },
    ] = r;
    return {
      account,
      weight: parseInt(amount, 10),
    };
  });
  stakeholders.push({
    account: LIKER_NFT_FEE_WALLET,
    weight: feeAmount,
  })
  return stakeholders;
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

export async function signUpdateNFTListing(
  classId: string,
  nftId: string,
  price: number,
  expirationInMs: number,
  signer: OfflineSigner,
  address: string
) {
  const signingClient = await getSigningClient();
  await signingClient.connectWithSigner(RPC_URL, signer);
  const res = await signingClient.updateNFTListing(
    address,
    classId,
    nftId,
    price,
    expirationInMs
  );
  return res as DeliverTxResponse;
}

export async function signDeleteNFTListing(
  classId: string,
  nftId: string,
  signer: OfflineSigner,
  address: string
) {
  const signingClient = await getSigningClient();
  await signingClient.connectWithSigner(RPC_URL, signer);
  const res = await signingClient.deleteNFTListing(
    address,
    classId,
    nftId
  )
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

export async function signCreateRoyltyConfig(
  classId: string,
  iscnData: ISCNRecordData,
  iscnOwner: string,
  isUpdate: boolean,
  signer: OfflineSigner,
  address: string,
) {
  try {
    const rateBasisPoints = 1000; // 10% as in current chain config
    const stakeholders = await calcualteRoyaltyFromISCN(iscnData, iscnOwner);
    const signingClient = await getSigningClient();
    await signingClient.connectWithSigner(RPC_URL, signer);
    let res: any;
    if (isUpdate) {
      res = signingClient.updateRoyaltyConfig(
        address,
        classId,
        {
          rateBasisPoints,
          stakeholders,
        },
      )
    } else {
      res = signingClient.createRoyaltyConfig(
        address,
        classId,
        {
          rateBasisPoints,
          stakeholders,
        },
      )
    }
    return res as DeliverTxResponse;
  } catch (err) {
    // Don't throw on royalty create, not critical for now
    // eslint-disable-next-line no-console
    console.error(err);
  }
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
    .map((t: any) => ({
      message: t.tx.body.messages.find(
        (m: any) => m["@type"] === "/likechain.likenft.v1.MsgBuyNFT"
      ),
      height: Number(t.height),
    }));
  return events;
}

export async function getNFTMarketplaceListing(
  {
    creator,
    classId,
    nftId,
  }: {
    creator?: string,
    classId?: string,
    nftId?: string,
  }) {
  const items = [] as any[];
  let key = '';
  do {
    const { data } = await axios.get(
      `${LCD_URL}/likechain/likenft/v1/marketplace`,
      {
        params: {
          type: 'listing',
          creator,
          class_id: classId,
          nft_id: nftId,
          'pagination.key': key
        },
      }
    );
    key = data.pagination.next_key;
    if (data.items) {
      items.push(...data.items);
    }
  } while (key);
  return items;
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
