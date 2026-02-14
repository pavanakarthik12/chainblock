# ChainBoard - Decentralized Message Board

ChainBoard is a decentralized message board web application built on the **Algorand TestNet**. It allows users to post permanent messages that are stored directly on the blockchain using the `note` field of 0 Algo payment transactions.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Network](https://img.shields.io/badge/network-Algorand%20TestNet-orange)

## 🚀 How It Works

ChainBoard demonstrates a serverless, decentralized architecture:

1.  **Posting**: When you send a message, the app creates a **0 Algo payment transaction** to yourself.
2.  **Storage**: The message text is encoded and placed in the transaction's **note field** (up to 1KB).
3.  **Retrieval**: The app uses the **Algorand Indexer** to fetch the account's history, filters for payment transactions, and decodes the notes to display the message feed.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Blockchain SDK**: `algosdk` (npm package)
- **Network**: Algorand TestNet (via free AlgoNode public endpoints)
- **Styling**: Vanilla CSS (Dark Theme)

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm**
- An **Algorand TestNet Account** (Mnemonic) funded with TestNet Algos.
  - You can create one using Pera Wallet or any Algorand wallet.
  - Fund it using the [Algorand TestNet Dispenser](https://dispenser.testnet.aws.algodev.network/).

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/pavanakarthik12/chainblock.git
    cd chainblock
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Your Account**
    ⚠️ **IMPORTANT**: For this demo, the account mnemonic is hardcoded. **NEVER** do this in a production app.

    Open `src/blockchain/account.ts` and replace the `DEMO_MNEMONIC` string with your funded TestNet account mnemonic:

    ```typescript
    // src/blockchain/account.ts
    export const DEMO_MNEMONIC = "your twenty five word mnemonic here ...";
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```
    Open your browser to `http://localhost:5173`.

## 📂 Project Structure

```
src/
├── blockchain/
│   ├── account.ts       # Account configuration (Mnemonic)
│   ├── algod.ts         # Algod and Indexer client setup
│   ├── sendMessage.ts   # Logic to build and sign transactions
│   └── fetchMessages.ts # Logic to query Indexer and decode notes
├── components/
│   ├── MessageInput.tsx # UI for posting messages
│   └── MessageList.tsx  # UI for displaying message feed
├── App.tsx              # Main application layout
└── index.css            # Global styles and dark theme
```

## ⚠️ Security Disclaimer

This project is a **Proof of Concept**.
- It uses a **client-side hardcoded mnemonic**, which is **NOT secure** for production.
- In a real application, you should use a wallet provider like Pera Connect, Defly, or use a backend signer.
- Do not use this code with Mainnet accounts holding real value.

## 📄 License

MIT
