import * as algosdk from 'algosdk';

const algodToken = '';
const indexerToken = '';
const algodServer = 'https://testnet-api.algonode.cloud';
const indexerServer = 'https://testnet-idx.algonode.cloud';
const port = '';

export const algodClient = new algosdk.Algodv2(algodToken, algodServer, port);
export const indexerClient = new algosdk.Indexer(indexerToken, indexerServer, port);
