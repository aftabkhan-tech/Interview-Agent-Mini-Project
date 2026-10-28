import React, { createContext, useContext, useId, useRef, useState } from 'react'
import { FiArrowLeft, FiMove, FiMaximize2 } from 'react-icons/fi'
import DownloadBtn from './DownloadBtn'

const splitList = (value) => (value || '').split(',').map((item) => item.trim()).filter(Boolean)
const splitLines = (value) => (value || '').split('\n').map((item) => item.trim()).filter(Boolean)
const TextStyleContext = createContext(null)
const FONT_FAMILIES = [
  ["Inter", "Inter, sans-serif"], ["Roboto", "Roboto, sans-serif"], ["Open Sans", "\"Open Sans\", sans-serif"], ["Lato", "Lato, sans-serif"],
  ["Montserrat", "Montserrat, sans-serif"], ["Poppins", "Poppins, sans-serif"], ["Nunito", "Nunito, sans-serif"], ["Raleway", "Raleway, sans-serif"],
  ["Source Sans 3", "\"Source Sans 3\", sans-serif"], ["Merriweather", "Merriweather, serif"], ["Playfair Display", "\"Playfair Display\", serif"],
  ["Lora", "Lora, serif"], ["Roboto Slab", "\"Roboto Slab\", serif"], ["Ubuntu", "Ubuntu, sans-serif"], ["Work Sans", "\"Work Sans\", sans-serif"],
  ["DM Sans", "\"DM Sans\", sans-serif"], ["Manrope", "Manrope, sans-serif"], ["Outfit", "Outfit, sans-serif"], ["Figtree", "Figtree, sans-serif"],
  ["Libre Baskerville", "\"Libre Baskerville\", serif"],
]
const FONT_PRESETS = FONT_FAMILIES.flatMap(([name, family]) => [
  { id: `${name}-regular`, label: `${name} - Regular`, family, weight: '400', style: 'normal' },
  { id: `${name}-medium`, label: `${name} - Medium`, family, weight: '500', style: 'normal' },
  { id: `${name}-semibold`, label: `${name} - SemiBold`, family, weight: '600', style: 'normal' },
  { id: `${name}-bold`, label: `${name} - Bold`, family, weight: '700', style: 'normal' },
  { id: `${name}-italic`, label: `${name} - Italic`, family, weight: '400', style: 'italic' },
])
const loadResumeFont = (name) => {
  const id = `resume-google-font-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(`${name}:ital,wght@0,400;0,500;0,600;0,700;1,400`)}&display=swap`
  document.head.appendChild(link)
}
const toColorHex = (value) => {
  if (/^#[0-9a-f]{6}$/i.test(value || '')) return value
  const rgb = value?.match(/\d+/g)?.slice(0, 3).map(Number)
  return rgb?.length === 3 ? `#${rgb.map((channel) => channel.toString(16).padStart(2, '0')).join('')}` : '#1f2937'
}

function EditableText({ value, onCommit, className = '', as = 'div', placeholder = 'Click to add text' }) {
  const id = useId()
  const context = useContext(TextStyleContext)
  const Tag = as
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onFocus={(event) => context?.selectText(id, event.currentTarget)}
      onBlur={(event) => onCommit(event.currentTarget.innerText.trim())}
      style={context?.styles[id] || undefined}
      className={`min-w-4 cursor-text rounded px-1 outline-none transition hover:bg-blue-100/60 focus:bg-blue-100/70 ${className}`}
      data-placeholder={placeholder}
    >
      {value || ''}
    </Tag>
  )
}

