import React, { useState, useEffect } from 'react';
import {
  Send,
  Check,
  CheckCheck,
  Hash,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChannelItem {
  id: string;
  name: string;
  description: string;
}

interface ChannelGroup {
  id: string;
  name: string;
  channels: ChannelItem[];
}

const CHANNEL_GROUPS: ChannelGroup[] = [
  {
    id: 'projects',
    name: 'Active Projects',
    channels: [
      { id: '#marvel-sms', name: 'marvel-sms', description: 'Project Handover Channel · Encrypted Internal Thread' },
      { id: '#project-orbit', name: 'project-orbit', description: 'Cross-functional Orbit project deliverables' },
    ]
  },
  {
    id: 'operations',
    name: 'Operations & Handoffs',
    channels: [
      { id: '#creative-handoffs', name: 'creative-handoffs', description: 'Design reviews and asset sign-offs' },
    ]
  },
  {
    id: 'general',
    name: 'Company & Announcements',
    channels: [
      { id: '#general-announcements', name: 'general-announcements', description: 'Company-wide updates and memos' },
    ]
  }
];

export const MessagingChannels: React.FC = () => {
  const { currentProfile, setIsSubmitModalOpen } = useApp();

  const [activeChannel, setActiveChannel] = useState('#marvel-sms');
  const [inputText, setInputText] = useState('');

  // Mobile responsiveness detection
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile state for collapsible channels panel and channel groups
  const [isChannelsPanelOpen, setIsChannelsPanelOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

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

  // If mobile view, render the mobile-optimized layout with collapsible groups and full-width message view
  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)', overflow: 'hidden', backgroundColor: 'var(--bg-app)' }}>
        {/* Mobile Channel Groups Collapsible Accordion Header */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border-subtle)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            zIndex: 10,
            flexShrink: 0
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              gap: 8
            }}
          >
            <button
              onClick={() => setIsChannelsPanelOpen(!isChannelsPanelOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: isChannelsPanelOpen ? 'var(--electric-violet-light)' : 'var(--bg-surface-secondary)',
                border: '1px solid',
                borderColor: isChannelsPanelOpen ? 'var(--electric-violet)' : 'var(--border-subtle)',
                padding: '6px 12px',
                borderRadius: 20,
                cursor: 'pointer',
                color: isChannelsPanelOpen ? 'var(--electric-violet)' : 'var(--text-heading)',
                fontSize: '0.82rem',
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
            >
              <Hash size={14} color="var(--electric-violet)" />
              <span style={{ fontWeight: 700 }}>{activeChannel.substring(1)}</span>
              <span style={{ fontSize: '0.72rem', opacity: 0.75, marginLeft: 2 }}>
                ({isChannelsPanelOpen ? 'Close Groups' : 'Change Channel'})
              </span>
              {isChannelsPanelOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>Live Thread</span>
            </div>
          </div>

          {/* Collapsible Channel Groups Drawer */}
          {isChannelsPanelOpen && (
            <div
              style={{
                padding: '8px 12px 14px',
                borderTop: '1px solid var(--border-light)',
                backgroundColor: '#FAFAFC',
                maxHeight: '48vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, padding: '0 4px' }}>
                Channel Categories & Groups
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CHANNEL_GROUPS.map((group) => {
                  const isGroupCollapsed = !!collapsedGroups[group.id];
                  return (
                    <div
                      key={group.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 8,
                        border: '1px solid var(--border-subtle)',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Group Collapsible Toggle Header */}
                      <button
                        onClick={() => toggleGroup(group.id)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {isGroupCollapsed ? (
                            <ChevronRight size={15} color="var(--text-muted)" />
                          ) : (
                            <ChevronDown size={15} color="var(--electric-violet)" />
                          )}
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                            {group.name}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            padding: '2px 7px',
                            borderRadius: 10,
                            backgroundColor: 'var(--bg-surface-secondary)',
                            color: 'var(--text-muted)'
                          }}
                        >
                          {group.channels.length} {group.channels.length === 1 ? 'channel' : 'channels'}
                        </span>
                      </button>

                      {/* Channels inside this group */}
                      {!isGroupCollapsed && (
                        <div style={{ padding: '4px 8px 8px', display: 'flex', flexDirection: 'column', gap: 3, borderTop: '1px solid var(--border-light)' }}>
                          {group.channels.map((ch) => {
                            const isActive = activeChannel === ch.id;
                            return (
                              <button
                                key={ch.id}
                                onClick={() => {
                                  setActiveChannel(ch.id);
                                  setIsChannelsPanelOpen(false);
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  width: '100%',
                                  padding: '8px 10px',
                                  borderRadius: 6,
                                  fontSize: '0.82rem',
                                  fontWeight: isActive ? 700 : 500,
                                  backgroundColor: isActive ? 'var(--electric-violet-light)' : 'transparent',
                                  color: isActive ? 'var(--electric-violet)' : 'var(--text-main)',
                                  border: 'none',
                                  cursor: 'pointer',
                                  textAlign: 'left'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
                                  <Hash size={15} style={{ flexShrink: 0 }} />
                                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {ch.name}
                                  </span>
                                </div>
                                {isActive && (
                                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--electric-violet)' }}>
                                    Active
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Message Area: Fits 100% into mobile */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          {/* Mobile Channel Header */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              flexShrink: 0
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {activeChannel}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Encrypted Internal Thread
              </div>
            </div>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="btn-primary"
              style={{
                height: 34,
                padding: '0 10px',
                fontSize: '0.74rem',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap'
              }}
            >
              <Sparkles size={13} />
              <span>Submit Asset</span>
            </button>
          </div>

          {/* Mobile Message Feed */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              minHeight: 0
            }}
          >
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', gap: 10, width: '100%' }}>
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginTop: 2 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {msg.sender}
                    </span>
                    <span style={{ fontSize: '0.66rem', color: 'var(--text-subtle)', whiteSpace: 'nowrap' }}>
                      {msg.timestamp}
                    </span>
                  </div>
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 12px',
                      marginTop: 4,
                      fontSize: '0.82rem',
                      lineHeight: 1.45,
                      wordBreak: 'break-word'
                    }}
                  >
                    {msg.text}
                    {msg.hasDeliverable && (
                      <div
                        style={{
                          marginTop: 8,
                          padding: 8,
                          backgroundColor: 'var(--bg-surface-secondary)',
                          borderRadius: 6,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6
                        }}
                      >
                        <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                          Deliverable Package: Marvel SMS v3.0
                        </span>
                        <span
                          className="badge badge-healthy"
                          style={{
                            fontSize: '0.62rem',
                            alignSelf: 'flex-start',
                            padding: '2px 6px'
                          }}
                        >
                          Immutable Checksum Verified
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3, fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                    {msg.status === 'READ' ? <CheckCheck size={13} color="#10B981" /> : <Check size={13} />}
                    <span>{msg.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Message Composer */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '10px 12px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexShrink: 0
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeChannel}...`}
              style={{
                flex: 1,
                minWidth: 0,
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-subtle)',
                fontSize: '0.84rem'
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{
                height: 38,
                width: 38,
                minWidth: 38,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                flexShrink: 0
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Desktop view: Left completely untouched as requested
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
