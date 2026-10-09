import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Users,
  Clock,
  Video,
  FileText,
  AlertTriangle,
  Send,
  Award,
  Check,
  X,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EnrolledLearner, TimetableSession, LessonPlan } from '../types';

export const TutorWorkspace: React.FC = () => {
  const {
    currentProfile,
    academyCohorts,
    learners,
    timetables,
    lessonPlans,
    assignmentSubmissions,
    tutorSessionReports,
    addTutorSessionReport,
    markAttendance,
    gradeSubmission,
    submitAcademyIssue
  } = useApp();

  // Filter cohorts assigned strictly to this tutor
  const assignedCohorts = academyCohorts.filter(
    (c) =>
      c.tutorId === currentProfile.id ||
      (currentProfile.assignedCohortIds && currentProfile.assignedCohortIds.includes(c.id))
  );

  const assignedCohortCodes = assignedCohorts.map((c) => c.code);

  // Filter learners belonging to assigned cohorts
  const assignedLearners = learners.filter((lrn) =>
    assignedCohortCodes.includes(lrn.cohortCode)
  );

  // Filter sessions
  const assignedSessions = timetables.filter(
    (s) =>
      s.tutorId === currentProfile.id ||
      assignedCohortCodes.includes(s.cohortCode)
  );

  // State for active view tab
  const [activeTab, setActiveTab] = useState<'sessions' | 'attendance' | 'reports' | 'lessons' | 'grading'>('sessions');

  // Attendance marking state
  const [selectedSessionId, setSelectedSessionId] = useState<string>(
    assignedSessions[0]?.id || ''
  );
  const activeSession = assignedSessions.find((s) => s.id === selectedSessionId) || assignedSessions[0];
  const sessionLearners = assignedLearners.filter(
    (l) => activeSession && l.cohortCode === activeSession.cohortCode
  );

  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'LATE'>>({});
  const [attendanceSavedMessage, setAttendanceSavedMessage] = useState(false);

  const handleToggleAttendance = (learnerId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setAttendanceMap((prev) => ({
      ...prev,
      [learnerId]: status
    }));
  };

  const handleSaveAttendance = () => {
    if (!activeSession) return;
    const records = sessionLearners.map((l) => ({
      learnerId: l.id,
      learnerName: l.fullName,
      status: attendanceMap[l.id] || 'PRESENT'
    }));

    markAttendance(
      activeSession.id,
      activeSession.cohortId,
      activeSession.cohortCode,
      activeSession.date,
      records
    );

    setAttendanceSavedMessage(true);
    setTimeout(() => setAttendanceSavedMessage(false), 3000);
  };

  // Submit Session Report state
  const [repTopics, setRepTopics] = useState('');
  const [repChallenges, setRepChallenges] = useState('');
  const [repEquipment, setRepEquipment] = useState('');
  const [repAttendedCount, setRepAttendedCount] = useState<number>(sessionLearners.length || 20);
  const [reportSuccessMessage, setReportSuccessMessage] = useState(false);

  const handleSubmitSessionReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSession) return;

    addTutorSessionReport({
      sessionId: activeSession.id,
      cohortId: activeSession.cohortId,
      cohortCode: activeSession.cohortCode,
      tutorId: currentProfile.id,
      tutorName: currentProfile.name,
      sessionDate: activeSession.date,
      learnersAttended: repAttendedCount,
      totalEnrolled: sessionLearners.length,
      topicsCovered: repTopics,
      challengesEncountered: repChallenges,
      equipmentIssues: repEquipment
    });

    if (repEquipment.trim()) {
      submitAcademyIssue({
        type: 'EQUIPMENT_REQUEST',
        cohortCode: activeSession.cohortCode,
        raisedBy: currentProfile.name,
        description: repEquipment,
        urgency: 'HIGH'
      });
    }

    setRepTopics('');
    setRepChallenges('');
    setRepEquipment('');
    setReportSuccessMessage(true);
    setTimeout(() => setReportSuccessMessage(false), 3000);

    setTimeout(() => {
      const historyEl = document.getElementById('tutor-reports-history');
      if (historyEl) {
        historyEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        historyEl.classList.add('jumped');
        setTimeout(() => historyEl.classList.remove('jumped'), 2000);
      }
    }, 100);
  };

  // Grading state
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(90);
  const [gradeLetter, setGradeLetter] = useState<string>('A');
  const [gradeFeedback, setGradeFeedback] = useState<string>('');

  const handleSaveGrade = (subId: string) => {
    gradeSubmission(subId, gradeScore, gradeLetter, gradeFeedback);
    setSelectedSubmissionId(null);
  };

  return (
    <div style={{ padding: '24px', maxWidth: 1300, margin: '0 auto' }}>
      {/* Welcome Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 24,
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(65, 0, 245, 0.08) 0%, rgba(136, 95, 255, 0.03) 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(65, 0, 245, 0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, var(--midnight) 0%, var(--electric-violet) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <BookOpen size={24} />
          </div>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--text-heading)',
                margin: 0
              }}
            >
              Tutor Classrooms & Teaching Desk
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Assigned classes for <strong>{currentProfile.name}</strong> · Attendance, lesson delivery & grading
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: 6,
              backgroundColor: 'var(--electric-violet-light)',
              color: 'var(--electric-violet)'
            }}
          >
            {assignedCohorts.length} Assigned Cohorts
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: 20,
          overflowX: 'auto'
        }}
      >
        {[
          { key: 'sessions', label: 'My Class Schedule' },
          { key: 'attendance', label: 'Mark Attendance' },
          { key: 'reports', label: 'Session Reports' },
          { key: 'grading', label: `Student Assessments (${assignmentSubmissions.filter((s) => s.status === 'SUBMITTED').length})` },
          { key: 'lessons', label: 'Approved Lesson Plans' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: '10px 16px',
              fontSize: '0.84rem',
              fontWeight: activeTab === tab.key ? 700 : 500,
              color: activeTab === tab.key ? 'var(--electric-violet)' : 'var(--text-muted)',
              borderBottom: activeTab === tab.key ? '2px solid var(--electric-violet)' : '2px solid transparent',
              background: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SESSIONS */}
      {activeTab === 'sessions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {assignedSessions.map((session) => (
            <div
              key={session.id}
              className="card-glow"
              style={{
                padding: '18px 22px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    backgroundColor: 'var(--electric-violet-light)',
                    color: 'var(--electric-violet)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Calendar size={20} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--electric-violet)' }}>
                      {session.cohortCode}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      · {session.date} ({session.startTime} - {session.endTime})
                    </span>
                  </div>
                  <h3 style={{ margin: '3px 0 0', fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    {session.title}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    Venue: <strong>{session.venue}</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {session.onlineMeetingLink && (
                  <a
                    href={session.onlineMeetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px' }}
                  >
                    <Video size={14} color="var(--electric-violet)" />
                    <span>Launch Online Class</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    setSelectedSessionId(session.id);
                    setActiveTab('attendance');
                  }}
                  className="btn-primary"
                  style={{ fontSize: '0.76rem', padding: '8px 14px' }}
                >
                  Take Attendance
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12
            }}
          >
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Active Classroom Session</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: 2 }}>
                {activeSession ? `${activeSession.cohortCode} - ${activeSession.title}` : 'Select a session'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Date: {activeSession?.date} · Venue: {activeSession?.venue}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {attendanceSavedMessage && (
                <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle size={15} />
                  <span>Attendance Saved & Synced!</span>
                </span>
              )}
              <button onClick={handleSaveAttendance} className="btn-primary" style={{ fontSize: '0.82rem', padding: '8px 18px' }}>
                Save Class Attendance Record
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-surface-secondary)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Learner Name</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Guardian Contact</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Current Attendance Benchmark</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'center' }}>Mark Attendance</th>
                </tr>
              </thead>
              <tbody>
                {sessionLearners.map((lrn) => {
                  const status = attendanceMap[lrn.id] || 'PRESENT';
                  return (
                    <tr key={lrn.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-heading)' }}>
                        {lrn.fullName}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                        {lrn.guardianName} ({lrn.guardianContact})
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: lrn.attendanceRate >= 85 ? '#059669' : '#DC2626' }}>
                        {lrn.attendanceRate}%
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: 4, backgroundColor: 'var(--bg-surface-secondary)', padding: 3, borderRadius: 6 }}>
                          <button
                            type="button"
                            onClick={() => handleToggleAttendance(lrn.id, 'PRESENT')}
                            style={{
                              padding: '4px 10px',
                              borderRadius: 4,
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: 'none',
                              backgroundColor: status === 'PRESENT' ? '#059669' : 'transparent',
                              color: status === 'PRESENT' ? '#FFFFFF' : 'var(--text-muted)'
                            }}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleAttendance(lrn.id, 'LATE')}
                            style={{
                              padding: '4px 10px',
                              borderRadius: 4,
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: 'none',
                              backgroundColor: status === 'LATE' ? '#D97706' : 'transparent',
                              color: status === 'LATE' ? '#FFFFFF' : 'var(--text-muted)'
                            }}
                          >
                            Late
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleAttendance(lrn.id, 'ABSENT')}
                            style={{
                              padding: '4px 10px',
                              borderRadius: 4,
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: 'none',
                              backgroundColor: status === 'ABSENT' ? '#DC2626' : 'transparent',
                              color: status === 'ABSENT' ? '#FFFFFF' : 'var(--text-muted)'
                            }}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SESSION REPORTS */}
      {activeTab === 'reports' && (
        <div className="hub-subgrid-pair">
          {/* Submit New Report */}
          <div
            className="card-glow"
            style={{
              padding: 24,
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0 0 16px' }}>
              Submit Tutor Session Report
            </h3>

            {reportSuccessMessage && (
              <div style={{ padding: '10px 14px', borderRadius: 6, backgroundColor: '#D1FAE5', color: '#065F46', fontSize: '0.82rem', marginBottom: 14 }}>
                Session report logged successfully. Coordinator notified.
              </div>
            )}

            <form onSubmit={handleSubmitSessionReport} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                  Cohort / Session
                </label>
                <input
                  type="text"
                  readOnly
                  value={activeSession ? `${activeSession.cohortCode} - ${activeSession.title}` : 'No session'}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface-secondary)', fontSize: '0.84rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                  Learners Attended (Count)
                </label>
                <input
                  type="number"
                  value={repAttendedCount}
                  onChange={(e) => setRepAttendedCount(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.84rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                  Curriculum Topics Covered
                </label>
                <textarea
                  rows={2}
                  value={repTopics}
                  onChange={(e) => setRepTopics(e.target.value)}
                  placeholder="e.g. Loops, Ultrasonic sensor calibration, React Hooks..."
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.84rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                  Pedagogical Challenges / Learner Notes
                </label>
                <textarea
                  rows={2}
                  value={repChallenges}
                  onChange={(e) => setRepChallenges(e.target.value)}
                  placeholder="Any students requiring 1-on-1 assistance or pacing issues..."
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.84rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                  Hardware / Equipment Issues (Optional)
                </label>
                <textarea
                  rows={2}
                  value={repEquipment}
                  onChange={(e) => setRepEquipment(e.target.value)}
                  placeholder="Loose cables, faulty sensors, projector issues..."
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.84rem' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: 6, justifyContent: 'center' }}>
                <Send size={15} />
                <span>Submit Session Report</span>
              </button>
            </form>
          </div>

          {/* Past Submitted Reports */}
          <div id="tutor-reports-history" className="section-jump-target" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0 0 4px' }}>
              Past Submitted Reports
            </h3>
            {tutorSessionReports.map((rep) => (
              <div
                key={rep.id}
                className="card-glow"
                style={{
                  padding: 16,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--electric-violet)', backgroundColor: 'var(--electric-violet-light)', padding: '2px 6px', borderRadius: 4 }}>
                    {rep.cohortCode}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{rep.submittedAt}</span>
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {rep.topicsCovered}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Attended: {rep.learnersAttended} / {rep.totalEnrolled} Learners
                </div>
                {rep.equipmentIssues && (
                  <div style={{ fontSize: '0.76rem', color: '#DC2626', backgroundColor: '#FEF2F2', padding: '6px 8px', borderRadius: 4 }}>
                    Equipment: {rep.equipmentIssues}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GRADING */}
      {activeTab === 'grading' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {assignmentSubmissions.map((sub) => (
            <div
              key={sub.id}
              className="card-glow"
              style={{
                padding: '18px 22px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--electric-violet)' }}>
                    Student: {sub.learnerName}
                  </div>
                  <h3 style={{ margin: '2px 0 0', fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    {sub.assignmentTitle}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Submitted on {sub.submissionDate}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {sub.status === 'GRADED' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>
                        {sub.score}/{sub.maxScore} ({sub.grade})
                      </span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: 4, backgroundColor: '#D1FAE5', color: '#065F46' }}>
                        GRADED
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedSubmissionId(sub.id)}
                      className="btn-primary"
                      style={{ fontSize: '0.78rem', padding: '6px 14px' }}
                    >
                      Grade Project
                    </button>
                  )}
                </div>
              </div>

              {sub.feedback && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-surface-secondary)', padding: '8px 12px', borderRadius: 6 }}>
                  <strong>Feedback:</strong> {sub.feedback}
                </div>
              )}

              {/* Grading Drawer / Inline Editor */}
              {selectedSubmissionId === sub.id && (
                <div style={{ marginTop: 10, padding: 16, backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.88rem', fontWeight: 700 }}>Record Assessment Grade</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 100px 1fr', gap: 10, marginBottom: 10 }}>
                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, display: 'block', marginBottom: 2 }}>Score / 100</label>
                      <input
                        type="number"
                        value={gradeScore}
                        onChange={(e) => setGradeScore(Number(e.target.value))}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: 4, border: '1px solid var(--border-subtle)', fontSize: '0.84rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, display: 'block', marginBottom: 2 }}>Letter Grade</label>
                      <select
                        value={gradeLetter}
                        onChange={(e) => setGradeLetter(e.target.value)}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: 4, border: '1px solid var(--border-subtle)', fontSize: '0.84rem' }}
                      >
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, display: 'block', marginBottom: 2 }}>Tutor Qualitative Feedback</label>
                      <input
                        type="text"
                        value={gradeFeedback}
                        onChange={(e) => setGradeFeedback(e.target.value)}
                        placeholder="Constructive feedback for learner..."
                        style={{ width: '100%', padding: '6px 8px', borderRadius: 4, border: '1px solid var(--border-subtle)', fontSize: '0.84rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => setSelectedSubmissionId(null)}
                      className="btn-secondary"
                      style={{ fontSize: '0.76rem', padding: '4px 10px' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveGrade(sub.id)}
                      className="btn-primary"
                      style={{ fontSize: '0.76rem', padding: '4px 12px' }}
                    >
                      Save Grade
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: APPROVED LESSON PLANS */}
      {activeTab === 'lessons' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
          {lessonPlans.map((lp) => (
            <div
              key={lp.id}
              className="card-glow"
              style={{
                padding: 22,
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--electric-violet)', backgroundColor: 'var(--electric-violet-light)', padding: '2px 6px', borderRadius: 4 }}>
                    Week {lp.weekNumber} · {lp.programmeName}
                  </span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)', margin: '6px 0 2px' }}>
                    {lp.topic}
                  </h3>
                </div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 9999,
                    backgroundColor: lp.reviewStatus === 'APPROVED' ? '#D1FAE5' : '#FEF3C7',
                    color: lp.reviewStatus === 'APPROVED' ? '#065F46' : '#92400E'
                  }}
                >
                  {lp.reviewStatus}
                </span>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>
                  Learning Objectives:
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {lp.learningObjectives.map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                  Teaching Resources:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {lp.resources.map((res, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.72rem',
                        padding: '3px 8px',
                        borderRadius: 4,
                        backgroundColor: 'var(--bg-surface-secondary)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-heading)'
                      }}
                    >
                      📎 {res.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
