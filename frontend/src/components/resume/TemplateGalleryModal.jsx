import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FiCheck, FiEye, FiSearch, FiStar, FiX, FiLayers } from 'react-icons/fi'
import { PREBUILT_RESUMES, RESUME_CATEGORIES } from './prebuiltResumes'
import ResumeTemplateRenderer from './ResumeTemplateRenderer'

function TemplateGalleryModal({ isOpen, onClose, onSelectTemplate, currentTemplateId }) {
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewingTemplate, setPreviewingTemplate] = useState(null);

  if (!isOpen) return null;

  const filteredTemplates = PREBUILT_RESUMES.filter((item) => {
    const matchesCategory =
      selectedCategory === "All Templates" || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.tagline.toLowerCase().includes(q) ||
      item.data.name.toLowerCase().includes(q) ||
      item.data.skills.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/45 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-7xl max-h-[94vh] flex flex-col bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-900"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
              <FiLayers className="text-white" size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Choose a resume template
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium">
                  {PREBUILT_RESUMES.length} Prebuilt Templates
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Select a design to open it in the live editor
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search by role, skills (e.g. React, Python, Fresher)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-colors"
            />
          </div>

          {/* Categories Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {RESUME_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-sm font-semibold"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Templates */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 bg-[#F7F8FA]">
          {filteredTemplates.map((item) => {
            const isCurrent = currentTemplateId === item.id;
            const topSkills = item.data.skills
              .split(",")
              .slice(0, 3)
              .map((s) => s.trim());

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => { onSelectTemplate(item); onClose(); }}
                className={`group relative flex cursor-pointer flex-col rounded-xl border overflow-hidden transition-all ${
                  isCurrent
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100 shadow-sm"
                    : "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg"
                }`}
              >
                {/* Full resume preview thumbnail */}
                <div className="relative aspect-[210/297] overflow-hidden bg-slate-100">
                  <div className="absolute left-0 top-0 origin-top-left scale-[0.25]">
                    <div className="h-[1122px] w-[794px]">
                      <ResumeTemplateRenderer data={item.data} layout={item.layout} accentColor={item.color} />
                    </div>
                  </div>
                  <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[9px] font-semibold text-slate-700 shadow-sm">{item.category}</span>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">Click to customize this design</span>
                </div>

                {/* Card Body */}
                <div className="p-3.5 flex-1 flex flex-col justify-between gap-3 bg-white">
                  <div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {item.data.summary}
                    </p>

                    {/* Skill chips */}
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {topSkills.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                      {item.data.skills.split(",").length > 3 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{item.data.skills.split(",").length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={(event) => { event.stopPropagation(); setPreviewingTemplate(item); }}
                      className="flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors"
                      title="Quick Preview"
                    >
                      <FiEye size={13} />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelectTemplate(item);
                        onClose();
                      }}
                      className={`flex-[1.5] py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        isCurrent
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-200 cursor-default"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <FiCheck size={13} /> Active
                        </>
                      ) : (
                        <>
                          <FiStar size={13} /> Use Template
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {filteredTemplates.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-500 space-y-2">
              <FiSearch size={32} className="mx-auto text-slate-400" />
              <p className="text-sm">No templates matched "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Templates");
                }}
                className="text-xs text-indigo-600 hover:underline"
              >
                Clear filters &amp; view all
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Full Preview Modal for a single template */}
      <AnimatePresence>
        {previewingTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-white">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {previewingTemplate.title} — {previewingTemplate.data.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Category: {previewingTemplate.category} • Layout: {previewingTemplate.layout}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      onSelectTemplate(previewingTemplate);
                      setPreviewingTemplate(null);
                      onClose();
                    }}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <FiStar size={14} /> Use This Template
                  </button>
                  <button
                    onClick={() => setPreviewingTemplate(null)}
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>

              {/* Document view */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 flex justify-center">
                <div className="scale-[0.8] sm:scale-[0.85] md:scale-[0.9] origin-top shadow-2xl rounded-md overflow-hidden">
                  <ResumeTemplateRenderer
                    data={previewingTemplate.data}
                    layout={previewingTemplate.layout}
                    accentColor={previewingTemplate.color}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TemplateGalleryModal;
