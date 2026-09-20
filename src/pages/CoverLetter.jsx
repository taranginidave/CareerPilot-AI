
import { useState } from "react";
import {
  FileText,
  Sparkles,
  Copy,
  Download,
  Printer,
  RotateCcw,
  CheckCircle2,
  Briefcase,
  User,
  Wand2,
} from "lucide-react";

export default function CoverLetter() {
  const [form, setForm] = useState({
    name: "",
    jobTitle: "",
    company: "",
    skills: "",
    experience: "Fresher",
    tone: "Professional",
    jobDescription: "",
  });

  const [coverLetter, setCoverLetter] = useState("");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const generateCoverLetter = () => {
    if (
      !form.name.trim() ||
      !form.jobTitle.trim() ||
      !form.company.trim()
    ) {
      alert(
        "Please enter your name, job title and company name."
      );
      return;
    }

    const skills = form.skills.trim()
      ? form.skills
      : "problem-solving, communication and technical skills";

    const experienceText =
      form.experience === "Fresher"
        ? "As a fresher, I am eager to apply my academic knowledge, technical skills and willingness to learn in a professional environment."
        : `With ${form.experience.toLowerCase()} of experience, I have developed practical knowledge and professional skills that I can bring to this role.`;

    const toneOpening =
      form.tone === "Confident"
        ? `I am excited to apply for the ${form.jobTitle} position at ${form.company}. I am confident that my technical skills, dedication and ability to learn quickly would allow me to contribute effectively to your team.`
        : form.tone === "Friendly"
        ? `I am delighted to apply for the ${form.jobTitle} position at ${form.company}. I would love the opportunity to bring my skills, curiosity and enthusiasm to your team.`
        : `I am writing to express my interest in the ${form.jobTitle} position at ${form.company}. I believe my technical background, willingness to learn and problem-solving abilities make me a strong candidate for this opportunity.`;

    const jobParagraph = form.jobDescription.trim()
      ? `After reviewing the requirements for this position, I was particularly interested in the opportunity to contribute to the work described in the job posting. I am prepared to apply my knowledge in areas such as ${skills} while continuing to learn and grow in the role.`
      : `My key skills include ${skills}. I am particularly interested in opportunities where I can apply these skills to real-world projects and continue developing as a professional.`;

    const letter = `Dear Hiring Manager,

${toneOpening}

${experienceText}

${jobParagraph}

I am a motivated individual who values continuous learning, teamwork and delivering quality work. I would welcome the opportunity to discuss how my background and skills could contribute to ${form.company}.

Thank you for considering my application. I look forward to the opportunity to discuss the ${form.jobTitle} position with you.

Sincerely,
${form.name}`;

    setCoverLetter(letter);
    setGenerated(true);
    setCopied(false);
  };

  const copyLetter = async () => {
    if (!coverLetter) {
      return;
    }

    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      alert("Unable to copy the cover letter.");
    }
  };

  const downloadLetter = () => {
    if (!coverLetter) {
      return;
    }

    const blob = new Blob([coverLetter], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${form.jobTitle || "cover-letter"}-cover-letter.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const printLetter = () => {
    if (!coverLetter) {
      return;
    }

    const printWindow = window.open(
      "",
      "_blank",
      "width=850,height=900"
    );

    if (!printWindow) {
      alert("Please allow pop-ups to print the cover letter.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cover Letter - ${form.jobTitle}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 30px;
              color: #222;
              line-height: 1.8;
              white-space: pre-wrap;
            }

            h1 {
              font-size: 24px;
              margin-bottom: 30px;
            }

            .letter {
              white-space: pre-wrap;
              font-size: 15px;
            }
          </style>
        </head>
        <body>
          <h1>Cover Letter</h1>
          <div class="letter">${coverLetter}</div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 300);
  };

  const clearAll = () => {
    setForm({
      name: "",
      jobTitle: "",
      company: "",
      skills: "",
      experience: "Fresher",
      tone: "Professional",
      jobDescription: "",
    });

    setCoverLetter("");
    setGenerated(false);
    setCopied(false);
  };

  return (
    <div className="page-container cover-letter-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <div className="section-badge">
            <Sparkles size={14} />
            AI CAREER TOOL
          </div>

          <h1>Cover Letter Generator</h1>

          <p>
            Create a professional, job-specific cover letter
            in seconds.
          </p>
        </div>

        <div className="cover-letter-header-icon">
          <FileText size={25} />
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="cover-letter-layout">
        {/* FORM */}
        <div className="cover-letter-form-card">
          <div className="card-heading">
            <div className="card-heading-icon">
              <Briefcase size={18} />
            </div>

            <div>
              <h2>Job Details</h2>
              <p>
                Tell us about the position you are applying for.
              </p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">
                <User size={14} />
                Your Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Tarangini Dave"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobTitle">
                <Briefcase size={14} />
                Job Title
              </label>

              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                placeholder="e.g. Software Developer"
                value={form.jobTitle}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">
                Company Name
              </label>

              <input
                id="company"
                name="company"
                type="text"
                placeholder="e.g. Google"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">
                Experience
              </label>

              <select
                id="experience"
                name="experience"
                value={form.experience}
                onChange={handleChange}
              >
                <option value="Fresher">Fresher</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2-4 years">2-4 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tone">
                Writing Tone
              </label>

              <select
                id="tone"
                name="tone"
                value={form.tone}
                onChange={handleChange}
              >
                <option value="Professional">
                  Professional
                </option>
                <option value="Confident">
                  Confident
                </option>
                <option value="Friendly">
                  Friendly
                </option>
              </select>
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="skills">
                Your Skills
              </label>

              <input
                id="skills"
                name="skills"
                type="text"
                placeholder="e.g. Python, React, SQL, Machine Learning"
                value={form.skills}
                onChange={handleChange}
              />

              <small>
                Separate multiple skills using commas.
              </small>
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="jobDescription">
                Job Description
              </label>

              <textarea
                id="jobDescription"
                name="jobDescription"
                rows="7"
                placeholder="Paste the job description here..."
                value={form.jobDescription}
                onChange={handleChange}
              />

              <small>
                Adding the job description helps create a more
                relevant letter.
              </small>
            </div>
          </div>

          <div className="cover-letter-actions">
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
              className="btn btn-primary generate-cover-btn"
              onClick={generateCoverLetter}
            >
              <Wand2 size={17} />
              Generate Cover Letter
            </button>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="cover-letter-output-card">
          <div className="output-header">
            <div>
              <span className="output-label">
                GENERATED LETTER
              </span>

              <h2>Your Cover Letter</h2>
            </div>

            {generated && (
              <div className="generated-status">
                <CheckCircle2 size={14} />
                Ready
              </div>
            )}
          </div>

          {!coverLetter ? (
            <div className="empty-letter">
              <div className="empty-letter-icon">
                <FileText size={30} />
              </div>

              <h3>Your cover letter will appear here</h3>

              <p>
                Fill in your job details and click
                <strong> Generate Cover Letter</strong>.
              </p>
            </div>
          ) : (
            <>
              <textarea
                className="cover-letter-editor"
                value={coverLetter}
                onChange={(event) =>
                  setCoverLetter(event.target.value)
                }
                spellCheck="false"
              />

              <div className="letter-actions">
                <button
                  type="button"
                  className="letter-action-btn"
                  onClick={copyLetter}
                >
                  {copied ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <Copy size={16} />
                  )}

                  {copied ? "Copied" : "Copy"}
                </button>

                <button
                  type="button"
                  className="letter-action-btn"
                  onClick={downloadLetter}
                >
                  <Download size={16} />
                  Download
                </button>

                <button
                  type="button"
                  className="letter-action-btn"
                  onClick={printLetter}
                >
                  <Printer size={16} />
                  Print / PDF
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* INFO */}
      <div className="cover-letter-tips">
        <div>
          <Sparkles size={18} />
        </div>

        <div>
          <strong>Make it personal</strong>
          <p>
            Add specific skills and paste the job description
            to make your cover letter more relevant to the
            position.
          </p>
        </div>
      </div>
    </div>
  );
}