function CanvasBlock({ id, label, selected, position, onSelect, onPositionChange, onSizeChange, children, className = '' }) {
  const interaction = useRef(null)
  const startInteraction = (event, mode) => {
    event.preventDefault()
    event.stopPropagation()
    const blockElement = event.currentTarget.parentElement
    const bounds = blockElement.getBoundingClientRect()
    const paperBounds = blockElement.closest('[data-resume-paper]')?.getBoundingClientRect() || bounds
    interaction.current = {
      mode,
      pointerX: event.clientX,
      pointerY: event.clientY,
      x: position?.x || 0,
      y: position?.y || 0,
      baseWidth: position?.baseWidth || bounds.width,
      baseHeight: position?.baseHeight || bounds.height,
      width: position?.width || bounds.width,
      height: position?.height || bounds.height,
      maxWidth: paperBounds.width,
      maxHeight: paperBounds.height,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    onSelect(id, label)
  }
  const moveInteraction = (event) => {
    if (!interaction.current) return
    const deltaX = event.clientX - interaction.current.pointerX
    const deltaY = event.clientY - interaction.current.pointerY
    if (interaction.current.mode === 'move') {
      onPositionChange(id, { x: interaction.current.x + deltaX, y: interaction.current.y + deltaY })
    } else {
      onSizeChange(id, {
        baseWidth: interaction.current.baseWidth,
        baseHeight: interaction.current.baseHeight,
        width: Math.min(interaction.current.maxWidth, Math.max(48, interaction.current.width + deltaX)),
        height: Math.min(interaction.current.maxHeight, Math.max(32, interaction.current.height + deltaY)),
      })
    }
  }
  const endInteraction = (event) => {
    interaction.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <div
      onClick={(event) => { event.stopPropagation(); onSelect(id, label); }}
      className={`relative rounded-sm ${selected ? 'outline outline-2 outline-dashed outline-indigo-500 outline-offset-2 print:!outline-none' : 'hover:outline hover:outline-1 hover:outline-dashed hover:outline-indigo-300 hover:outline-offset-2'} ${className}`}
      style={{ boxSizing: 'border-box', transform: `translate(${position?.x || 0}px, ${position?.y || 0}px) scale(${position?.baseWidth ? position.width / position.baseWidth : 1}, ${position?.baseHeight ? position.height / position.baseHeight : 1})`, transformOrigin: 'top left', zIndex: position?.z || 0 }}
      title={`Select ${label}`}
    >
      {children}
      {selected && <>
        <button type="button" aria-label={`Move ${label}`} title="Drag to move" onPointerDown={(event) => startInteraction(event, 'move')} onPointerMove={moveInteraction} onPointerUp={endInteraction} onPointerCancel={endInteraction} className="absolute -right-3 -top-3 z-20 grid h-7 w-7 touch-none cursor-move place-items-center rounded-full border border-indigo-200 bg-white text-indigo-700 shadow-md print:hidden"><FiMove size={13} /></button>
        <button type="button" aria-label={`Resize ${label}`} title="Drag to resize" onPointerDown={(event) => startInteraction(event, 'resize')} onPointerMove={moveInteraction} onPointerUp={endInteraction} onPointerCancel={endInteraction} className="absolute -bottom-3 -right-3 z-20 grid h-7 w-7 touch-none cursor-nwse-resize place-items-center rounded-md border border-indigo-200 bg-white text-indigo-700 shadow-md print:hidden"><FiMaximize2 size={13} /></button>
      </>}
    </div>
  )
}

function ResumeCanvasEditor({ data, setData, template, onBack, user, setUser }) {
  const [selected, setSelected] = useState({ id: 'name', label: 'Name and title' })
  const [positions, setPositions] = useState({})
  const [textStyles, setTextStyles] = useState({})
  const [selectedText, setSelectedText] = useState(null)
  const [accentColor, setAccentColor] = useState(template?.color || '#2C3545')
  const photoInputRef = useRef(null)
  const paperRef = useRef(null)
  const skills = splitList(data.skills)
  const languages = splitList(data.languages)
  const awards = splitLines(data.awards)
  const experience = data.experience || []
  const education = data.education || []
  const projects = data.projects || []
  const isWideLayout = ["executive-banner", "editorial-minimal"].includes(template?.layout)

  const updateField = (field, value) => setData((current) => ({ ...current, [field]: value }))
  const updateEntry = (field, index, key, value) => setData((current) => ({
    ...current,
    [field]: current[field].map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item),
  }))
  const updateListItem = (field, items, index, value, separator = ', ') => {
    const next = [...items]
    next[index] = value
    updateField(field, next.join(separator))
  }
  const updatePosition = (id, next) => setPositions((current) => ({ ...current, [id]: { ...current[id], ...next } }))
  const updateSize = (id, next) => setPositions((current) => ({ ...current, [id]: { ...current[id], ...next } }))
  const selectText = (id, element) => {
    const computed = window.getComputedStyle(element)
    setSelectedText({ id, base: { fontSize: computed.fontSize, fontFamily: computed.fontFamily, color: computed.color, fontWeight: computed.fontWeight, fontStyle: computed.fontStyle, textDecoration: computed.textDecorationLine, textAlign: computed.textAlign } })
  }
  const activeTextStyle = selectedText ? { ...selectedText.base, ...textStyles[selectedText.id] } : null
  const selectedFontPreset = activeTextStyle && FONT_PRESETS.find((preset) => preset.family === activeTextStyle.fontFamily && preset.weight === String(activeTextStyle.fontWeight) && preset.style === activeTextStyle.fontStyle)
  const updateTextStyle = (property, value) => {
    if (!selectedText) return
    setTextStyles((current) => ({ ...current, [selectedText.id]: { ...current[selectedText.id], [property]: value } }))
  }
  const toggleTextStyle = (property, onValue, offValue, active) => updateTextStyle(property, active ? offValue : onValue)
  const applyFontPreset = (presetId) => {
    const preset = FONT_PRESETS.find((item) => item.id === presetId)
    if (!preset || !selectedText) return
    loadResumeFont(preset.label.split(' - ')[0])
    setTextStyles((current) => ({ ...current, [selectedText.id]: { ...current[selectedText.id], fontFamily: preset.family, fontWeight: preset.weight, fontStyle: preset.style } }))
  }
  const changePhoto = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => updateField('photo', reader.result)
    reader.readAsDataURL(file)
    event.target.value = ''
  }
  const block = (id, label, children, className = '') => (
    <CanvasBlock key={id} id={id} label={label} selected={selected.id === id} position={positions[id]} onSelect={(nextId, nextLabel) => setSelected({ id: nextId, label: nextLabel })} onPositionChange={updatePosition} onSizeChange={updateSize} className={className}>
      {children}
    </CanvasBlock>
  )

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" aria-label="Back to templates"><FiArrowLeft size={17} /></button>
            <div><p className="text-[10px] font-semibold uppercase tracking-wide text-indigo-600">Template editor</p><h1 className="max-w-[50vw] truncate text-sm font-bold sm:text-base">{template?.title || 'Custom resume'}</h1></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-slate-500 sm:inline">Edit text inline, then drag or resize a selected section</span>
            <label className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-600" title="Change template color"><input type="color" value={accentColor} onChange={(event) => setAccentColor(event.target.value)} className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0" />Color</label>
            <DownloadBtn docRef={paperRef} user={user} setUser={setUser} />
          </div>
        </div>
      </header>

      <div className="sticky top-16 z-20 border-b border-slate-200 bg-white/95 px-4 py-2 shadow-sm backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold text-slate-500">Text</span>
          <input aria-label="Font size" type="number" min="6" max="72" value={activeTextStyle ? Math.round(parseFloat(activeTextStyle.fontSize)) : ''} placeholder="Size" disabled={!selectedText} onChange={(event) => updateTextStyle('fontSize', `${Math.min(72, Math.max(6, Number(event.target.value) || 6))}px`)} className="h-9 w-[72px] rounded-lg border border-slate-200 px-2 text-sm disabled:bg-slate-100 disabled:text-slate-400" />
          <select aria-label="Font style" disabled={!selectedText} value={selectedFontPreset?.id || 'current'} onChange={(event) => applyFontPreset(event.target.value)} className="h-9 max-w-[190px] rounded-lg border border-slate-200 bg-white px-2 text-xs disabled:bg-slate-100 disabled:text-slate-400">
            <option value="current">{selectedText ? 'Current style' : '100 font styles'}</option>
            {FONT_PRESETS.map((preset) => <option key={preset.id} value={preset.id}>{preset.label}</option>)}
          </select>
          <label className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-2 text-xs text-slate-600" title="Text color">A<input aria-label="Text color" type="color" disabled={!selectedText} value={toColorHex(activeTextStyle?.color)} onChange={(event) => updateTextStyle('color', event.target.value)} className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed" /></label>
          <button type="button" disabled={!selectedText} onClick={() => toggleTextStyle('fontWeight', '700', '400', activeTextStyle?.fontWeight === 'bold' || Number(activeTextStyle?.fontWeight) >= 600)} className={`h-9 w-9 rounded-lg border text-sm font-bold disabled:opacity-40 ${activeTextStyle?.fontWeight === 'bold' || Number(activeTextStyle?.fontWeight) >= 600 ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-200'}`} aria-label="Toggle bold">B</button>
          <button type="button" disabled={!selectedText} onClick={() => toggleTextStyle('fontStyle', 'italic', 'normal', activeTextStyle?.fontStyle === 'italic')} className={`h-9 w-9 rounded-lg border text-sm italic disabled:opacity-40 ${activeTextStyle?.fontStyle === 'italic' ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-200'}`} aria-label="Toggle italic">I</button>
          <button type="button" disabled={!selectedText} onClick={() => toggleTextStyle('textDecoration', 'underline', 'none', activeTextStyle?.textDecoration?.includes('underline'))} className={`h-9 w-9 rounded-lg border text-sm underline disabled:opacity-40 ${activeTextStyle?.textDecoration?.includes('underline') ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-200'}`} aria-label="Toggle underline">U</button>
          <select aria-label="Text alignment" disabled={!selectedText} value={activeTextStyle?.textAlign || 'left'} onChange={(event) => updateTextStyle('textAlign', event.target.value)} className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs disabled:bg-slate-100 disabled:text-slate-400"><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option><option value="justify">Justify</option></select>
          {!selectedText && <span className="ml-1 text-xs text-slate-400">Click a text field on the resume to format it</span>}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] p-4 lg:p-6">
        <main className="min-w-0 overflow-auto rounded-2xl border border-slate-200 bg-[#E9EDF3] p-4 sm:p-8">
          <p className="mb-4 text-center text-xs text-slate-500">Click text to edit. Select a section, then drag the move handle or resize from its corner.</p>
          <input ref={photoInputRef} type="file" accept="image/*" onChange={changePhoto} className="hidden" />
          <TextStyleContext.Provider value={{ styles: textStyles, selectText }}>
          <div ref={paperRef} data-resume-paper className="mx-auto box-border grid min-h-[297mm] w-[210mm] grid-cols-[33%_67%] overflow-hidden bg-white shadow-xl print:shadow-none" style={{ gridTemplateColumns: isWideLayout ? '1fr' : '33% 67%', fontFamily: template?.layout === 'editorial-minimal' ? 'Georgia, serif' : 'Inter, system-ui, sans-serif' }}>
            <aside className="flex flex-col gap-6 p-7 text-white" style={{ backgroundColor: accentColor, display: isWideLayout ? "grid" : undefined, gridTemplateColumns: isWideLayout ? "repeat(2, minmax(0, 1fr))" : undefined }}>
              {block('photo', 'Profile photo', <button type="button" onClick={(event) => { event.stopPropagation(); setSelected({ id: 'photo', label: 'Profile photo' }); photoInputRef.current?.click(); }} className="mx-auto block h-28 w-28 overflow-hidden rounded-full border-4 border-white/30 bg-white/20" aria-label="Change profile photo">{data.photo ? <img src={data.photo} alt={data.name || 'Profile'} className="h-full w-full object-cover" /> : <span className="grid h-full w-full place-items-center text-3xl font-bold">{data.name?.charAt(0) || 'Y'}</span>}</button>, 'flex justify-center')}

              {block('contact', 'Contact details', <section className="space-y-2.5 text-[11px] text-white/90">
                <h2 className="mb-3 border-b border-white/30 pb-1.5 text-[13px] font-bold uppercase tracking-wide">Contact</h2>
                {[['phone', 'Phone'], ['email', 'Email'], ['location', 'Address'], ['linkedin', 'LinkedIn / Web']].map(([field, label]) => <div key={field}><p className="text-[10px] font-bold uppercase tracking-wide text-white">{label}</p><EditableText value={data[field]} onCommit={(value) => updateField(field, value)} className="mt-0.5 break-words" /></div>)}
              </section>)}

              {skills.length > 0 && block('skills', 'Skills', <section>
                <h2 className="mb-3 border-b border-white/30 pb-1.5 text-[13px] font-bold uppercase tracking-wide">Expertise</h2>
                <div className="space-y-1.5 text-[11px] text-white/90">{skills.map((skill, index) => <EditableText key={`${index}-${skill}`} value={skill} onCommit={(value) => updateListItem('skills', skills, index, value)} className="leading-snug" />)}</div>
              </section>)}

              {languages.length > 0 && block('languages', 'Languages', <section>
                <h2 className="mb-3 border-b border-white/30 pb-1.5 text-[13px] font-bold uppercase tracking-wide">Languages</h2>
                <div className="space-y-1.5 text-[11px] text-white/90">{languages.map((language, index) => <EditableText key={`${index}-${language}`} value={language} onCommit={(value) => updateListItem('languages', languages, index, value)} />)}</div>
              </section>)}

              {awards.length > 0 && block('awards', 'Awards', <section>
                <h2 className="mb-3 border-b border-white/30 pb-1.5 text-[13px] font-bold uppercase tracking-wide">Awards</h2>
                <div className="space-y-2 text-[10.5px] text-white/90">{awards.map((award, index) => <EditableText key={`${index}-${award}`} value={award} onCommit={(value) => updateListItem('awards', awards, index, value, '\n')} className="leading-relaxed" />)}</div>
              </section>)}
            </aside>

            <section className="flex flex-col gap-6 bg-white p-8 text-slate-900">
              {block('name', 'Name and title', <div className="mb-1 pb-3">
                <EditableText as="h1" value={data.name} onCommit={(value) => updateField('name', value)} className="text-[32px] font-extrabold leading-tight tracking-tight" placeholder="Your name" />
                <EditableText as="p" value={data.title} onCommit={(value) => updateField('title', value)} className="mt-1 text-[13px] font-medium uppercase tracking-widest text-slate-500" placeholder="Professional title" />
              </div>)}

              {block('summary', 'Professional summary', <section>
                <h2 className="mb-2 border-b border-slate-300 pb-1.5 text-[13px] font-bold uppercase tracking-wide" style={{ color: accentColor }}>Profile</h2>
                <EditableText as="p" value={data.summary} onCommit={(value) => updateField('summary', value)} className="text-[11.5px] leading-relaxed text-slate-600" placeholder="Add your professional summary" />
              </section>)}

              {experience.map((item, index) => block(`experience-${index}`, `Experience ${index + 1}`, <section key={`exp-${index}`}>
                {index === 0 && <h2 className="mb-4 border-b border-slate-300 pb-1.5 text-[13px] font-bold uppercase tracking-wide" style={{ color: accentColor }}>Experience</h2>}
                <div className="grid grid-cols-[30%_70%] items-start gap-3 text-[11px]">
                  <div><EditableText value={item.duration} onCommit={(value) => updateEntry('experience', index, 'duration', value)} className="font-bold text-slate-800" /><EditableText value={item.company} onCommit={(value) => updateEntry('experience', index, 'company', value)} className="mt-0.5 text-slate-500" /><EditableText value={item.location} onCommit={(value) => updateEntry('experience', index, 'location', value)} className="text-slate-400" /></div>
                  <div><EditableText as="h3" value={item.role} onCommit={(value) => updateEntry('experience', index, 'role', value)} className="text-xs font-bold text-slate-900" /><EditableText value={item.description} onCommit={(value) => updateEntry('experience', index, 'description', value)} className="mt-1 whitespace-pre-line leading-relaxed text-slate-600" /></div>
                </div>
              </section>))}

              {education.map((item, index) => block(`education-${index}`, `Education ${index + 1}`, <section key={`edu-${index}`}>
                {index === 0 && <h2 className="mb-4 border-b border-slate-300 pb-1.5 text-[13px] font-bold uppercase tracking-wide" style={{ color: accentColor }}>Education</h2>}
                <div className="grid grid-cols-[30%_70%] items-start gap-3 text-[11px]"><div><EditableText value={item.year} onCommit={(value) => updateEntry('education', index, 'year', value)} className="font-bold text-slate-800" /><EditableText value={item.institution || item.college} onCommit={(value) => updateEntry('education', index, 'institution', value)} className="mt-0.5 text-slate-500" /></div><div><EditableText as="h3" value={item.degree} onCommit={(value) => updateEntry('education', index, 'degree', value)} className="text-xs font-bold text-slate-900" /><EditableText value={item.score} onCommit={(value) => updateEntry('education', index, 'score', value)} className="mt-0.5 text-slate-500" /></div></div>
              </section>))}

              {projects.map((item, index) => block(`project-${index}`, `Project ${index + 1}`, <section key={`project-${index}`}>
                {index === 0 && <h2 className="mb-4 border-b border-slate-300 pb-1.5 text-[13px] font-bold uppercase tracking-wide" style={{ color: accentColor }}>Projects</h2>}
                <EditableText as="h3" value={item.title || item.name} onCommit={(value) => updateEntry('projects', index, 'title', value)} className="text-xs font-bold text-slate-900" />
                <EditableText value={item.link || item.github} onCommit={(value) => updateEntry('projects', index, 'link', value)} className="mt-0.5 truncate text-[10px] text-blue-700" />
                <EditableText value={item.tech || item.techStack} onCommit={(value) => updateEntry('projects', index, 'tech', value)} className="mt-1 text-[10px] font-medium text-slate-500" />
                <EditableText value={item.description} onCommit={(value) => updateEntry('projects', index, 'description', value)} className="mt-1 whitespace-pre-line text-[11px] leading-relaxed text-slate-600" />
              </section>))}
            </section>
          </div>
          </TextStyleContext.Provider>
        </main>
      </div>
    </div>
  )
}

export default ResumeCanvasEditor
