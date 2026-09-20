
import { useState } from "react";
import {
  Target,
  Search,
  CheckCircle2,
  XCircle,
  Lightbulb,
  RotateCcw,
  Briefcase,
} from "lucide-react";

const skillsList = [
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

function JobMatcher() {
  const [jobDescription, setJobDescription] = useState("");
  const [mySkills, setMySkills] = useState("");
  const [result, setResult] = useState(null);

  function analyzeMatch() {
    if (jobDescription.trim() === "") {
      alert("Please enter the job description.");
      return;
    }

    if (mySkills.trim() === "") {
      alert("Please enter your skills.");
      return;
    }

    const jobText = jobDescription.toLowerCase();
    const skillText = mySkills.toLowerCase();

    // Find skills mentioned in job description
    const requiredSkills = [];

    skillsList.forEach(function (skill) {
      if (jobText.includes(skill)) {
        requiredSkills.push(skill);
      }
    });

    // Find user's skills
    const enteredSkills = skillText
      .split(",")
      .map(function (skill) {
        return skill.trim();
      })
      .filter(function (skill) {
        return skill !== "";
      });

    const matchedSkills = [];
    const missingSkills = [];

    requiredSkills.forEach(function (requiredSkill) {
      let isMatched = false;

      enteredSkills.forEach(function (enteredSkill) {
        if (
          enteredSkill === requiredSkill ||
          enteredSkill.includes(requiredSkill) ||
          requiredSkill.includes(enteredSkill)
        ) {
          isMatched = true;
        }
      });

      if (isMatched) {
        matchedSkills.push(requiredSkill);
      } else {
        missingSkills.push(requiredSkill);
      }
    });

    let score = 50;

    if (requiredSkills.length > 0) {
      score = Math.round(
        (matchedSkills.length / requiredSkills.length) * 100
      );
    }

    let status = "Low Match";

    if (score >= 80) {
      status = "Strong Match";
    } else if (score >= 60) {
      status = "Good Match";
    } else if (score >= 40) {
      status = "Partial Match";
    }

    setResult({
      score: score,
      status: status,
      requiredSkills: requiredSkills,
      matchedSkills: matchedSkills,
      missingSkills: missingSkills,
    });
  }

  function clearAll() {
    setJobDescription("");
    setMySkills("");
    setResult(null);
  }

  return (
    <div className="page-container job-matcher-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <div className="section-badge">
            <Target size={14} />
            JOB ANALYZER
          </div>

          <h1>Job Matcher</h1>

          <p>
            Compare your skills with a job description and
            discover your skill match.
          </p>
        </div>

        <div className="job-matcher-icon">
          <Target size={25} />
        </div>
      </div>

      {/* Input Boxes */}
      <div className="job-matcher-grid">

        {/* Job Description */}
        <div className="matcher-box">
          <div className="matcher-title">
            <div className="matcher-title-icon">
              <Briefcase size={18} />
            </div>

            <div>
              <h2>Job Description</h2>
              <p>Paste the complete job description here.</p>
            </div>
          </div>

          <textarea
            className="matcher-textarea"
            value={jobDescription}
            onChange={function (event) {
              setJobDescription(event.target.value);
            }}
            placeholder="Example: We are looking for a Software Developer with experience in Python, React, SQL, Git, Docker and REST API."
          />
        </div>

        {/* My Skills */}
        <div className="matcher-box">
          <div className="matcher-title">
            <div className="matcher-title-icon">
              <Target size={18} />
            </div>

            <div>
              <h2>Your Skills</h2>
              <p>Enter your skills separated by commas.</p>
            </div>
          </div>

          <textarea
            className="matcher-textarea skills-textarea"
            value={mySkills}
            onChange={function (event) {
              setMySkills(event.target.value);
            }}
            placeholder="Example: Python, React, JavaScript, Git"
          />

          <p className="matcher-tip">
            Tip: Add the skills you currently have.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="matcher-buttons">

        <button
          type="button"
          className="btn btn-secondary"
          onClick={clearAll}
        >
          <RotateCcw size={16} />
          Clear
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={analyzeMatch}
        >
          <Search size={16} />
          Analyze Match
        </button>

      </div>

      {/* Results */}
      {result !== null && (
        <div className="job-result">

          {/* Score */}
          <div className="match-score">

            <div className="score-number">
              <strong>{result.score}%</strong>
              <span>Match</span>
            </div>

            <div className="score-info">
              <span>COMPATIBILITY SCORE</span>

              <h2>{result.status}</h2>

              <p>
                Your skills were compared with the skills
                detected in the job description.
              </p>
            </div>

            <div className="score-stats">

              <div>
                <Target size={17} />
                <strong>
                  {result.requiredSkills.length}
                </strong>
                <span>Required</span>
              </div>

              <div>
                <CheckCircle2 size={17} />
                <strong>
                  {result.matchedSkills.length}
                </strong>
                <span>Matched</span>
              </div>

              <div>
                <XCircle size={17} />
                <strong>
                  {result.missingSkills.length}
                </strong>
                <span>Missing</span>
              </div>

            </div>
          </div>

          {/* Required Skills */}
          <div className="skills-result-card required-skills-card">

            <div className="result-heading required-heading">
              <Target size={18} />

              <div>
                <h3>Required Skills</h3>
                <p>
                  Skills detected from the job description.
                </p>
              </div>
            </div>

            <div className="skill-tags">

              {result.requiredSkills.length > 0 ? (
                result.requiredSkills.map(function (skill) {
                  return (
                    <span
                      className="required-skill"
                      key={skill}
                    >
                      <Target size={12} />
                      {skill}
                    </span>
                  );
                })
              ) : (
                <p className="no-result">
                  No recognized skills found in the job description.
                </p>
              )}

            </div>
          </div>

          {/* Matched + Missing */}
          <div className="skills-result-grid">

            {/* Matched */}
            <div className="skills-result-card">

              <div className="result-heading">
                <CheckCircle2 size={18} />

                <div>
                  <h3>Matched Skills</h3>
                  <p>
                    Skills you already have.
                  </p>
                </div>
              </div>

              <div className="skill-tags">

                {result.matchedSkills.length > 0 ? (
                  result.matchedSkills.map(function (skill) {
                    return (
                      <span
                        className="matched-skill"
                        key={skill}
                      >
                        <CheckCircle2 size={12} />
                        {skill}
                      </span>
                    );
                  })
                ) : (
                  <p className="no-result">
                    No matching skills found.
                  </p>
                )}

              </div>
            </div>

            {/* Missing */}
            <div className="skills-result-card">

              <div className="result-heading missing-heading">
                <XCircle size={18} />

                <div>
                  <h3>Missing Skills</h3>
                  <p>
                    Skills you should consider learning.
                  </p>
                </div>
              </div>

              <div className="skill-tags">

                {result.missingSkills.length > 0 ? (
                  result.missingSkills.map(function (skill) {
                    return (
                      <span
                        className="missing-skill"
                        key={skill}
                      >
                        <XCircle size={12} />
                        {skill}
                      </span>
                    );
                  })
                ) : (
                  <p className="no-result">
                    Great! No required skills are missing.
                  </p>
                )}

              </div>
            </div>

          </div>

          {/* Recommendation */}
          <div className="matcher-recommendation">

            <div className="recommendation-icon">
              <Lightbulb size={20} />
            </div>

            <div>
              <span>RECOMMENDATION</span>

              <h3>
                What should you do next?
              </h3>

              {result.missingSkills.length > 0 ? (
                <p>
                  Focus on learning{" "}
                  <strong>
                    {result.missingSkills
                      .slice(0, 5)
                      .join(", ")}
                  </strong>{" "}
                  and add relevant projects to your resume.
                </p>
              ) : (
                <p>
                  Your listed skills match all detected job
                  requirements. Highlight these skills and your
                  relevant projects in your resume.
                </p>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default JobMatcher;
