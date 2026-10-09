import React, { useState } from 'react';
import {
  Lock,
  Mail,
  User,
  Briefcase,
  Building2,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const LoginView: React.FC = () => {
  const { login, register, allProfiles } = useApp();

  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  
  // Sign in state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regTitle, setRegTitle] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('DEVELOPER');
  const [regDept, setRegDept] = useState('Web and Digital Products');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const success = login(email, password);
    if (!success) {
      setLoginError('Invalid credentials. Check your email or use one of the 1-Click Fast Logins below.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regTitle) {
      alert('Please fill out all required fields.');
      return;
    }
    register({
      name: regName,
      email: regEmail,
      password: regPassword,
      title: regTitle,
      role: regRole,
      department: regDept
    });
  };

  const handleFastLogin = (profileEmail: string) => {
    login(profileEmail, 'password123');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'radial-gradient(circle at 50% 20%, #15193B 0%, #05081E 60%, #000422 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 500,
          height: 350,
          background: 'radial-gradient(circle, rgba(65, 0, 245, 0.25) 0%, rgba(136, 95, 255, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: 480,
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 25px 60px -15px rgba(0, 4, 34, 0.6), 0 0 30px rgba(65, 0, 245, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Brand Top Header */}
        <div
          style={{
            padding: '28px 28px 20px',
            background: 'linear-gradient(135deg, #05081E 0%, #0F172A 100%)',
            color: '#FFFFFF',
            textAlign: 'center',
            borderBottom: '1px solid var(--border-dark)'
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'linear-gradient(135deg, var(--midnight) 0%, var(--electric-violet) 100%)',
              border: '2px solid var(--lavender)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: '0 0 20px rgba(65, 0, 245, 0.5)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.6rem',
                color: '#FFFFFF'
              }}
            >
              D
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.02em'
            }}
          >
            D'Creativs Operations Hub
          </h1>
          <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: 4 }}>
            Authenticated Role-Based Operations & Executive Portals
          </p>

          {/* Tab Selector */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 8,
              padding: 3,
              marginTop: 20
            }}
          >
            <button
              onClick={() => {
                setActiveTab('signin');
                setLoginError(null);
              }}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: 6,
                fontSize: '0.82rem',
                fontWeight: activeTab === 'signin' ? 700 : 500,
                backgroundColor: activeTab === 'signin' ? 'var(--electric-violet)' : 'transparent',
                color: '#FFFFFF',
                boxShadow: activeTab === 'signin' ? '0 2px 8px rgba(65, 0, 245, 0.4)' : 'none'
              }}
            >
              Staff Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                setLoginError(null);
              }}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: 6,
                fontSize: '0.82rem',
                fontWeight: activeTab === 'register' ? 700 : 500,
                backgroundColor: activeTab === 'register' ? 'var(--electric-violet)' : 'transparent',
                color: '#FFFFFF',
                boxShadow: activeTab === 'register' ? '0 2px 8px rgba(65, 0, 245, 0.4)' : 'none'
              }}
            >
              Create Staff Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div style={{ padding: '24px 28px' }}>
          {loginError && (
            <div
              style={{
                marginBottom: 16,
                padding: '10px 14px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: 6,
                fontSize: '0.82rem',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{loginError}</span>
            </div>
          )}

          {activeTab === 'signin' ? (
            <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. pleasant@dcreativs.com"
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.88rem'
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (default: password123)"
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.88rem'
                    }}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', height: 44, marginTop: 4 }}>
                <KeyRound size={16} />
                <span>Sign In to Dashboard</span>
              </button>

              {/* 1-Click Fast Login Grid */}
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10, textAlign: 'center' }}>
                  ⚡ 1-Click Fast Login (Role Demo)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => handleFastLogin('pleasant@dcreativs.com')}
                    className="btn-secondary"
                    style={{ height: 34, fontSize: '0.75rem', padding: '0 8px', justifyContent: 'flex-start' }}
                  >
                    👑 <strong>CEO</strong> Pleasant
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastLogin('morgan@dcreativs.com')}
                    className="btn-secondary"
                    style={{ height: 34, fontSize: '0.75rem', padding: '0 8px', justifyContent: 'flex-start' }}
                  >
                    ⚡ <strong>COO</strong> Morgan
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastLogin('kingsley@dcreativs.com')}
                    className="btn-secondary"
                    style={{ height: 34, fontSize: '0.75rem', padding: '0 8px', justifyContent: 'flex-start' }}
                  >
                    🎨 <strong>CPO</strong> Kingsley
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastLogin('finance@dcreativs.com')}
                    className="btn-secondary"
                    style={{ height: 34, fontSize: '0.75rem', padding: '0 8px', justifyContent: 'flex-start' }}
                  >
                    💵 <strong>CFO</strong> Xant
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastLogin('estella@dcreativs.com')}
                    className="btn-secondary"
                    style={{ height: 34, fontSize: '0.75rem', padding: '0 8px', justifyContent: 'flex-start' }}
                  >
                    👥 <strong>CHRO</strong> Estella
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastLogin('nina@dcreativs.com')}
                    className="btn-secondary"
                    style={{ height: 34, fontSize: '0.75rem', padding: '0 8px', justifyContent: 'flex-start' }}
                  >
                    📢 <strong>CMO</strong> Nina
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastLogin('maya@dcreativs.com')}
                    className="btn-secondary"
                    style={{ height: 34, fontSize: '0.75rem', padding: '0 8px', justifyContent: 'flex-start' }}
                  >
                    ✨ <strong>Designer</strong> Maya
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastLogin('leo@dcreativs.com')}
                    className="btn-secondary"
                    style={{ height: 34, fontSize: '0.75rem', padding: '0 8px', justifyContent: 'flex-start' }}
                  >
                    💻 <strong>Developer</strong> Leo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastLogin('arthur.sterling@advisory.org')}
                    className="btn-secondary"
                    style={{ height: 34, fontSize: '0.75rem', padding: '0 8px', justifyContent: 'flex-start' }}
                  >
                    🏛️ <strong>Board</strong> Dr. Sterling
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastLogin('tunde.bakare@dcreativs.com')}
                    className="btn-secondary"
                    style={{ height: 34, fontSize: '0.75rem', padding: '0 8px', justifyContent: 'flex-start' }}
                  >
                    🎓 <strong>Coord</strong> Tunde
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastLogin('amara.tutor@dcreativs.com')}
                    className="btn-secondary"
                    style={{ height: 34, fontSize: '0.75rem', padding: '0 8px', justifyContent: 'flex-start' }}
                  >
                    📚 <strong>Tutor</strong> Amara
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastLogin('kemi.adebayo@dcreativs.com')}
                    className="btn-secondary"
                    style={{ height: 34, fontSize: '0.75rem', padding: '0 8px', justifyContent: 'flex-start', border: '1px dashed #F59E0B' }}
                  >
                    ⏳ <strong>Pending</strong> Kemi
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 38px',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.85rem'
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                  Company Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="e.g. alex@dcreativs.com"
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 38px',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.85rem'
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create a secure password"
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 38px',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.85rem'
                    }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                    Assigned Role
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as UserRole)}
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.82rem'
                    }}
                  >
                    <option value="DEVELOPER">Developer</option>
                    <option value="AI_ENGINEER">AI / Automation Engineer</option>
                    <option value="BRAND_DESIGNER">Brand / Graphic Designer</option>
                    <option value="3D_ARTIST">3D / Motion Artist</option>
                    <option value="CONTENT_CREATOR">Content Creator</option>
                    <option value="SOCIAL_MANAGER">Social Media Manager</option>
                    <option value="ACADEMY_TUTOR">Academy Tutor</option>
                    <option value="OPERATIONS_COORDINATOR">Operations Coordinator</option>
                    <option value="CONTRACTOR">Contractor</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                    Department
                  </label>
                  <select
                    value={regDept}
                    onChange={(e) => setRegDept(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.82rem'
                    }}
                  >
                    <option value="Web and Digital Products">Web and Digital Products</option>
                    <option value="AI and Automation">AI and Automation</option>
                    <option value="Brand and Graphic Design">Brand and Graphic Design</option>
                    <option value="3D and Motion">3D and Motion</option>
                    <option value="Content and Video">Content and Video</option>
                    <option value="Marketing and Social">Marketing and Social</option>
                    <option value="Academy">Academy</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                  Job Title
                </label>
                <div style={{ position: 'relative' }}>
                  <Briefcase size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={regTitle}
                    onChange={(e) => setRegTitle(e.target.value)}
                    placeholder="e.g. Associate Frontend Engineer"
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 38px',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.85rem'
                    }}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', height: 44, marginTop: 6 }}>
                <Sparkles size={16} />
                <span>Create Staff Account & Open Dashboard</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
