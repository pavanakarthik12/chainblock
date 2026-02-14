import * as algosdk from 'algosdk';

// SECURITY WARNING: NEVER HARDCODE MNEMONICS IN PRODUCTION!
// This is for demonstration purposes only on TestNet.
// Replace this mnemonic with your own funded TestNet account mnemonic.
export const DEMO_MNEMONIC = "replace this with your twenty five word mnemonic string created for this demo application only";

export const getAccount = () => {
    try {
        return algosdk.mnemonicToSecretKey(DEMO_MNEMONIC);
    } catch (e) {
        console.error("Invalid mnemonic:", e);
        return null;
    }
};
