
import { Link, useNavigate } from "react-router-dom";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Target,
  Brain,
  MessageSquare,
  RotateCcw,
  ArrowRight,
  Lightbulb,
  Award,
} from "lucide-react";

export default function InterviewReport() {
  const navigate = useNavigate();

  const report = {
    role: "Software Developer",
    difficulty: "Medium",
    interviewType: "Technical",
    totalQuestions: 10,
    answered: 8,
    correct: 6,
    score: 72,
    technicalScore: 75,
    communicationScore: 68,
    confidenceScore: 74,
    timeTaken: "18 min",
    strengths: [
      "Good understanding of programming fundamentals",
      "Clear approach to problem solving",
      "Good knowledge of core technical concepts",
    ],
    weaknesses: [
      "Some answers need more detailed explanation",
      "Improve confidence while answering technical questions",
      "Practice advanced data structures and algorithms",
    ],
    feedback:
      "You demonstrated a good foundation in technical concepts. Focus on explaining your approach step-by-step and practice more interview questions to improve consistency.",
  };

  const getPerformance = (score) => {
    if (score >= 80) return "Strong";
    if (score >= 60) return "Good";
    return "Needs Practice";
  };

  const getOverallMessage = () => {
    if (report.score >= 85) {
      return "Excellent interview performance. Keep practicing to maintain consistency.";
    }

    if (report.score >= 70) {
      return "Good performance with a few areas that can be improved.";
    }

    if (report.score >= 50) {
      return "You have a good starting point. More targeted practice will help.";
    }

    return "Keep practicing regularly and focus on your weaker areas.";
  };

  const startNewInterview = () => {
    navigate("/mock-interview");
  };

  return (
    <div className="page-container interview-report-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="section-badge">
            <Trophy size={14} />
            INTERVIEW ANALYTICS
          </div>

          <h1>Interview Report</h1>

          <p>
            Review your interview performance and identify areas
            for improvement.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={startNewInterview}
        >
          <RotateCcw size={16} />
          New Interview
        </button>
      </div>

      {/* Overall Score */}
      <div className="interview-summary-card">
        <div className="summary-score">
          <div className="score-circle">
            <div className="score-circle-inner">
              <strong>{report.score}%</strong>
              <span>Score</span>
            </div>
          </div>

          <div className="summary-score-text">
            <span className="report-status">
              {report.score >= 70 ? "Good Performance" : "Keep Practicing"}
            </span>

            <h2>{report.role}</h2>

            <p>
              {report.interviewType} Interview ·{" "}
              {report.difficulty} Difficulty
            </p>

            <span className="summary-message">
              {getOverallMessage()}
            </span>
          </div>
        </div>

        {/* Interview Stats */}
        <div className="summary-details">
          <div>
            <span>Questions</span>
            <strong>{report.totalQuestions}</strong>
          </div>

          <div>
            <span>Answered</span>
            <strong>{report.answered}</strong>
          </div>

          <div>
            <span>Correct</span>
            <strong>{report.correct}</strong>
          </div>

          <div>
            <span>Time Taken</span>
            <strong>{report.timeTaken}</strong>
          </div>
        </div>
      </div>

      {/* Performance */}
      <div className="report-section-title">
        <h2>Performance Breakdown</h2>

        <p>
          See how you performed across different interview areas.
        </p>
      </div>

      <div className="performance-grid">
        <PerformanceCard
          icon={<Brain size={20} />}
          title="Technical Knowledge"
          score={report.technicalScore}
        />

        <PerformanceCard
          icon={<MessageSquare size={20} />}
          title="Communication"
          score={report.communicationScore}
        />

        <PerformanceCard
          icon={<Target size={20} />}
          title="Confidence"
          score={report.confidenceScore}
        />
      </div>

      {/* Strengths and Weaknesses */}
      <div className="report-columns">
        {/* Strengths */}
        <div className="report-card">
          <div className="report-card-header">
            <div className="report-icon success-icon">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <h3>Strengths</h3>
              <p>Areas where you performed well.</p>
            </div>
          </div>

          <div className="report-list">
            {report.strengths.map((item, index) => (
              <div
                className="report-list-item"
                key={index}
              >
                <CheckCircle2 size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="report-card">
          <div className="report-card-header">
            <div className="report-icon warning-icon">
              <XCircle size={18} />
            </div>

            <div>
              <h3>Areas to Improve</h3>
              <p>Focus on these areas for your next interview.</p>
            </div>
          </div>

          <div className="report-list">
            {report.weaknesses.map((item, index) => (
              <div
                className="report-list-item"
                key={index}
              >
                <XCircle size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="feedback-card">
        <div className="feedback-icon">
          <Lightbulb size={20} />
        </div>

        <div>
          <span className="feedback-label">
            INTERVIEW FEEDBACK
          </span>

          <h3>Overall Feedback</h3>

          <p>{report.feedback}</p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="next-steps-card">
        <div className="next-steps-content">
          <div className="next-steps-icon">
            <Award size={20} />
          </div>

          <div>
            <h3>Ready for another interview?</h3>

            <p>
              Practice again and improve the areas identified
              in this report.
            </p>
          </div>
        </div>

        <div className="next-steps-actions">
          <Link
            to="/mock-interview"
            className="btn btn-primary"
          >
            Start New Interview
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/learning-roadmap"
            className="btn btn-secondary"
          >
            View Roadmap
          </Link>
        </div>
      </div>
    </div>
  );
}

function PerformanceCard({ icon, title, score }) {
  return (
    <div className="performance-card">
      <div className="performance-top">
        <div className="performance-icon">
          {icon}
        </div>

        <strong>{score}%</strong>
      </div>

      <h3>{title}</h3>

      <div className="performance-bar">
        <span
          style={{
            width: `${score}%`,
          }}
        ></span>
      </div>

      <div className="performance-bottom">
        <span>Performance</span>

        <span>{getPerformanceText(score)}</span>
      </div>
    </div>
  );
}

function getPerformanceText(score) {
  if (score >= 80) {
    return "Strong";
  }

  if (score >= 60) {
    return "Good";
  }

  return "Needs Practice";
}

