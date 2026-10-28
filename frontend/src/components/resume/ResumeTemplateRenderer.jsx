import React from 'react'

/**
 * Universal Multi-Layout Resume Renderer (Canva Grade)
 * Includes:
 * - 'canva-slate': EXACT Canva two-column layout matching the user's reference image (Isabel Mercado style)
 * - 'modern-tech': Clean sans-serif tech layout with badges and timeline
 * - 'ats-classic': Standard high-parse ATS format (Serif, B&W, traditional lines)
 * - 'modern-executive': Executive banner header with white name and two-tone sections
 * - 'creative-split': Modern split-column layout
 */
function ResumeTemplateRenderer({ data, layout = "canva-slate", accentColor = "#2C3545" }) {
  const {
    name = "Isabel Mercado",
    title = "Marketing Manager",
    photo = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    email = "hello@reallygreatsite.com",
    phone = "+123-456-7890",
    location = "123 Anywhere St., Any City",
    linkedin = "isabel-mercado",
    github = "isabelmercado.me",
    summary = "",
    skills = "Management Skills, Creativity, Digital Marketing, Negotiation, Critical Thinking, Leadership",
    languages = "English, Spanish, French",
    awards = "2019 | Ingoude Company - The Best Employee of the Year\n2018 | Timmerman Industries - Outstanding Creative Leadership",
    experience = [],
    projects = [],
    education = [],
  } = data || {};

  const skillsList = skills
    ? skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const languagesList = languages
    ? languages.split(",").map((l) => l.trim()).filter(Boolean)
    : [];

  const awardsList = awards
    ? awards.split("\n").map((a) => a.trim()).filter(Boolean)
    : [];

  const renderBulletPoints = (text, textColor = "text-zinc-700") => {
    if (!text) return null;
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    return (
      <ul className="mt-1 ml-3 list-disc space-y-1 p-0">
        {lines.map((line, i) => (
          <li key={i} className={`text-[11px] leading-[1.6] ${textColor}`}>
            {line.replace(/^[-•]\s*/, "")}
          </li>
        ))}
      </ul>
    );
  };

  // ──────────────────────────────────────────────
  // LAYOUT 1: CANVA SLATE TWO-COLUMN (MATCHING USER'S REFERENCE IMAGE)
  // ──────────────────────────────────────────────
  if (layout === "canva-slate" || !layout) {
    const sidebarBg = accentColor || "#2C3545";

    return (
      <div
        className="box-border w-[210mm] min-h-[297mm] bg-white text-zinc-900 font-sans grid grid-cols-[33%_67%] overflow-hidden shadow-sm"
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        {/* LEFT COLUMN: Deep Slate Sidebar with Photo & Contact/Skills/Languages */}
        <div
          className="p-7 text-white flex flex-col justify-between"
          style={{ backgroundColor: sidebarBg }}
        >
          <div className="space-y-6">
            {/* Circular Profile Avatar / Photo matching image */}
            <div className="flex justify-center mb-6 pt-2">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/20 shadow-xl bg-zinc-700 flex items-center justify-center">
                {photo ? (
                  <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-3xl font-extrabold text-white/90">
                    {name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </div>

            {/* Section 1: Contact */}
            <div>
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-white pb-1.5 mb-3 border-b border-white/25">
                Contact
              </h2>
              <div className="space-y-2.5 text-[11px] text-white/85">
                {phone && (
                  <div>
                    <p className="font-bold text-white text-[10px] uppercase tracking-wider">Phone</p>
                    <p className="mt-0.5">{phone}</p>
                  </div>
                )}
                {email && (
                  <div>
                    <p className="font-bold text-white text-[10px] uppercase tracking-wider">Email</p>
                    <p className="mt-0.5 break-all">{email}</p>
                  </div>
                )}
                {location && (
                  <div>
                    <p className="font-bold text-white text-[10px] uppercase tracking-wider">Address</p>
                    <p className="mt-0.5 leading-relaxed">{location}</p>
                  </div>
                )}
                {linkedin && (
                  <div>
                    <p className="font-bold text-white text-[10px] uppercase tracking-wider">LinkedIn / Web</p>
                    <p className="mt-0.5 break-all text-white/90 underline text-[10.5px]">
                      {linkedin.startsWith("http") ? linkedin : `linkedin.com/in/${linkedin}`}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Expertise / Skills */}
            {skillsList.length > 0 && (
              <div>
                <h2 className="text-[13px] font-bold uppercase tracking-wider text-white pb-1.5 mb-3 border-b border-white/25">
                  Expertise
                </h2>
                <div className="space-y-1.5 text-[11px] text-white/85">
                  {skillsList.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Languages */}
            {languagesList.length > 0 && (
              <div>
                <h2 className="text-[13px] font-bold uppercase tracking-wider text-white pb-1.5 mb-3 border-b border-white/25">
                  Language
                </h2>
                <div className="space-y-1.5 text-[11px] text-white/85">
                  {languagesList.map((lang, i) => (
                    <p key={i} className="m-0 leading-snug">
                      {lang}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Section 4: Awards / Achievements */}
            {awardsList.length > 0 && (
              <div>
                <h2 className="text-[13px] font-bold uppercase tracking-wider text-white pb-1.5 mb-3 border-b border-white/25">
                  Awards
                </h2>
                <div className="space-y-2 text-[10.5px] text-white/85">
                  {awardsList.map((award, i) => {
                    const parts = award.split("|");
                    return (
                      <div key={i}>
                        {parts.length > 1 ? (
                          <>
                            <p className="font-bold text-white text-[10px]">{parts[0].trim()}</p>
                            <p className="text-white/75 mt-0.5">{parts[1].trim()}</p>
                          </>
                        ) : (
                          <p>{award}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Clean White with Experience, Education & Projects */}
        <div className="p-8 sm:p-9 bg-white flex flex-col justify-between">
          <div>
            {/* Header: Candidate Name & Title matching image */}
            <div className="mb-7 pb-4">
              <h1
                className="text-[32px] sm:text-[34px] font-extrabold tracking-tight m-0 leading-tight"
                style={{ color: sidebarBg }}
              >
                {name || "Isabel Mercado"}
              </h1>
              <p className="text-[13px] font-medium tracking-[0.08em] text-zinc-500 uppercase mt-1">
                {title || experience[0]?.role || "Marketing Manager"}
              </p>
            </div>

            {/* Professional Summary (if available) */}
            {summary && (
              <div className="mb-6">
                <h2
                  className="text-[13px] font-bold uppercase tracking-wider pb-1.5 mb-2.5 border-b border-zinc-300"
                  style={{ color: sidebarBg }}
                >
                  Profile
                </h2>
                <p className="text-[11.5px] leading-relaxed text-zinc-600">{summary}</p>
              </div>
            )}

            {/* Experience Section */}
            {experience.length > 0 && (
              <div className="mb-6">
                <h2
                  className="text-[13px] font-bold uppercase tracking-wider pb-1.5 mb-4 border-b border-zinc-300"
                  style={{ color: sidebarBg }}
                >
                  Experience
                </h2>

                <div className="space-y-4">
                  {experience.map((exp, i) => (
                    <div key={i} className="grid grid-cols-[30%_70%] gap-3 items-start">
                      {/* Left: Duration & Company */}
                      <div>
                        <p className="text-[11px] font-bold text-zinc-800 leading-snug">
                          {exp.duration}
                        </p>
                        <p className="text-[10.5px] text-zinc-500 mt-0.5">{exp.company}</p>
                        {exp.location && (
                          <p className="text-[10px] text-zinc-400">{exp.location}</p>
                        )}
                      </div>

                      {/* Right: Role & Description */}
                      <div>
                        <h3 className="text-[12px] font-bold text-zinc-900">{exp.role}</h3>
                        {renderBulletPoints(exp.description, "text-zinc-600")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <div className="mb-6">
                <h2
                  className="text-[13px] font-bold uppercase tracking-wider pb-1.5 mb-4 border-b border-zinc-300"
                  style={{ color: sidebarBg }}
                >
                  Education
                </h2>

                <div className="space-y-3.5">
                  {education.map((edu, i) => (
                    <div key={i} className="grid grid-cols-[30%_70%] gap-3 items-start">
                      <div>
                        <p className="text-[11px] font-bold text-zinc-800 leading-snug">
                          {edu.year}
                        </p>
                        <p className="text-[10.5px] text-zinc-500 mt-0.5">
                          {edu.institution || edu.college}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-[12px] font-bold text-zinc-900">
                          {edu.degree}
                          {edu.branch ? ` in ${edu.branch}` : ""}
                        </h3>
                        {edu.score && (
                          <p className="text-[11px] text-zinc-500 mt-0.5">{edu.score}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Projects / References Section */}
            {projects.length > 0 && (
              <div>
                <h2
                  className="text-[13px] font-bold uppercase tracking-wider pb-1.5 mb-4 border-b border-zinc-300"
                  style={{ color: sidebarBg }}
                >
                  Projects &amp; References
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.map((proj, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-[11.5px] font-bold text-zinc-900">
                          {proj.title || proj.name}
                        </h4>
                      </div>
                      {(proj.link || proj.github) && (
                        <p className="text-[10px] text-blue-600 underline truncate mt-0.5">
                          {proj.link || proj.github}
                        </p>
                      )}
                      {(proj.tech || proj.techStack) && (
                        <p className="text-[10px] font-medium text-zinc-500 mt-1">
                          🛠️ {proj.tech || proj.techStack}
                        </p>
                      )}
                      {renderBulletPoints(proj.description, "text-zinc-600")}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────
  // LAYOUT 2: MODERN TECH (CLEAN WHITE)
  // ──────────────────────────────────────────────
  if (layout === "modern-tech") {
    return (
      <div
        className="box-border w-[210mm] min-h-[297mm] bg-white px-[18mm] py-[16mm] text-zinc-900 font-sans"
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        <div className="mb-6 pb-5 border-b border-zinc-200 flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-extrabold tracking-tight" style={{ color: accentColor }}>
              {name || "YOUR NAME"}
            </h1>
            <p className="text-[12px] font-medium text-zinc-600 mt-0.5">
              {title || experience[0]?.role || "Professional Title"}
            </p>
          </div>
          <div className="text-right text-[11px] text-zinc-600 space-y-0.5">
            {phone && <div>📞 {phone}</div>}
            {email && <div>✉️ {email}</div>}
            {location && <div>📍 {location}</div>}
          </div>
        </div>

        {summary && (
          <section className="mb-5">
            <h2 className="text-[12px] font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: accentColor }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
              Professional Summary
            </h2>
            <p className="text-[11.5px] leading-relaxed text-zinc-700 pl-4 border-l-2" style={{ borderColor: `${accentColor}40` }}>
              {summary}
            </p>
          </section>
        )}

        {skillsList.length > 0 && (
          <section className="mb-5">
            <h2 className="text-[12px] font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2" style={{ color: accentColor }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
              Skills &amp; Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5 pl-4">
              {skillsList.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-[10.5px] font-semibold border"
                  style={{
                    backgroundColor: `${accentColor}0C`,
                    borderColor: `${accentColor}30`,
                    color: accentColor,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-[12px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: accentColor }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
              Experience
            </h2>
            <div className="space-y-4 pl-4">
              {experience.map((exp, i) => (
                <div key={i} className="relative border-l-2 pl-4" style={{ borderColor: `${accentColor}30` }}>
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[12px] font-bold text-zinc-900">{exp.role}</h3>
                    <span className="text-[10px] font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">{exp.duration}</span>
                  </div>
                  <div className="text-[11px] font-medium text-zinc-600 mb-1">
                    {exp.company} {exp.location ? `• ${exp.location}` : ""}
                  </div>
                  {renderBulletPoints(exp.description, "text-zinc-700")}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-4">
            <h2 className="text-[12px] font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2" style={{ color: accentColor }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
              Education
            </h2>
            <div className="space-y-2 pl-4">
              {education.map((edu, i) => (
                <div key={i} className="flex justify-between items-center text-[11px]">
                  <div>
                    <span className="font-bold text-zinc-900">{edu.degree}</span> — <span className="text-zinc-600">{edu.institution || edu.college}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-500">{edu.year}</span>
                    {edu.score && <span className="ml-2 font-semibold text-zinc-800">[{edu.score}]</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // ──────────────────────────────────────────────
  if (layout === "creative-split") {
    return (
      <div className="box-border grid min-h-[297mm] w-[210mm] grid-cols-[34%_66%] overflow-hidden bg-white text-slate-900 shadow-sm" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <aside className="flex flex-col gap-7 p-7 text-white" style={{ backgroundColor: accentColor }}>
          <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-white/40 bg-white/15">
            {photo ? <img src={photo} alt={name} className="h-full w-full object-cover" /> : <span className="grid h-full place-items-center text-3xl font-bold">{name?.charAt(0)}</span>}
          </div>
          <div><h2 className="mb-3 border-b border-white/30 pb-2 text-xs font-bold uppercase tracking-[0.18em]">Contact</h2><div className="space-y-2 break-words text-[10px] text-white/90">{[phone, email, location, linkedin, github].filter(Boolean).map((value) => <p key={value}>{value}</p>)}</div></div>
          <div><h2 className="mb-3 border-b border-white/30 pb-2 text-xs font-bold uppercase tracking-[0.18em]">Core skills</h2><div className="space-y-2 text-[10px] text-white/90">{skillsList.map((skill) => <p key={skill}>� {skill}</p>)}</div></div>
          {languagesList.length > 0 && <div><h2 className="mb-3 border-b border-white/30 pb-2 text-xs font-bold uppercase tracking-[0.18em]">Languages</h2><div className="space-y-1 text-[10px] text-white/90">{languagesList.map((language) => <p key={language}>{language}</p>)}</div></div>}
          {awardsList.length > 0 && <div><h2 className="mb-3 border-b border-white/30 pb-2 text-xs font-bold uppercase tracking-[0.18em]">Recognition</h2><div className="space-y-2 text-[9px] text-white/85">{awardsList.map((award) => <p key={award}>{award}</p>)}</div></div>}
        </aside>
        <main className="space-y-6 px-8 py-10">
          <header className="border-b-2 pb-5" style={{ borderColor: accentColor }}><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentColor }}>{title}</p><h1 className="text-[32px] font-extrabold leading-tight tracking-tight">{name}</h1></header>
          {summary && <section><h2 className="mb-2 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>Profile</h2><p className="text-[11px] leading-relaxed text-slate-600">{summary}</p></section>}
          {experience.length > 0 && <section><h2 className="mb-3 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>Experience</h2><div className="space-y-4">{experience.map((item, i) => <div key={i}><div className="flex justify-between gap-2"><h3 className="text-[11px] font-bold">{item.role}</h3><span className="text-[9px] text-slate-500">{item.duration}</span></div><p className="text-[10px] font-medium text-slate-500">{item.company} {item.location && `� ${item.location}`}</p>{renderBulletPoints(item.description, "text-slate-600")}</div>)}</div></section>}
          {education.length > 0 && <section><h2 className="mb-3 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>Education</h2><div className="space-y-3">{education.map((item, i) => <div key={i} className="flex justify-between gap-3 text-[10px]"><div><p className="font-bold">{item.degree}</p><p className="text-slate-500">{item.institution || item.college}</p></div><p className="shrink-0 text-slate-500">{item.year}</p></div>)}</div></section>}
          {projects.length > 0 && <section><h2 className="mb-3 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>Selected work</h2><div className="space-y-3">{projects.map((item, i) => <div key={i}><h3 className="text-[10px] font-bold">{item.title || item.name}</h3><p className="text-[9px] text-slate-500">{item.tech || item.techStack}</p>{renderBulletPoints(item.description, "text-slate-600")}</div>)}</div></section>}
        </main>
      </div>
    );
  }

  if (layout === "executive-banner") {
    return (
      <div className="box-border min-h-[297mm] w-[210mm] overflow-hidden bg-white text-slate-900 shadow-sm" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <header className="flex min-h-[62mm] items-center gap-7 px-10 py-8 text-white" style={{ background: `linear-gradient(115deg, ${accentColor}, #111827)` }}>
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-xl">{photo ? <img src={photo} alt={name} className="h-full w-full object-cover" /> : <span className="grid h-full place-items-center text-3xl font-bold">{name?.charAt(0)}</span>}</div>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">Leadership profile</p><h1 className="mt-2 text-[32px] font-extrabold leading-tight">{name}</h1><p className="mt-1 text-sm font-medium text-white/80">{title}</p><p className="mt-3 text-[9px] text-white/70">{[email, phone, location, linkedin].filter(Boolean).join("  �  ")}</p></div>
        </header>
        <div className="grid grid-cols-[65%_35%] gap-8 px-10 py-8">
          <main className="space-y-6">
            {summary && <section><h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: accentColor }}>Executive summary</h2><p className="text-[11px] leading-relaxed text-slate-600">{summary}</p></section>}
            {experience.length > 0 && <section><h2 className="mb-4 border-b-2 pb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ borderColor: accentColor, color: accentColor }}>Career history</h2><div className="space-y-5">{experience.map((item, i) => <div key={i} className="border-l-2 pl-4" style={{ borderColor: accentColor }}><div className="flex justify-between gap-2"><h3 className="text-[11px] font-bold">{item.role}</h3><span className="shrink-0 text-[9px] text-slate-500">{item.duration}</span></div><p className="text-[10px] font-semibold text-slate-500">{item.company} {item.location && `� ${item.location}`}</p>{renderBulletPoints(item.description, "text-slate-600")}</div>)}</div></section>}
            {education.length > 0 && <section><h2 className="mb-3 border-b-2 pb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ borderColor: accentColor, color: accentColor }}>Education</h2>{education.map((item, i) => <div key={i} className="mb-3 flex justify-between gap-3 text-[10px]"><div><p className="font-bold">{item.degree}</p><p className="text-slate-500">{item.institution || item.college}</p></div><span className="shrink-0 text-slate-500">{item.year}</span></div>)}</section>}
            {projects.length > 0 && <section><h2 className="mb-3 border-b-2 pb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ borderColor: accentColor, color: accentColor }}>Selected achievements</h2>{projects.map((item, i) => <div key={i} className="mb-3"><h3 className="text-[10px] font-bold">{item.title || item.name}</h3>{renderBulletPoints(item.description, "text-slate-600")}</div>)}</section>}
          </main>
          <aside className="space-y-6 border-l border-slate-200 pl-6">
            <section><h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: accentColor }}>Expertise</h2><div className="space-y-2">{skillsList.map((skill) => <div key={skill}><p className="mb-1 text-[9px] font-medium">{skill}</p><div className="h-1 rounded-full bg-slate-100"><div className="h-full w-4/5 rounded-full" style={{ backgroundColor: accentColor }} /></div></div>)}</div></section>
            {languagesList.length > 0 && <section><h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: accentColor }}>Languages</h2>{languagesList.map((language) => <p key={language} className="mb-1 text-[10px] text-slate-600">{language}</p>)}</section>}
            {awardsList.length > 0 && <section><h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: accentColor }}>Honors</h2>{awardsList.map((award) => <p key={award} className="mb-2 text-[9px] leading-relaxed text-slate-600">{award}</p>)}</section>}
          </aside>
        </div>
      </div>
    );
  }

  if (layout === "editorial-minimal") {
    return (
      <div className="box-border min-h-[297mm] w-[210mm] bg-[#fffefa] px-[20mm] py-[18mm] text-stone-900 shadow-sm" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
        <header className="border-b border-stone-300 pb-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.3em]" style={{ color: accentColor }}>{title}</p>
          <h1 className="mt-3 text-[34px] font-medium leading-tight tracking-tight">{name}</h1>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[9px] text-stone-500">{[email, phone, location, linkedin].filter(Boolean).map((item) => <span key={item}>{item}</span>)}</div>
        </header>
        {summary && <section className="border-b border-stone-200 py-5"><h2 className="mb-2 text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: accentColor }}>At a glance</h2><p className="text-[11px] leading-[1.8] text-stone-700">{summary}</p></section>}
        <div className="grid grid-cols-[65%_35%] gap-8 py-5">
          <main className="space-y-5">
            {experience.length > 0 && <section><h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>Experience</h2>{experience.map((item, i) => <div key={i} className="mb-5"><div className="flex justify-between gap-2"><h3 className="text-[11px] font-bold">{item.role}</h3><span className="text-[9px] text-stone-500">{item.duration}</span></div><p className="mt-0.5 text-[9px] italic text-stone-500">{item.company} {item.location && `� ${item.location}`}</p>{renderBulletPoints(item.description, "text-stone-600")}</div>)}</section>}
            {education.length > 0 && <section><h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>Education</h2>{education.map((item, i) => <div key={i} className="mb-3 text-[10px]"><p className="font-bold">{item.degree}</p><p className="text-stone-500">{item.institution || item.college} � {item.year}</p></div>)}</section>}
            {projects.length > 0 && <section><h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>Selected projects</h2>{projects.map((item, i) => <div key={i} className="mb-3"><h3 className="text-[10px] font-bold">{item.title || item.name}</h3>{renderBulletPoints(item.description, "text-stone-600")}</div>)}</section>}
          </main>
          <aside className="space-y-6 border-l border-stone-200 pl-5">
            <section><h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>Capabilities</h2><div className="space-y-1.5 text-[10px] text-stone-600">{skillsList.map((skill) => <p key={skill}>{skill}</p>)}</div></section>
            {languagesList.length > 0 && <section><h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>Languages</h2>{languagesList.map((language) => <p key={language} className="mb-1 text-[10px] text-stone-600">{language}</p>)}</section>}
            {awardsList.length > 0 && <section><h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>Recognition</h2>{awardsList.map((award) => <p key={award} className="mb-2 text-[9px] leading-relaxed text-stone-600">{award}</p>)}</section>}
          </aside>
        </div>
      </div>
    );
  }

  // LAYOUT 3: ATS CLASSIC (TRADITIONAL B&W SERIF)
  // ──────────────────────────────────────────────
  const halfList = Math.ceil(skillsList.length / 2);
  const skillsCol1 = skillsList.slice(0, halfList);
  const skillsCol2 = skillsList.slice(halfList);

  return (
    <div
      className="box-border w-[210mm] min-h-[297mm] bg-white px-[18mm] py-[15mm] text-black"
      style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
    >
      <div className="mb-[12px] border-b-2 border-black pb-[10px] text-center">
        <h1 className="m-0 mb-[6px] text-[26px] font-bold uppercase tracking-[0.08em]">{name || "YOUR NAME"}</h1>
        <div className="flex flex-wrap justify-center text-[10.5px] text-black">
          {[email, phone, location, linkedin ? `linkedin.com/in/${linkedin}` : null, github].filter(Boolean).map((v, i, arr) => (
            <span key={i} className="whitespace-nowrap">
              {v}
              {i < arr.length - 1 && <span className="mx-[7px] text-black">|</span>}
            </span>
          ))}
        </div>
      </div>

      {summary && (
        <section className="mb-[14px]">
          <h2 className="mt-0 mb-[8px] border-b-[1.5px] border-black pb-[2px] text-[11px] font-bold uppercase tracking-[0.14em]">
            Professional Summary
          </h2>
          <p className="m-0 text-[11px] leading-[1.65]">{summary}</p>
        </section>
      )}

      {skillsList.length > 0 && (
        <section className="mb-[14px]">
          <h2 className="mt-0 mb-[8px] border-b-[1.5px] border-black pb-[2px] text-[11px] font-bold uppercase tracking-[0.14em]">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-[3px]">
            <div>{skillsCol1.map((s, i) => <p key={i} className="m-0 text-[11px]"> • {s}</p>)}</div>
            <div>{skillsCol2.map((s, i) => <p key={i} className="m-0 text-[11px]"> • {s}</p>)}</div>
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-[14px]">
          <h2 className="mt-0 mb-[8px] border-b-[1.5px] border-black pb-[2px] text-[11px] font-bold uppercase tracking-[0.14em]">
            Work Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-[10px]">
              <div className="flex justify-between text-[11.5px] font-bold">
                <span>{exp.role}</span>
                <span>{exp.duration}</span>
              </div>
              <div className="text-[11px] italic mb-1">
                <span>{exp.company}</span> {exp.location ? `• ${exp.location}` : ""}
              </div>
              {renderBulletPoints(exp.description, "text-black")}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-[14px]">
          <h2 className="mt-0 mb-[8px] border-b-[1.5px] border-black pb-[2px] text-[11px] font-bold uppercase tracking-[0.14em]">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-[6px] flex justify-between text-[11px]">
              <div>
                <span className="font-bold">{edu.degree}</span> — {edu.institution || edu.college}
              </div>
              <div className="text-right">
                <span>{edu.year}</span> {edu.score && <span className="ml-1 font-semibold">({edu.score})</span>}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default ResumeTemplateRenderer;
