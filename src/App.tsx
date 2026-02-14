import { useState } from 'react';
import MessageInput from './components/MessageInput';
import MessageList from './components/MessageList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMessageSent = () => {
    // Increment trigger to reload message list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ChainBoard</h1>
        <p>Decentralized Message Board on Algorand TestNet</p>
      </header>

      <main>
        <MessageInput onMessageSent={handleMessageSent} />
        <MessageList refreshTrigger={refreshTrigger} />
      </main>

      <footer className="app-footer">
        <p>Messages are stored permanently on the Algorand Blockchain.</p>
        <p className="disclaimer">
          Demo Application - Do not use with real funds.
        </p>
      </footer>
    </div>
  );
}

export default App;
