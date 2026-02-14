import React, { useEffect, useState } from 'react';
import { fetchMessages, type Message } from '../blockchain/fetchMessages';

interface MessageListProps {
    refreshTrigger: number;
}

const MessageList: React.FC<MessageListProps> = ({ refreshTrigger }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadMessages();
    }, [refreshTrigger]);

    const loadMessages = async () => {
        setLoading(true);
        const msgs = await fetchMessages();
        setMessages(msgs);
        setLoading(false);
    };

    return (
        <div className="message-list">
            <div className="header">
                <h2>Latest Messages</h2>
                <button onClick={loadMessages} disabled={loading}>
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {messages.length === 0 && !loading && (
                <p className="empty-state">No messages found on chain.</p>
            )}

            {messages.map((msg) => (
                <div key={msg.id} className="message-card">
                    <p className="message-text">{msg.text}</p>
                    <div className="message-meta">
                        <span className="timestamp">
                            {new Date(msg.timestamp * 1000).toLocaleString()}
                        </span>
                        <a
                            href={`https://testnet.explorer.perawallet.app/tx/${msg.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tx-link"
                        >
                            ID: {msg.id.substring(0, 8)}...
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
