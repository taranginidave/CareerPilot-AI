import { useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  RotateCcw,
  BarChart3,
  Sparkles,
  Target,
} from "lucide-react";

const skillDatabase = [
  "python",
  "java",
  "c++",
  "javascript",
  "typescript",
  "react",
  "node.js",
  "node",
  "html",
  "css",
  "sql",
  "mysql",
  "mongodb",
  "firebase",
  "git",
  "github",
  "machine learning",
  "deep learning",
  "artificial intelligence",
  "data science",
  "pandas",
  "numpy",
  "tensorflow",
  "pytorch",
  "flask",
  "django",
  "fastapi",
  "aws",
  "docker",
  "kubernetes",
  "rest api",
  "figma",
  "communication",
  "leadership",
  "problem solving",
];

const importantKeywords = [
  "experience",
  "education",
  "skills",
  "projects",
  "internship",
  "certification",
  "achievements",
  "linkedin",
  "github",
  "email",
  "phone",
  "resume",
];

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  function handleFile(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    processFile(selectedFile);
  }

  function processFile(selectedFile) {
    const fileName = selectedFile.name.toLowerCase();

    if (
      !fileName.endsWith(".pdf") &&
      !fileName.endsWith(".doc") &&
      !fileName.endsWith(".docx") &&
      !fileName.endsWith(".txt")
    ) {
      alert("Please upload a PDF, DOC, DOCX or TXT file.");
      return;
    }

    setFile(selectedFile);
    setResult(null);

    if (fileName.endsWith(".txt")) {
      const reader = new FileReader();

      reader.onload = function (event) {
        setResumeText(event.target.result || "");
      };

      reader.readAsText(selectedFile);
    } else {
      setResumeText("");
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragActive(false);

    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile) {
      processFile(droppedFile);
    }
  }

  function analyzeResume() {
    if (!file) {
      alert("Please upload your resume first.");
      return;
    }

    const text = resumeText.toLowerCase();

    const detectedSkills = [];

    skillDatabase.forEach(function (skill) {
      if (text.includes(skill.toLowerCase())) {
        detectedSkills.push(skill);
      }
    });

    const detectedKeywords = [];

    importantKeywords.forEach(function (keyword) {
      if (text.includes(keyword.toLowerCase())) {
        detectedKeywords.push(keyword);
      }
    });

    let score = 55;

    if (file) {
      score += 5;
    }

    if (detectedSkills.length >= 5) {
      score += 10;
    }

    if (detectedSkills.length >= 10) {
      score += 10;
    }

    if (detectedKeywords.length >= 5) {
      score += 5;
    }

    if (detectedKeywords.length >= 8) {
      score += 5;
    }

    score = Math.min(score, 95);

    const suggestions = [];

    if (detectedSkills.length < 5) {
      suggestions.push(
        "Add more relevant technical and professional skills."
      );
    }

    if (!text.includes("project")) {
      suggestions.push(
        "Add a Projects section with measurable achievements."
      );
    }

    if (!text.includes("experience") && !text.includes("internship")) {
      suggestions.push(
        "Add internship, training or practical experience."
      );
    }

    if (!text.includes("github")) {
      suggestions.push(
        "Add your GitHub profile if you have coding projects."
      );
    }

    if (!text.includes("linkedin")) {
      suggestions.push(
        "Add your LinkedIn profile to improve professional visibility."
      );
    }

    if (!text.includes("certification")) {
      suggestions.push(
        "Add relevant certifications, workshops or training."
      );
    }

    if (suggestions.length === 0) {
      suggestions.push(
        "Your resume has a good structure. Keep improving it with measurable achievements."
      );
    }

    let status = "Needs Improvement";

    if (score >= 80) {
      status = "Strong Resume";
    } else if (score >= 65) {
      status = "Good Resume";
    }

    const analysisResult = {
      score,
      status,
      detectedSkills,
      detectedKeywords,
      suggestions,
      fileName: file.name,
    };

    setResult(analysisResult);

    // SAVE REAL SCORE FOR DASHBOARD
    localStorage.setItem(
      "careerPilotResumeScore",
      String(score)
    );

    // SAVE COMPLETE ANALYSIS FOR FUTURE USE
    localStorage.setItem(
      "careerPilotResumeAnalysis",
      JSON.stringify(analysisResult)
    );
  }

  function clearAnalyzer() {
    setFile(null);
    setResumeText("");
    setResult(null);
  }

  return (
    <div className="page-container resume-analyzer-page">

      <div className="page-header">
        <div>
          <div className="section-badge">
            <FileText size={14} />
            AI RESUME ANALYZER
          </div>

          <h1>Resume Analyzer</h1>

          <p>
            Analyze your resume and discover how you can improve
            its ATS compatibility.
          </p>
        </div>

        <div className="resume-analyzer-icon">
          <Sparkles size={25} />
        </div>
      </div>

      {!result && (
        <div className="resume-upload-card">

          <div
            className={
              dragActive
                ? "resume-drop-zone drag-active"
                : "resume-drop-zone"
            }
            onDragOver={function (event) {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={function () {
              setDragActive(false);
            }}
            onDrop={handleDrop}
          >
            <div className="resume-upload-icon">
              <Upload size={28} />
            </div>

            <h2>Upload your resume</h2>

            <p>
              Drag and drop your resume here or select a file
              from your computer.
            </p>

            <label className="btn btn-primary resume-upload-btn">
              <Upload size={16} />
              Choose Resume

              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFile}
                hidden
              />
            </label>

            <span className="resume-file-info">
              Supported formats: PDF, DOC, DOCX, TXT
            </span>
          </div>

          {file && (
            <div className="selected-resume">

              <div className="selected-file-icon">
                <FileText size={20} />
              </div>

              <div className="selected-file-details">
                <strong>{file.name}</strong>

                <span>
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>

              <CheckCircle2 size={19} />
            </div>
          )}

          {file && (
            <button
              type="button"
              className="btn btn-primary analyze-resume-btn"
              onClick={analyzeResume}
            >
              <BarChart3 size={17} />
              Analyze Resume
            </button>
          )}

        </div>
      )}

      {result && (
        <div className="resume-analysis-result">

          <div className="analysis-top-card">

            <div className="analysis-score-section">

              <div className="resume-score-circle">
                <div className="resume-score-inner">
                  <strong>{result.score}%</strong>
                  <span>ATS Score</span>
                </div>
              </div>

              <div className="analysis-score-text">
                <span>RESUME ANALYSIS</span>

                <h2>{result.status}</h2>

                <p>{result.fileName}</p>
              </div>

            </div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearAnalyzer}
            >
              <RotateCcw size={16} />
              Analyze Another
            </button>

          </div>

          <div className="analysis-stats">

            <div className="analysis-stat-card">
              <div className="analysis-stat-icon">
                <Target size={18} />
              </div>

              <div>
                <strong>
                  {result.detectedSkills.length}
                </strong>

                <span>Skills Detected</span>
              </div>
            </div>

            <div className="analysis-stat-card">
              <div className="analysis-stat-icon">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <strong>
                  {result.detectedKeywords.length}
                </strong>

                <span>Keywords Found</span>
              </div>
            </div>

            <div className="analysis-stat-card">
              <div className="analysis-stat-icon">
                <Lightbulb size={18} />
              </div>

              <div>
                <strong>
                  {result.suggestions.length}
                </strong>

                <span>Suggestions</span>
              </div>
            </div>

          </div>

          <div className="analysis-grid">

            <div className="analysis-card">

              <div className="analysis-card-header">

                <div className="analysis-card-icon">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <h3>Detected Skills</h3>

                  <p>
                    Skills identified from your resume.
                  </p>
                </div>

              </div>

              <div className="analysis-tags">

                {result.detectedSkills.length > 0 ? (
                  result.detectedSkills.map(function (skill) {
                    return (
                      <span
                        className="analysis-skill-tag"
                        key={skill}
                      >
                        {skill}
                      </span>
                    );
                  })
                ) : (
                  <p className="analysis-empty">
                    No technical skills detected.
                  </p>
                )}

              </div>

            </div>

            <div className="analysis-card">

              <div className="analysis-card-header">

                <div className="analysis-card-icon">
                  <Target size={18} />
                </div>

                <div>
                  <h3>Important Keywords</h3>

                  <p>
                    Keywords found in your resume.
                  </p>
                </div>

              </div>

              <div className="analysis-tags">

                {result.detectedKeywords.length > 0 ? (
                  result.detectedKeywords.map(function (keyword) {
                    return (
                      <span
                        className="analysis-keyword-tag"
                        key={keyword}
                      >
                        {keyword}
                      </span>
                    );
                  })
                ) : (
                  <p className="analysis-empty">
                    No important keywords detected.
                  </p>
                )}

              </div>

            </div>

          </div>

          <div className="resume-suggestions-card">

            <div className="suggestions-header">

              <div className="suggestions-icon">
                <Lightbulb size={20} />
              </div>

              <div>
                <span>AI RECOMMENDATIONS</span>

                <h3>
                  How can you improve your resume?
                </h3>
              </div>

            </div>

            <div className="suggestions-list">

              {result.suggestions.map(function (
                suggestion,
                index
              ) {
                return (
                  <div
                    className="suggestion-item"
                    key={index}
                  >
                    <div className="suggestion-number">
                      {index + 1}
                    </div>

                    <p>{suggestion}</p>
                  </div>
                );
              })}

            </div>

          </div>

          <div className="resume-score-note">

            <AlertCircle size={17} />

            <p>
              This is a frontend demo analysis. In the final
              CareerPilot AI version, the resume will be processed
              by the backend and AI model for deeper ATS,
              keyword and content analysis.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}