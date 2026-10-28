import React, { useEffect, useMemo, useState } from 'react'
import { FiArrowLeft, FiArrowUpRight, FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { PREBUILT_RESUMES, RESUME_CATEGORIES } from '../components/resume/prebuiltResumes'
import ResumeTemplateRenderer from '../components/resume/ResumeTemplateRenderer'
import ResumeCanvasEditor from '../components/resume/ResumeCanvasEditor'

function ResumeBuilder({ user, setUser }) {
  const [data, setData] = useState(PREBUILT_RESUMES[0].data)
  const [activeTemplate, setActiveTemplate] = useState(PREBUILT_RESUMES[0])
  const [showCanvasEditor, setShowCanvasEditor] = useState(false)
  const [templateCategory, setTemplateCategory] = useState('All Templates')
  const [templateSearch, setTemplateSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(24)
  const navigate = useNavigate()

  const visibleTemplates = useMemo(() => {
    const query = templateSearch.trim().toLowerCase()

    return PREBUILT_RESUMES.filter((template) => {
      const categoryMatches = templateCategory === 'All Templates' || template.category === templateCategory
      const searchMatches = !query || [template.title, template.category, template.tagline, template.data.name]
        .some((value) => value?.toLowerCase().includes(query))

      return categoryMatches && searchMatches
    })
  }, [templateCategory, templateSearch])

  useEffect(() => {
    setVisibleCount(24)
  }, [templateCategory, templateSearch])

  const templatesToShow = visibleTemplates.slice(0, visibleCount)
  const recentTemplates = [...PREBUILT_RESUMES.filter((template) => template.isNew)].reverse().slice(0, 8)
  const showRecentSection = templateCategory === 'All Templates' && !templateSearch.trim()

  const handleSelectTemplate = (template) => {
    setActiveTemplate(template)
    setData(JSON.parse(JSON.stringify(template.data)))
    setShowCanvasEditor(true)
  }

  if (showCanvasEditor) {
    return (
      <ResumeCanvasEditor
        data={data}
        setData={setData}
        template={activeTemplate}
        onBack={() => setShowCanvasEditor(false)}
        user={user}
        setUser={setUser}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F7FB] font-sans text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-8">
          <button onClick={() => navigate('/dashboard')} className="group flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-sm font-bold text-white transition group-hover:bg-indigo-700">F</span>
            <span className="text-left"><span className="block text-sm font-bold">FresherAI</span><span className="block text-[11px] text-slate-500">Resume Studio</span></span>
          </button>
          <button onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"><FiArrowLeft size={15} /> Dashboard</button>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-8 sm:py-12">
        <section aria-labelledby="template-heading">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">Find your look</p>
              <h2 id="template-heading" className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Resume templates</h2>
              <p className="mt-1 text-sm text-slate-500">{visibleTemplates.length} designs · click a design to customize</p>
            </div>
            <label className="flex w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100 xl:max-w-sm">
              <FiSearch className="shrink-0 text-slate-400" size={16} />
              <input value={templateSearch} onChange={(event) => setTemplateSearch(event.target.value)} placeholder="Search designs, roles, or styles" aria-label="Search resume templates" className="w-full bg-transparent text-slate-800 outline-none placeholder:text-slate-400" />
            </label>
          </div>

          {showRecentSection && <section aria-labelledby="recent-designs-heading" className="mb-9">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-700">JUST ADDED</p>
                <h3 id="recent-designs-heading" className="mt-1 text-xl font-bold tracking-tight text-slate-900">Recent designs</h3>
                <p className="mt-1 text-xs text-slate-500">The latest resume styles, ready to customize.</p>
              </div>
              <button type="button" onClick={() => setVisibleCount(PREBUILT_RESUMES.length)} className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-50">Browse all templates <span aria-hidden="true">&gt;</span></button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {recentTemplates.map((template) => <button key={`recent-${template.id}`} type="button" onClick={() => handleSelectTemplate(template)} aria-label={`Customize ${template.title}`} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-100">
                <span className="relative block aspect-[210/297] overflow-hidden bg-slate-100">
                  <span className="absolute left-0 top-0 origin-top-left scale-[0.25] transition duration-500 group-hover:scale-[0.258]"><span className="block h-[1122px] w-[794px]"><ResumeTemplateRenderer data={template.data} layout={template.layout} accentColor={template.color} /></span></span>
                </span>
                <span className="block truncate px-2.5 py-2.5 text-[11px] font-semibold text-slate-800 group-hover:text-indigo-700">{template.title}</span>
              </button>)}
            </div>
          </section>}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
            {RESUME_CATEGORIES.map((category) => <button key={category} onClick={() => setTemplateCategory(category)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${templateCategory === category ? 'bg-indigo-100 text-indigo-800' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}>{category}</button>)}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {templatesToShow.map((template, index) => <button key={template.id} type="button" onClick={() => handleSelectTemplate(template)} className="group relative isolate overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-sm transition duration-300 ease-out hover:-translate-y-1.5 hover:border-indigo-300 hover:shadow-[0_20px_45px_-18px_rgba(79,70,229,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 motion-reduce:transform-none motion-reduce:transition-none" style={{ animationDelay: `${Math.min(index * 35, 350)}ms` }}>
              <span className="relative block aspect-[210/297] overflow-hidden bg-slate-100">
                <span className="absolute left-0 top-0 origin-top-left scale-[0.25] transition duration-500 ease-out group-hover:scale-[0.258] motion-reduce:transform-none"><span className="block h-[1122px] w-[794px]"><ResumeTemplateRenderer data={template.data} layout={template.layout} accentColor={template.color} /></span></span>
                <span className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <span className="absolute inset-x-2 bottom-2 flex translate-y-2 items-center justify-center gap-2 rounded-xl bg-white/95 px-3 py-2.5 text-xs font-bold text-slate-900 opacity-0 shadow-xl backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"><FiArrowUpRight size={14} /> Customize this design</span>
              </span>
              <span className="block p-3.5">
                <span className="block truncate text-xs font-bold text-slate-900 transition group-hover:text-indigo-700 sm:text-sm">{template.title}</span>
                <span className="mt-1.5 flex items-center justify-between gap-2"><span className="truncate text-[10px] text-slate-500 sm:text-[11px]">{template.category} · {template.experienceLevel}</span><span className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white" style={{ backgroundColor: template.color }} title="Template accent color" /></span>
                <span className="mt-2 block truncate text-[10px] text-slate-400">{template.tagline}</span>
              </span>
            </button>)}
          </div>

          {visibleCount < visibleTemplates.length && (
            <div className="mt-8 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => Math.min(count + 24, visibleTemplates.length))}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-700 hover:shadow-md"
              >
                Show more templates
              </button>
              <p className="text-xs text-slate-500">Showing {templatesToShow.length} of {visibleTemplates.length} designs</p>
            </div>
          )}

          {visibleTemplates.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><p className="text-sm font-semibold text-slate-700">No designs found</p><p className="mt-1 text-xs text-slate-500">Try a different search or category.</p></div>}
        </section>

      </main>
    </div>
  )
}

export default ResumeBuilder
