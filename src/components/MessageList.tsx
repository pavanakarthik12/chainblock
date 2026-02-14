import React, { useEffect, useState } from 'react';
import { fetchMessages, type Message } from '../blockchain/fetchMessages';

interface MessageListProps {
    refreshTrigger: number;
}

const MessageList: React.FC<MessageListProps> = ({ refreshTrigger }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [autoRefresh, setAutoRefresh] = useState(false);

    useEffect(() => {
        loadMessages();
    }, [refreshTrigger]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (autoRefresh) {
            interval = setInterval(() => {
                loadMessages(true); // Silent refresh
            }, 10000);
        }
        return () => clearInterval(interval);
    }, [autoRefresh]);

    const loadMessages = async (silent = false) => {
        if (!silent) setLoading(true);
        const msgs = await fetchMessages();
        setMessages(msgs);
        if (!silent) setLoading(false);
    };

    const filteredMessages = messages.filter(msg =>
        msg.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="message-list">
            <div className="header">
                <h2>Latest Messages</h2>
                <div className="controls">
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <label className="auto-refresh">
                        <input
                            type="checkbox"
                            checked={autoRefresh}
                            onChange={(e) => setAutoRefresh(e.target.checked)}
                        />
                        Auto-refresh (10s)
                    </label>
                    <button onClick={() => loadMessages()} disabled={loading}>
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </div>

            {filteredMessages.length === 0 && !loading && (
                <p className="empty-state">No messages found.</p>
            )}

            {filteredMessages.map((msg) => (
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
