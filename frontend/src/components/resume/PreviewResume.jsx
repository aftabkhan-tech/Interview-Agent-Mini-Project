import React, { useEffect, useRef, useState } from 'react'
import { FiArrowLeft, FiCheck, FiLayout, FiMaximize2, FiMinimize2, FiZoomIn, FiZoomOut } from 'react-icons/fi'
import DownloadBtn from './DownloadBtn'
import ResumeTemplateRenderer from './ResumeTemplateRenderer'

const ACCENT_COLORS = [
  { name: "Royal Blue", hex: "#2563EB" },
  { name: "Emerald Green", hex: "#059669" },
  { name: "Purple / Indigo", hex: "#7C3AED" },
  { name: "Warm Amber", hex: "#D97706" },
  { name: "Crimson Red", hex: "#DC2626" },
  { name: "Executive Slate", hex: "#0F172A" },
];

const LAYOUT_OPTIONS = [
  { id: "canva-slate", label: "Canva Classic" },
  { id: "modern-tech", label: "Modern Tech" },
  { id: "ats-classic", label: "ATS Classic" },
  { id: "creative-split", label: "Creative Sidebar" },
  { id: "executive-banner", label: "Executive Banner" },
  { id: "editorial-minimal", label: "Editorial Minimal" },
];

function PreviewResume({ data, onBack, user, setUser, initialLayout = "modern-tech", initialColor = "#2563EB" }) {
  const resumeRef = useRef(null);
  const [scale, setScale] = useState(0.85);
  const [layout, setLayout] = useState(initialLayout);
  const [accentColor, setAccentColor] = useState(initialColor);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 640) {
        setScale(0.42);
      } else if (window.innerWidth < 768) {
        setScale(0.58);
      } else if (window.innerWidth < 1024) {
        setScale(0.72);
      } else {
        setScale(0.85);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900 flex flex-col">
      {/* Header Toolbar */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 text-xs text-slate-600 transition hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50"
            >
              <FiArrowLeft size={15} />
              <span>Back to Editor</span>
            </button>
            <div>
              <h2 className="text-sm font-bold text-slate-900 sm:text-base">Resume Preview &amp; Export</h2>
              <p className="text-[10px] text-slate-500">Choose a layout, adjust the accent color, then export your resume.</p>
            </div>
          </div>

          {/* Action & download */}
          <div className="flex items-center gap-3">
            {/* Zoom Controls */}
            <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-xl bg-white border border-slate-200 text-xs text-slate-600">
              <button
                onClick={() => setScale((s) => Math.max(0.35, s - 0.08))}
                className="p-1 hover:text-slate-900"
                title="Zoom Out"
              >
                <FiZoomOut size={13} />
              </button>
              <span className="w-12 text-center text-[11px] font-mono">{Math.round(scale * 100)}%</span>
              <button
                onClick={() => setScale((s) => Math.min(1.2, s + 0.08))}
                className="p-1 hover:text-slate-900"
                title="Zoom In"
              >
                <FiZoomIn size={13} />
              </button>
            </div>

            <DownloadBtn docRef={resumeRef} user={user} setUser={setUser} />
          </div>
        </div>

        {/* Layout & Color Customizer Bar */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Layout switcher */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 flex items-center gap-1 text-[11px]">
              <FiLayout size={12} /> Layout:
            </span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
              {LAYOUT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setLayout(opt.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                    layout === opt.id
                      ? "bg-indigo-600 text-white shadow-sm font-semibold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color palette */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[11px]">Accent Color:</span>
            <div className="flex items-center gap-1.5">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setAccentColor(c.hex)}
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    accentColor === c.hex ? "scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-300" : "opacity-75 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {accentColor === c.hex && <FiCheck size={10} className="text-white drop-shadow" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Document Canvas */}
      <div className="flex-1 overflow-auto bg-slate-100 px-3 py-6 sm:px-6 sm:py-10 flex justify-center items-start">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
          className="transition-transform duration-150"
        >
          <div
            ref={resumeRef}
            className="rounded-md bg-white shadow-xl border border-slate-200 overflow-hidden"
          >
            <ResumeTemplateRenderer
              data={data}
              layout={layout}
              accentColor={accentColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewResume;
