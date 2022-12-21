import BigNumber from "bignumber.js";
import { ARWEAVE_ENDPOINT, IPFS_VIEW_GATEWAY_URL } from "~/constant";

export function convertLongToNumber(number: any) {
  return new BigNumber(number).shiftedBy(-9).toFixed();
}

export function convertImageSrc(imagePath: string) {
  const [protocol, path] = imagePath.split("://");
  switch (protocol) {
    case "ar":
      return `${ARWEAVE_ENDPOINT}/${path}`;
    case "ipfs":
      return `${IPFS_VIEW_GATEWAY_URL}/${path}`;
    default:
      return imagePath;
  }
}
