import React, { useState } from 'react';
import {
  Send,
  Paperclip,
  Check,
  CheckCheck,
  Hash,
  Lock,
  Sparkles,
  User,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MessagingChannels: React.FC = () => {
  const { currentProfile, setIsSubmitModalOpen } = useApp();

  const [activeChannel, setActiveChannel] = useState('#marvel-sms');
  const [inputText, setInputText] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'Nina Williams (CMO)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      text: 'Campaign brief for the Marvel SMS launch has been locked. Handoff sent to CPO Kingsley.',
      timestamp: '10:14 AM WAT',
      status: 'READ'
    },
    {
      id: 'msg-2',
      sender: 'Kingsley (Sarah Chen / CPO)',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
      text: 'Brief accepted. Assigned creative mockups to Maya Ray. Looking for AMOLED dark theme revisions.',
      timestamp: '10:30 AM WAT',
      status: 'READ'
    },
    {
      id: 'msg-3',
      sender: 'Maya Ray',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      text: 'Version v3.0 submitted with high-contrast chart components and responsive mobile alignments! Ready for final sign-off.',
      timestamp: '11:45 AM WAT',
      status: 'READ',
      hasDeliverable: true
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: currentProfile.name,
        avatar: currentProfile.avatarUrl,
        text: inputText,
        timestamp: 'Just now',
        status: 'DELIVERED'
      }
    ]);
    setInputText('');
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 70px)', overflow: 'hidden' }}>
      {/* Channels List */}
      <div
        style={{
          width: 260,
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border-light)', fontWeight: 700, fontSize: '0.95rem' }}>
          Team Channels
        </div>

        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {['#marvel-sms', '#project-orbit', '#creative-handoffs', '#general-announcements'].map((ch) => (
            <button
              key={ch}
              onClick={() => setActiveChannel(ch)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: '0.85rem',
                fontWeight: activeChannel === ch ? 700 : 500,
                backgroundColor: activeChannel === ch ? 'var(--electric-violet-light)' : 'transparent',
                color: activeChannel === ch ? 'var(--electric-violet)' : 'var(--text-main)',
                textAlign: 'left'
              }}
            >
              <Hash size={16} />
              <span>{ch.substring(1)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
        {/* Channel Header */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              {activeChannel}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Project Handover Channel · Encrypted Internal Thread
            </div>
          </div>

          <button onClick={() => setIsSubmitModalOpen(true)} className="btn-primary" style={{ height: 36, padding: '0 12px', fontSize: '0.78rem' }}>
            <Sparkles size={14} />
            <span>Submit Asset In Thread</span>
          </button>
        </div>

        {/* Message Feed */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', gap: 12, maxWidth: 680 }}>
              <img
                src={msg.avatar}
                alt={msg.sender}
                style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    {msg.sender}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
                    {msg.timestamp}
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 12,
                    marginTop: 6,
                    fontSize: '0.85rem',
                    lineHeight: 1.5
                  }}
                >
                  {msg.text}
                  {msg.hasDeliverable && (
                    <div style={{ marginTop: 10, padding: 8, backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>Deliverable Package: Marvel SMS v3.0</span>
                      <span className="badge badge-healthy" style={{ fontSize: '0.65rem' }}>Immutable Checksum Verified</span>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  {msg.status === 'READ' ? <CheckCheck size={14} color="#10B981" /> : <Check size={14} />}
                  <span>{msg.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Composer */}
        <form onSubmit={handleSend} style={{ padding: '16px 24px', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 12 }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${activeChannel}...`}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 6,
              border: '1px solid var(--border-subtle)',
              fontSize: '0.88rem'
            }}
          />
          <button type="submit" className="btn-primary" style={{ height: 42 }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
