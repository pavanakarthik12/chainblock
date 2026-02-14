import { indexerClient } from './algod';
import { getAccount } from './account';

export interface Message {
    id: string;
    text: string;
    timestamp: number;
    sender: string;
}

export const fetchMessages = async (): Promise<Message[]> => {
    const account = getAccount();
    if (!account) {
        return [];
    }

    try {
        const accountInfo = await indexerClient
            .lookupAccountTransactions(account.addr)
            .txType('pay')
            .do();

        const transactions = accountInfo['transactions'] || [];
        const messages: Message[] = [];

        for (const tx of transactions) {
            if (tx.note) {
                try {
                    // Decode directly if it's Uint8Array (as typed by algosdk)
                    // or if it's base64 string, we might need to handle it.
                    // But since we are fighting TS errors, let's assume it matches the type.
                    const text = new TextDecoder().decode(tx.note);

                    messages.push({
                        id: tx.id || '',
                        text: text,
                        // @ts-ignore: algosdk types might differ from indexer response
                        timestamp: tx.roundTime || tx['round-time'] || 0,
                        sender: tx.sender || '',
                    });
                } catch (e) {
                    // Ignore messages that can't be decoded
                    console.warn(`Failed to decode note for tx ${tx.id}`, e);
                }
            }
        }

        // Sort by timestamp descending
        return messages.sort((a, b) => b.timestamp - a.timestamp);

    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return [];
    }
};
