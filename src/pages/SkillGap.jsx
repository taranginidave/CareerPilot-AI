import "./skillGap.css";
import { useMemo, useState } from "react";
import {
  Target,
  Search,
  CheckCircle2,
  XCircle,
  BookOpen,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import "./skillGap.css";

const roleData = {
  "Software Developer": {
    skills: [
      "Python",
      "Java",
      "C++",
      "JavaScript",
      "React",
      "HTML",
      "CSS",
      "SQL",
      "Git",
      "Data Structures",
      "Algorithms",
      "OOP",
      "REST API",
      "Database",
    ],
    recommendations: {
      Python: "Practice Python problem solving and build backend projects.",
      Java: "Learn Java OOP, collections and exception handling.",
      JavaScript: "Practice ES6+, DOM, promises and async programming.",
      React: "Build projects using React hooks, routing and APIs.",
      SQL: "Practice joins, subqueries, aggregation and database design.",
      Git: "Learn branching, merging, pull requests and Git workflows.",
      "Data Structures":
        "Practice arrays, linked lists, stacks, queues, trees and graphs.",
      Algorithms:
        "Practice searching, sorting, recursion, greedy and dynamic programming.",
      "REST API":
        "Build APIs and learn HTTP methods, status codes and authentication.",
      Database:
        "Study relational databases, normalization and indexing.",
    },
  },

  "Data Scientist": {
    skills: [
      "Python",
      "SQL",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
      "Statistics",
      "Machine Learning",
      "Data Visualization",
      "Data Cleaning",
      "Feature Engineering",
      "Jupyter",
      "Excel",
    ],
    recommendations: {
      Python: "Strengthen Python for data manipulation and automation.",
      SQL: "Practice analytical SQL queries and database operations.",
      Pandas: "Practice DataFrames, filtering, grouping and merging datasets.",
      NumPy: "Learn arrays, vectorization and numerical operations.",
      Matplotlib: "Create analytical charts and customize visualizations.",
      Seaborn: "Practice statistical data visualization.",
      "Scikit-learn":
        "Build classification, regression and clustering projects.",
      Statistics:
        "Study probability, distributions, hypothesis testing and correlation.",
      "Machine Learning":
        "Build end-to-end ML projects with model evaluation.",
      "Data Visualization":
        "Create dashboards and explain insights using visualizations.",
      "Data Cleaning":
        "Practice handling missing values, duplicates and outliers.",
      "Feature Engineering":
        "Learn encoding, scaling and feature selection techniques.",
      Jupyter: "Use notebooks to document analysis and experiments.",
    },
  },

  "AI / ML Engineer": {
    skills: [
      "Python",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
      "NLP",
      "Computer Vision",
      "Statistics",
      "Git",
      "Docker",
      "APIs",
    ],
    recommendations: {
      Python: "Master Python for machine learning and AI development.",
      NumPy: "Practice numerical computing and vectorized operations.",
      Pandas: "Learn data preprocessing and dataset manipulation.",
      "Scikit-learn":
        "Build classification, regression and clustering models.",
      "Machine Learning":
        "Study supervised, unsupervised and model evaluation techniques.",
      "Deep Learning":
        "Learn neural networks, CNNs, RNNs and transformers.",
      TensorFlow: "Build and train deep learning models with TensorFlow.",
      PyTorch: "Practice model development and training with PyTorch.",
      NLP: "Learn text preprocessing, embeddings and transformer models.",
      "Computer Vision":
        "Build image classification and object detection projects.",
      Statistics:
        "Strengthen probability, statistics and mathematical foundations.",
      Docker: "Learn containerization and deployment of ML applications.",
      APIs: "Learn how to expose ML models through APIs.",
    },
  },

  "Frontend Developer": {
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "TypeScript",
      "Git",
      "Responsive Design",
      "REST API",
      "Tailwind CSS",
      "Bootstrap",
      "Redux",
      "UI/UX",
      "Web Accessibility",
    ],
    recommendations: {
      HTML: "Practice semantic HTML and accessible page structures.",
      CSS: "Master Flexbox, Grid, responsive design and animations.",
      JavaScript:
        "Strengthen ES6+, DOM manipulation, promises and async programming.",
      React: "Build React applications using hooks and reusable components.",
      TypeScript: "Learn types, interfaces and generics for scalable React apps.",
      Git: "Practice branching, commits, merging and collaboration.",
      "Responsive Design":
        "Build interfaces that work smoothly across devices.",
      "REST API": "Learn API integration using fetch or Axios.",
      "Tailwind CSS": "Practice utility-first responsive UI development.",
      Bootstrap: "Learn reusable responsive Bootstrap components.",
      Redux: "Understand global state management for larger React apps.",
      "UI/UX": "Learn layout, usability, hierarchy and user-centered design.",
      "Web Accessibility":
        "Learn semantic elements, keyboard navigation and ARIA basics.",
    },
  },
};

