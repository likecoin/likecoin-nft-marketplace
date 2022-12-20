export const IS_TESTNET = false;

export const CHAIN_ID = IS_TESTNET ? 'likecoin-public-testnet-5' : 'likecoin-chain-2'
export const RPC_URL = IS_TESTNET ? 'https://node.testnet.like.co/rpc/' : 'https://mainnet-node.like.co/rpc/';
export const LCD_URL = IS_TESTNET ? 'https://node.testnet.like.co/' : 'https://mainnet-node.like.co/';
export const LIKER_LAND_HOST = `${IS_TESTNET ? 'rinkeby.' : ''}liker.land`;
