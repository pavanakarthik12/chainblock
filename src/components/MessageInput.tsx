import React, { useState } from 'react';
import { sendMessage } from '../blockchain/sendMessage';

interface MessageInputProps {
    onMessageSent: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onMessageSent }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [txId, setTxId] = useState<string | null>(null);

    const handleSend = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setError(null);
        setTxId(null);

        try {
            const id = await sendMessage(text);
            setTxId(id);
            setText('');
            onMessageSent();
        } catch (err: any) {
            setError(err.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Post a Message</h2>
            <div className="input-group">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type your message..."
                    disabled={loading}
                    maxLength={1000}
                />
                <span className="char-count">{text.length}/1000</span>
                <button onClick={handleSend} disabled={loading || !text.trim()}>
                    {loading ? 'Posting...' : 'Post'}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {txId && (
                <div className="success">
                    <p>Message sent!</p>
                    <a
                        href={`https://testnet.explorer.perawallet.app/tx/${txId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View on Explorer
                    </a>
                </div>
            )}
        </div>
    );
};

export default MessageInput;
