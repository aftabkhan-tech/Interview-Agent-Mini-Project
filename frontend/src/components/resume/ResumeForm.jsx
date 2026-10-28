import React, { useRef } from 'react'
import { FiPlus, FiTrash2, FiUpload, FiImage } from 'react-icons/fi'

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value || ""}
        className="bg-zinc-50 hover:bg-zinc-100/70 border border-zinc-200 focus:bg-white text-zinc-900 text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 transition-all placeholder-zinc-400 shadow-sm"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value || ""}
        rows={rows}
        className="bg-zinc-50 hover:bg-zinc-100/70 border border-zinc-200 focus:bg-white text-zinc-900 text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 transition-all placeholder-zinc-400 resize-none shadow-sm leading-relaxed"
      />
    </div>
  );
}

function EntryCard({ children, onRemove, title }) {
  return (
    <div className="relative overflow-hidden bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-purple-300 transition-all">
      <button
        onClick={onRemove}
        className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors cursor-pointer"
        title="Remove this item"
      >
        <FiTrash2 size={13} />
      </button>
      {title && (
        <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider mb-2.5 block">
          {title}
        </span>
      )}
      <div className="relative flex flex-col gap-3 pr-8">{children}</div>
    </div>
  );
}

function ResumeForm({ step, data, setData }) {
  const fileInputRef = useRef(null);

  // Handle local photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Step 1: Personal Info & Photo
  if (step === 1) {
    return (
      <div className="flex flex-col gap-4">
        {/* Photo Upload Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/60 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-300 bg-white shrink-0 shadow-sm flex items-center justify-center">
            {data.photo ? (
              <img
                src={data.photo}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <FiImage size={24} className="text-zinc-400" />
            )}
          </div>

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h4 className="text-xs font-bold text-zinc-900">
              Profile Photo (Canva Style)
            </h4>
            <p className="text-[11px] text-zinc-500">
              Upload a professional photo or paste an image URL to appear in the circular frame.
            </p>

            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <FiUpload size={12} /> Upload Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              {data.photo && (
                <button
                  type="button"
                  onClick={() => setData({ ...data, photo: "" })}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 hover:text-red-500 bg-white border border-zinc-200 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Input
            label="Full Name"
            placeholder="e.g. Isabel Mercado"
            onChange={(v) => setData({ ...data, name: v })}
            value={data.name}
          />
          <Input
            label="Professional Title"
            placeholder="e.g. Marketing Manager"
            onChange={(v) => setData({ ...data, title: v })}
            value={data.title}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Input
            label="Email Address"
            placeholder="e.g. hello@reallygreatsite.com"
            onChange={(v) => setData({ ...data, email: v })}
            value={data.email}
          />
          <Input
            label="Phone Number"
            placeholder="e.g. 123-456-7890"
            onChange={(v) => setData({ ...data, phone: v })}
            value={data.phone}
          />
        </div>

        <Input
          label="Address / Location"
          placeholder="e.g. 123 Anywhere St., Any City"
          onChange={(v) => setData({ ...data, location: v })}
          value={data.location}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Input
            label="LinkedIn URL or Username"
            placeholder="e.g. isabel-mercado"
            onChange={(v) => setData({ ...data, linkedin: v })}
            value={data.linkedin}
          />
          <Input
            label="Website or Portfolio / GitHub"
            placeholder="e.g. isabelmercado.me"
            value={data.github}
            onChange={(v) => setData({ ...data, github: v })}
          />
        </div>
      </div>
    );
  }

  // Step 2: Summary
  if (step === 2) {
    return (
      <div className="flex flex-col gap-3.5">
        <TextArea
          label="Profile / Professional Summary"
          placeholder="Dynamic Marketing Manager with 6+ years of expertise in brand positioning, cross-functional product design management..."
          rows={6}
          onChange={(v) => setData({ ...data, summary: v })}
          value={data.summary}
        />
        <div className="p-3 bg-purple-50 rounded-xl border border-purple-200/60 text-[11.5px] text-purple-900 leading-relaxed">
          💡 <strong>Canva Design Tip:</strong> Keep your summary engaging and focused on your core value proposition, key metrics, and leadership strengths.
        </div>
      </div>
    );
  }

  // Step 3: Skills, Languages & Awards
  if (step === 3) {
    return (
      <div className="flex flex-col gap-4">
        <TextArea
          label="Expertise / Skills (Comma Separated)"
          placeholder="Management Skills, Creativity, Digital Marketing, Negotiation, Critical Thinking, Leadership"
          rows={4}
          onChange={(v) => setData({ ...data, skills: v })}
          value={data.skills}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <TextArea
            label="Languages (Left Column)"
            placeholder="English (Native), Spanish (Fluent), French (Basic)"
            rows={3}
            onChange={(v) => setData({ ...data, languages: v })}
            value={data.languages}
          />

          <TextArea
            label="Awards & Honors (e.g. Year | Award)"
            placeholder={"2019 | Ingoude Company - The Best Employee of the Year\n2018 | Timmerman Industries - Outstanding Creative Leadership"}
            rows={3}
            onChange={(v) => setData({ ...data, awards: v })}
            value={data.awards}
          />
        </div>
      </div>
    );
  }

  // Step 4: Work Experience
  if (step === 4) {
    const addExp = () => {
      setData({
        ...data,
        experience: [
          ...(data.experience || []),
          { company: "", role: "", duration: "", location: "", description: "" },
        ],
      });
    };

    const removeExp = (index) => {
      setData({
        ...data,
        experience: (data.experience || []).filter((_, i) => i !== index),
      });
    };

    const updateExp = (index, field, value) => {
      const updated = (data.experience || []).map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      );
      setData({ ...data, experience: updated });
    };

    return (
      <div className="flex flex-col gap-4">
        {(!data.experience || data.experience.length === 0) && (
          <div className="text-xs text-zinc-500 text-center py-8 border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50">
            No work experience added yet. Click below to add your jobs or internships.
          </div>
        )}

        {(data.experience || []).map((exp, index) => (
          <EntryCard
            key={index}
            onRemove={() => removeExp(index)}
            title={`Experience #${index + 1}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Role Title"
                placeholder="e.g. Product Design Manager"
                onChange={(v) => updateExp(index, "role", v)}
                value={exp.role}
              />
              <Input
                label="Company / Employer"
                placeholder="e.g. Arowwai Industries"
                onChange={(v) => updateExp(index, "company", v)}
                value={exp.company}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Duration / Years"
                placeholder="e.g. 2020 – 2023"
                onChange={(v) => updateExp(index, "duration", v)}
                value={exp.duration}
              />
              <Input
                label="Location"
                placeholder="e.g. New York, NY"
                onChange={(v) => updateExp(index, "location", v)}
                value={exp.location}
              />
            </div>

            <TextArea
              label="Responsibilities & Impact (Bullet Points)"
              placeholder={"• Spearheaded end-to-end product design and market positioning.\n• Managed a team of 14 designers and marketers driving 42% revenue growth."}
              rows={4}
              onChange={(v) => updateExp(index, "description", v)}
              value={exp.description}
            />
          </EntryCard>
        ))}

        <button
          type="button"
          onClick={addExp}
          className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-dashed border-purple-300 hover:border-purple-600 rounded-2xl text-xs font-bold text-purple-700 bg-purple-50/50 hover:bg-purple-50 transition-all cursor-pointer shadow-sm"
        >
          <FiPlus size={15} /> Add Another Experience
        </button>
      </div>
    );
  }

  // Step 5: Projects & References
  if (step === 5) {
    const addPro = () => {
      setData({
        ...data,
        projects: [
          ...(data.projects || []),
          { title: "", name: "", tech: "", techStack: "", link: "", github: "", description: "" },
        ],
      });
    };

    const removePro = (index) => {
      setData({
        ...data,
        projects: (data.projects || []).filter((_, i) => i !== index),
      });
    };

    const updatePro = (index, field, value) => {
      const updated = (data.projects || []).map((pro, i) => {
        if (i !== index) return pro;
        const updatedObj = { ...pro, [field]: value };
        if (field === "title") updatedObj.name = value;
        if (field === "name") updatedObj.title = value;
        if (field === "tech") updatedObj.techStack = value;
        if (field === "techStack") updatedObj.tech = value;
        if (field === "link") updatedObj.github = value;
        if (field === "github") updatedObj.link = value;
        return updatedObj;
      });
      setData({ ...data, projects: updated });
    };

    return (
      <div className="flex flex-col gap-4">
        {(!data.projects || data.projects.length === 0) && (
          <div className="text-xs text-zinc-500 text-center py-8 border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50">
            No projects or references added yet. Click below to add.
          </div>
        )}

        {(data.projects || []).map((pro, index) => (
          <EntryCard
            key={index}
            onRemove={() => removePro(index)}
            title={`Project / Reference #${index + 1}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Project or Reference Title"
                placeholder="e.g. Global Omnichannel Brand Relaunch"
                onChange={(v) => updatePro(index, "title", v)}
                value={pro.title || pro.name || ""}
              />
              <Input
                label="Link or Contact Reference"
                placeholder="e.g. isabelmercado.me/brand-case-study"
                value={pro.link || pro.github || ""}
                onChange={(v) => updatePro(index, "link", v)}
              />
            </div>

            <Input
              label="Tech Stack or Reference Role"
              placeholder="e.g. Figma, Brand Guidelines, Market Research"
              value={pro.tech || pro.techStack || ""}
              onChange={(v) => updatePro(index, "tech", v)}
            />

            <TextArea
              label="Description & Details"
              placeholder={"• Comprehensive corporate brand restructuring including typography, color palette, and high-converting marketing collateral."}
              rows={3}
              value={pro.description}
              onChange={(v) => updatePro(index, "description", v)}
            />
          </EntryCard>
        ))}

        <button
          type="button"
          onClick={addPro}
          className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-dashed border-purple-300 hover:border-purple-600 rounded-2xl text-xs font-bold text-purple-700 bg-purple-50/50 hover:bg-purple-50 transition-all cursor-pointer shadow-sm"
        >
          <FiPlus size={15} /> Add Project or Reference
        </button>
      </div>
    );
  }

  // Step 6: Education
  if (step === 6) {
    const addEdu = () => {
      setData({
        ...data,
        education: [
          ...(data.education || []),
          { degree: "", institution: "", college: "", branch: "", score: "", cgpa: "", year: "" },
        ],
      });
    };

    const removeEdu = (index) => {
      setData({
        ...data,
        education: (data.education || []).filter((_, i) => i !== index),
      });
    };

    const updateEdu = (index, field, value) => {
      const updated = (data.education || []).map((edu, i) => {
        if (i !== index) return edu;
        const updatedObj = { ...edu, [field]: value };
        if (field === "institution") updatedObj.college = value;
        if (field === "college") updatedObj.institution = value;
        if (field === "score") updatedObj.cgpa = value;
        if (field === "cgpa") updatedObj.score = value;
        return updatedObj;
      });
      setData({ ...data, education: updated });
    };

    return (
      <div className="flex flex-col gap-4">
        {(!data.education || data.education.length === 0) && (
          <div className="text-xs text-zinc-500 text-center py-8 border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50">
            No education added yet. Click below to add degrees and certifications.
          </div>
        )}

        {(data.education || []).map((edu, index) => (
          <EntryCard
            key={index}
            onRemove={() => removeEdu(index)}
            title={`Education #${index + 1}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Degree / Course"
                placeholder="e.g. Bachelor of Business Management"
                value={edu.degree || ""}
                onChange={(v) => updateEdu(index, "degree", v)}
              />
              <Input
                label="University / Institution"
                placeholder="e.g. Wardiere University"
                value={edu.institution || edu.college || ""}
                onChange={(v) => updateEdu(index, "institution", v)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Years / Duration"
                placeholder="e.g. 2020 – 2023"
                value={edu.year || ""}
                onChange={(v) => updateEdu(index, "year", v)}
              />
              <Input
                label="Grade / Honor"
                placeholder="e.g. Dean's Honor List • GPA 3.9/4.0"
                value={edu.score || edu.cgpa || ""}
                onChange={(v) => updateEdu(index, "score", v)}
              />
            </div>
          </EntryCard>
        ))}

        <button
          type="button"
          onClick={addEdu}
          className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-dashed border-purple-300 hover:border-purple-600 rounded-2xl text-xs font-bold text-purple-700 bg-purple-50/50 hover:bg-purple-50 transition-all cursor-pointer shadow-sm"
        >
          <FiPlus size={15} /> Add Another Education
        </button>
      </div>
    );
  }

  return null;
}

export default ResumeForm;