export default function SkillGap() {
  const [role, setRole] = useState("Software Developer");
  const [skillsInput, setSkillsInput] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const selectedRole = roleData[role];

  const analysis = useMemo(() => {
    const userSkills = skillsInput
      .split(",")
      .map((skill) => skill.trim().toLowerCase())
      .filter(Boolean);

    const matched = selectedRole.skills.filter((requiredSkill) =>
      userSkills.some(
        (userSkill) =>
          userSkill === requiredSkill.toLowerCase() ||
          requiredSkill.toLowerCase().includes(userSkill) ||
          userSkill.includes(requiredSkill.toLowerCase())
      )
    );

    const missing = selectedRole.skills.filter(
      (requiredSkill) => !matched.includes(requiredSkill)
    );

    const percentage =
      selectedRole.skills.length > 0
        ? Math.round((matched.length / selectedRole.skills.length) * 100)
        : 0;

    return {
      userSkills,
      matched,
      missing,
      percentage,
    };
  }, [skillsInput, selectedRole]);

  function analyzeSkills() {
    if (!skillsInput.trim()) {
      alert("Please enter your skills first.");
      return;
    }

    setAnalyzed(true);
  }

  function resetAnalysis() {
    setSkillsInput("");
    setAnalyzed(false);
  }

  function getRecommendation(skill) {
    return (
      selectedRole.recommendations[skill] ||
      `Start learning ${skill} through projects, documentation and practice.`
    );
  }

  return (
    <div className="page-container skill-gap-page">
      <div className="page-header">
        <div>
          <div className="section-badge">
            <Target size={14} />
            SKILL ANALYSIS
          </div>

          <h1>Skill Gap Analyzer</h1>

          <p>
            Compare your current skills with the skills required for your
            target career role.
          </p>
        </div>

        <div className="skill-gap-header-icon">
          <Target size={26} />
        </div>
      </div>

      {!analyzed ? (
        <div className="skill-gap-input-card">
          <div className="skill-gap-card-icon">
            <Search size={25} />
          </div>

          <h2>Find Your Skill Gap</h2>

          <p>
            Select your target role and enter the skills you already know.
          </p>

          <div className="skill-gap-form">
            <div className="skill-gap-field">
              <label>Target Role</label>

              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                {Object.keys(roleData).map((roleName) => (
                  <option key={roleName}>{roleName}</option>
                ))}
              </select>
            </div>

            <div className="skill-gap-field">
              <label>Your Current Skills</label>

              <textarea
                value={skillsInput}
                onChange={(event) => setSkillsInput(event.target.value)}
                placeholder="Example: Python, SQL, React, Git, HTML, CSS"
              />

              <span className="skill-gap-help">
                Separate multiple skills using commas.
              </span>
            </div>
          </div>

          <div className="skill-gap-example">
            <Sparkles size={16} />
            <span>
              Tip: Include technical skills, programming languages,
              frameworks and tools you already know.
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary skill-gap-analyze-btn"
            onClick={analyzeSkills}
          >
            <Search size={17} />
            Analyze Skill Gap
          </button>
        </div>
      ) : (
        <div className="skill-gap-results">
          <div className="skill-gap-result-top">
            <div>
              <span className="result-role-label">TARGET ROLE</span>
              <h2>{role}</h2>
              <p>
                Your skills were compared with {selectedRole.skills.length}{" "}
                important skills for this role.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetAnalysis}
            >
              <RotateCcw size={16} />
              New Analysis
            </button>
          </div>

          <div className="skill-gap-overview">
            <div className="skill-gap-score-card">
              <div className="skill-gap-circle">
                <div>
                  <strong>{analysis.percentage}%</strong>
                  <span>Match</span>
                </div>
              </div>

              <div className="skill-gap-score-info">
                <h3>Career Readiness</h3>
                <p>
                  You currently match {analysis.matched.length} out of{" "}
                  {selectedRole.skills.length} recommended skills.
                </p>

                <div className="skill-gap-progress">
                  <span
                    style={{
                      width: `${analysis.percentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="skill-gap-stat">
              <CheckCircle2 size={21} />
              <strong>{analysis.matched.length}</strong>
              <span>Matched Skills</span>
            </div>

            <div className="skill-gap-stat">
              <XCircle size={21} />
              <strong>{analysis.missing.length}</strong>
              <span>Skills to Learn</span>
            </div>
          </div>

          <div className="skill-gap-grid">
            <div className="skill-gap-result-card">
              <div className="skill-gap-result-heading matched-heading">
                <CheckCircle2 size={18} />
                <h3>Your Matched Skills</h3>
              </div>

              {analysis.matched.length > 0 ? (
                <div className="skill-gap-tags">
                  {analysis.matched.map((skill) => (
                    <span
                      className="skill-gap-tag matched-tag"
                      key={skill}
                    >
                      <CheckCircle2 size={13} />
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="skill-gap-empty">
                  No matching skills found yet.
                </p>
              )}
            </div>

            <div className="skill-gap-result-card">
              <div className="skill-gap-result-heading missing-heading">
                <XCircle size={18} />
                <h3>Skills You Need</h3>
              </div>

              {analysis.missing.length > 0 ? (
                <div className="skill-gap-tags">
                  {analysis.missing.map((skill) => (
                    <span
                      className="skill-gap-tag missing-tag"
                      key={skill}
                    >
                      <XCircle size={13} />
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="skill-gap-empty">
                  Great! No skill gaps detected.
                </p>
              )}
            </div>
          </div>

          <div className="skill-gap-learning-card">
            <div className="skill-gap-learning-header">
              <div className="learning-icon">
                <BookOpen size={20} />
              </div>

              <div>
                <h2>Recommended Learning Path</h2>
                <p>
                  Focus on these skills to reduce your current skill gap.
                </p>
              </div>
            </div>

            <div className="learning-recommendations">
              {analysis.missing.slice(0, 8).map((skill, index) => (
                <div className="learning-item" key={skill}>
                  <div className="learning-number">
                    {index + 1}
                  </div>

                  <div className="learning-content">
                    <strong>{skill}</strong>
                    <p>{getRecommendation(skill)}</p>
                  </div>

                  <TrendingUp size={18} />
                </div>
              ))}
            </div>

            {analysis.missing.length === 0 && (
              <div className="skill-gap-complete">
                <CheckCircle2 size={22} />
                <div>
                  <strong>Excellent!</strong>
                  <p>
                    You have covered all the recommended skills for this
                    target role.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
