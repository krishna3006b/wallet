const SOLANA = {
    name: 'SOLANA',
    type: 'mainnet',
    rpcUrl: 'https://api.mainnet-beta.solana.com'
};
const DEVNET = {
    name: 'DEVNET',
    type: 'devnet',
    rpcUrl: 'https://api.devnet.solana.com',
};

// const MumbaiTestnet = {
//     hex: '0x13881',
//     name: 'Mumbai Testnet',
//     rpcUrl: '',
//     ticker: "MATIC"
// };

export const CHAINS_CONFIG = {
    "mainnet": SOLANA,
    "devnet": DEVNET,
};