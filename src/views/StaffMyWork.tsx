import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  Sparkles,
  UploadCloud,
  FileText,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Code2,
  Layers,
  Palette,
  Bot,
  Video,
  Plus,
  Filter,
  X,
  Hash
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TaskItem } from '../types';

export const StaffMyWork: React.FC = () => {
  const {
    currentProfile,
    activeWorkspace,
    tasks,
    toggleTaskChecklist,
    updateTaskStatus,
    addTask,
    setIsSubmitModalOpen,
    setIsComparisonModalOpen,
    submitNewDeliverable,
    isOffline
  } = useApp();

  const [filterWorkspaceOnly, setFilterWorkspaceOnly] = useState(false);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskProject, setNewTaskProject] = useState('Project Orbit');
  const [newTaskDue, setNewTaskDue] = useState('Friday · 17:00 WAT');

  // Inline Deliverable Submit Form State (No popup)
  const [showSubmitDeliverableForm, setShowSubmitDeliverableForm] = useState(false);
  const [submitProjectName, setSubmitProjectName] = useState('Marvel SMS');
  const [submitDeliverableName, setSubmitDeliverableName] = useState('Production Release Asset');
  const [submitVersionNumber, setSubmitVersionNumber] = useState('v1.0');
  const [submitNotes, setSubmitNotes] = useState('');
  const [submitChecksum] = useState(() => 'd41d8cd98f00b204e9800998ecf8427e' + Math.floor(Math.random() * 999999));
  const [submitSuccessNotice, setSubmitSuccessNotice] = useState<string | null>(null);

  // Filter tasks based on assignment or workspace
  const displayedTasks = tasks.filter((t) => {
    if (filterWorkspaceOnly) {
      return t.workspace === activeWorkspace;
    }
    // Default: show tasks assigned to user or in user's permitted workspaces
    return t.assigneeId === currentProfile.id || currentProfile.permittedWorkspaces.includes(t.workspace);
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle,
      project: newTaskProject,
      workspace: activeWorkspace,
      assigneeId: currentProfile.id,
      assigneeName: currentProfile.name,
      assigneeAvatar: currentProfile.avatarUrl,
      due: newTaskDue,
      status: 'IN_PROGRESS',
      category: 'ENGINEERING',
      checklist: [
        { id: `chk-${Date.now()}-1`, text: 'Initial deliverable scope review', done: false },
        { id: `chk-${Date.now()}-2`, text: 'Quality gate checksum verification', done: false }
      ]
    });

    setNewTaskTitle('');
    setShowNewTaskForm(false);
  };

  const handleSubmitDeliverableInline = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOffline) {
      alert('Uploads and deliverable submissions are disabled in offline mode. Please reconnect.');
      return;
    }
    if (!submitNotes.trim()) {
      alert('Please provide designer/engineer notes for this version.');
      return;
    }
    submitNewDeliverable({
      projectName: submitProjectName,
      deliverableName: submitDeliverableName,
      versionNumber: submitVersionNumber,
      notes: submitNotes,
      checksum: submitChecksum
    });
    setSubmitSuccessNotice(`Deliverable "${submitDeliverableName} (${submitVersionNumber})" submitted successfully and queued for CPO review!`);
    setShowSubmitDeliverableForm(false);
    setSubmitNotes('');
  };

  return (
    <div className="hub-view-container" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', fontWeight: 700, margin: 0 }}>
              My Work
            </h1>
            <span className="badge badge-violet">{currentProfile.department}</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Assigned builds, tasks, checklists and deliverable submissions for {currentProfile.name} ({currentProfile.title})
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowNewTaskForm(!showNewTaskForm)}
            className="btn-secondary"
          >
            <Plus size={15} />
            <span>New Task</span>
          </button>
          <button
            onClick={() => {
              setShowSubmitDeliverableForm(true);
              setTimeout(() => {
                document.getElementById('submit-deliverable-inline-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 50);
            }}
            className="btn-primary"
            title="Open deliverable submission form directly on this page"
          >
            <UploadCloud size={16} />
            <span>Submit Deliverable Version</span>
          </button>
        </div>
      </div>

      {/* Role-Specific Focus Banner */}
      <div
        className="hub-card"
        style={{
          background: 'linear-gradient(135deg, #090E28 0%, #15193B 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: 'rgba(65, 0, 245, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            {currentProfile.role === 'DEVELOPER' ? (
              <Code2 size={24} />
            ) : currentProfile.role === 'BRAND_DESIGNER' ? (
              <Palette size={24} />
            ) : currentProfile.role === 'AI_ENGINEER' ? (
              <Bot size={24} />
            ) : (
              <Layers size={24} />
            )}
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              Active Workspace: <strong>{activeWorkspace}</strong> · {currentProfile.department}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: 2 }}>
              Working Hours: {currentProfile.workingHours} · Timezone: {currentProfile.timezone}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>DELIVERABLES READINESS</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34D399' }}>94% ON SCHEDULE</div>
        </div>
      </div>

      {/* Inline New Task Form */}
      {showNewTaskForm && (
        <form
          onSubmit={handleCreateTask}
          className="hub-card"
          style={{
            backgroundColor: 'var(--bg-surface-secondary)',
            border: '1.5px solid var(--electric-violet)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)' }}>
            Create Quick Task for {activeWorkspace} Workspace
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <input
              type="text"
              required
              placeholder="Task title (e.g. AMOLED dark contrast polish)..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem'
              }}
            />
            <input
              type="text"
              required
              placeholder="Project name..."
              value={newTaskProject}
              onChange={(e) => setNewTaskProject(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem'
              }}
            />
            <input
              type="text"
              placeholder="Due date / timeline..."
              value={newTaskDue}
              onChange={(e) => setNewTaskDue(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button
              type="button"
              onClick={() => setShowNewTaskForm(false)}
              className="btn-secondary"
              style={{ height: 34, fontSize: '0.8rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ height: 34, fontSize: '0.8rem' }}
            >
              Add Task
            </button>
          </div>
        </form>
      )}

      {/* Inline Deliverable Submission Form (No popup modal) */}
      {showSubmitDeliverableForm && (
        <form
          id="submit-deliverable-inline-section"
          onSubmit={handleSubmitDeliverableInline}
          className="hub-card section-jump-target"
          style={{
            backgroundColor: 'var(--bg-surface-secondary)',
            border: '1.5px solid var(--electric-violet)',
            boxShadow: 'var(--shadow-glow)',
            display: 'flex',
            flexDirection: 'column',
            gap: 14
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <UploadCloud size={20} color="var(--electric-violet)" />
              <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-heading)' }}>
                Submit Immutable Deliverable Version (Direct Page Submission)
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSubmitDeliverableForm(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              title="Close Form"
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 12 }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                Project
              </label>
              <select
                value={submitProjectName}
                onChange={(e) => setSubmitProjectName(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
              >
                <option value="Marvel SMS">Marvel SMS</option>
                <option value="Project Orbit">Project Orbit</option>
                <option value="Aero Dynamics">Aero Dynamics</option>
                <option value="Northwind Corp">Northwind Corp</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                Deliverable Asset Name
              </label>
              <input
                type="text"
                required
                value={submitDeliverableName}
                onChange={(e) => setSubmitDeliverableName(e.target.value)}
                placeholder="e.g. Production Release Asset..."
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                Semantic Version
              </label>
              <input
                type="text"
                required
                value={submitVersionNumber}
                onChange={(e) => setSubmitVersionNumber(e.target.value)}
                placeholder="e.g. v1.2"
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
              Release Notes & Quality Checklist
            </label>
            <textarea
              required
              rows={3}
              value={submitNotes}
              onChange={(e) => setSubmitNotes(e.target.value)}
              placeholder="Detail build artifacts, completed quality checklist, and test results..."
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Hash size={13} />
              <span>SHA256 Checksum: <code>{submitChecksum.substring(0, 16)}...</code></span>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => setShowSubmitDeliverableForm(false)}
                className="btn-secondary"
                style={{ height: 34, fontSize: '0.8rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ height: 34, fontSize: '0.8rem' }}
              >
                Submit for CPO Review
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Submission Success Banner */}
      {submitSuccessNotice && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#ECFDF5',
            border: '1px solid #10B981',
            color: '#065F46',
            fontSize: '0.84rem',
            fontWeight: 600
          }}
        >
          <span>{submitSuccessNotice}</span>
          <button
            onClick={() => setSubmitSuccessNotice(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#065F46' }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Filter and Switcher Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
          Assigned Tasks & Interactive Acceptance Checklists ({displayedTasks.length})
        </div>

        <button
          onClick={() => setFilterWorkspaceOnly(!filterWorkspaceOnly)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid var(--border-subtle)',
            backgroundColor: filterWorkspaceOnly ? 'var(--electric-violet-light)' : '#FFFFFF',
            color: filterWorkspaceOnly ? 'var(--electric-violet)' : 'var(--text-main)',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Filter size={13} />
          <span>{filterWorkspaceOnly ? `Filter: Only ${activeWorkspace}` : 'Show All My Permitted Workspaces'}</span>
        </button>
      </div>

      {/* Active Tasks & Deliverable Logs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24 }}>
        {/* Left Column: Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {displayedTasks.map((task) => (
            <div key={task.id} className="hub-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="badge badge-neutral">{task.project}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--electric-violet)', fontWeight: 600 }}>
                      [{task.workspace}]
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Due: {task.due}</span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 700, marginTop: 6 }}>
                    {task.title}
                  </h3>
                </div>

                {/* Status Switcher Select */}
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value as any)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    border: '1px solid var(--border-subtle)',
                    backgroundColor:
                      task.status === 'COMPLETED'
                        ? '#DCFCE7'
                        : task.status === 'IN_PROGRESS'
                        ? '#EDE9FE'
                        : task.status === 'PENDING_REVIEW'
                        ? '#FEF3C7'
                        : '#F1F5F9',
                    color:
                      task.status === 'COMPLETED'
                        ? '#166534'
                        : task.status === 'IN_PROGRESS'
                        ? '#4100F5'
                        : task.status === 'PENDING_REVIEW'
                        ? '#92400E'
                        : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  <option value="PLANNED">PLANNED</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="PENDING_REVIEW">PENDING REVIEW</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>

              {/* Interactive Acceptance Checklist */}
              <div style={{ marginTop: 4, paddingTop: 12, borderTop: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
                  ACCEPTANCE CHECKLIST ({task.checklist.filter((c) => c.done).length}/{task.checklist.length} Complete):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {task.checklist.map((item) => (
                    <label
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        color: item.done ? 'var(--text-muted)' : 'var(--text-main)',
                        textDecoration: item.done ? 'line-through' : 'none'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggleTaskChecklist(task.id, item.id)}
                        style={{ width: 16, height: 16, accentColor: 'var(--electric-violet)', cursor: 'pointer' }}
                      />
                      <span>{item.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {displayedTasks.length === 0 && (
            <div className="hub-card" style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>
              No tasks assigned for workspace {activeWorkspace}. Click "New Task" above to log an item.
            </div>
          )}
        </div>

        {/* Right Column: Immutable Submission Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="hub-card">
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 14 }}>
              My Deliverable History
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ padding: 12, backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Marvel SMS v3.0</span>
                  <span className="badge badge-healthy" style={{ fontSize: '0.65rem' }}>RELEASE CANDIDATE</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  SHA256: <code>ef2d127de37b...</code>
                </div>
                <button
                  onClick={() => setIsComparisonModalOpen(true)}
                  style={{ fontSize: '0.75rem', color: 'var(--electric-violet)', fontWeight: 700, marginTop: 8, cursor: 'pointer' }}
                >
                  Inspect Version Diff ➔
                </button>
              </div>

              <div style={{ padding: 12, backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Orbit App Icon v2.0</span>
                  <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>IN CPO REVIEW</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  SHA256: <code>9f86d081884c...</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
