import * as algosdk from 'algosdk';
import { algodClient } from './algod';
import { getAccount } from './account';

export const sendMessage = async (text: string): Promise<string> => {
    const account = getAccount();
    if (!account) {
        throw new Error("Account not configured. Please add your mnemonic to src/blockchain/account.ts");
    }

    try {
        const suggestedParams = await algodClient.getTransactionParams().do();
        const note = new TextEncoder().encode(text);

        // use algosdk v2/v3 compatible structure
        // If using v2, 'from' is correct. If v3, 'sender' is correct.
        // The previous error said 'from' does not exist. So we use 'sender'.
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            sender: account.addr,
            receiver: account.addr, // Send to self
            amount: 0,
            note: note,
            suggestedParams: suggestedParams,
        });

        const signedTxn = txn.signTxn(account.sk);
        const response = await algodClient.sendRawTransaction(signedTxn).do();

        // Check if response has txId or txid
        const txId = (response as any).txId || (response as any).txid;

        // Wait for confirmation
        await algosdk.waitForConfirmation(algodClient, txId, 4);

        return txId;
    } catch (error) {
        console.error("Failed to send message:", error);
        throw error;
    }
};
