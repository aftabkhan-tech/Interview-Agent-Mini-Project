import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { useState } from 'react'
import { FiAlertCircle, FiArrowLeft, FiCheckCircle, FiFileText, FiTrendingUp, FiUploadCloud, FiUser, FiZap } from 'react-icons/fi'
import api from '../utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setResume } from '../redux/resumeSlice'
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"
import { useCoins } from '../apis/user.api'
const ScoreRing = ({ score }) => {
    const value = Math.min(100, Math.max(0, Number(score) || 0));
    const color = value >= 75 ? "#4f46e5" : value >= 50 ? "#f59e0b" : "#ef4444";
    return (
        <div className='relative flex items-center justify-center'>
            <RadialBarChart
                width={110}
                height={110}
                cx={55}
                cy={55}
                innerRadius={40}
                outerRadius={53}
                startAngle={90}
                endAngle={-270}
                data={[{ value, fill: color }]}
                barSize={8}
            >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: "#e5e7eb" }} dataKey="value" cornerRadius={8} />

            </RadialBarChart>

            <div className='absolute flex items-center'>
                <span className='text-lg font-bold leading-none text-slate-900'>{value}</span>
                <span className='mt-0.5 text-[9px] text-slate-500'>/100</span>
            </div>

        </div>
    )
}

const Tag = ({ text, color }) => {
    const styles = {
        purple: "bg-purple-50 text-purple-700 border-purple-200",
        red: "bg-red-50    text-red-700    border-red-200",
        green: "bg-green-50  text-green-700  border-green-200",
        yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    };
    return (
        <div className={`text-[10px] px-1.5 py-1 rounded-md border font-medium ${styles[color]}`}>
            {text}

        </div>
    )
}

const Navbar = ({ label }) => {
    const navigate = useNavigate()
    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='sticky inset-x-0 top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl'>
            <div className='mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-8'>
                <div onClick={() => navigate("/dashboard")}
                    className='group flex cursor-pointer items-center gap-3'>
                    <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white transition group-hover:bg-indigo-700'>F</span>
                    <span className='text-left'><span className='block text-sm font-bold text-slate-900'>FresherAI</span><span className='block text-[11px] text-slate-500'>{label}</span></span>
                </div>
                <button onClick={() => navigate('/dashboard')} className='inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'><FiArrowLeft size={15} /> Dashboard</button>

            </div>

        </motion.nav>

    )
}

function Scorer({ user, setUser }) {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { resume } = useSelector((state) => state.resume)
    const resumeName = /^[-\s\d|/]*\d+\s+of\s+\d+[-\s\d|/]*$/i.test(resume?.name || '')
        ? 'Resume analysis'
        : resume?.name?.trim() || 'Resume analysis'

    const uploadResume = async () => {
        if (!file) {
            alert("Please select a PDF")
            return
        }
        try {
            setLoading(true)

            try {
                const coinResponse = await useCoins({ coins: 10, action: "resume-scorer" })
                setUser((prev) => ({
                    ...prev, interviewCoin: coinResponse?.interviewCoin,
                }))
            } catch (error) {
                setLoading(false)
                alert(error.message)
                return;
            }

            const formData = new FormData()
            formData.append("resume", file)

            const response = await api.post("/api/resume/upload", formData)

            dispatch(setResume(response?.data?.data))
            setLoading(false)



        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || error.message || "Upload failed")
            setLoading(false)
        }
    }
    // scorer section

    if (resume) return (
        <div className='min-h-screen bg-[#F6F7FB] text-slate-900'>
            <Navbar label="Resume Scorer" />

            <section className='mx-auto max-w-6xl space-y-5 px-4 py-8 sm:px-8 sm:py-10'>
                {/* header */}
                <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <p className='text-xs font-bold uppercase tracking-[0.16em] text-indigo-600'>Resume analysis</p>
                        <h2 className='mt-1 text-2xl font-bold tracking-tight sm:text-3xl'>{resumeName}</h2>
                        <p className='mt-1 text-sm text-slate-500'>A clear breakdown of your resume and next steps.</p>

                    </div>
                    <button onClick={() => { dispatch(setResume(null)); setFile(null) }}
                        className='rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700'>Analyze another resume</button>
                </div>

                {/* Score */}

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className='relative flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-white via-white to-indigo-50/70 p-5 shadow-sm sm:flex-row sm:gap-7 sm:p-6'>

                    <div className='relative shrink-0'>
                        <ScoreRing score={resume?.score} />

                    </div>
                    <div className='relative'>
                        <p className='mb-0.5 text-xs font-medium text-slate-500'>Resume score</p>
                        <p className='mb-2 text-xl font-bold text-slate-900 sm:text-2xl'>
                            {resume.score >= 75 ? "Strong" : resume.score >= 50 ? "Average" : "Needs Work"}
                        </p>
                        <div className='flex flex-wrap items-center gap-2'>
                            <span className='inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700'><FiUser size={13} />{resume?.suggestedRole || 'Role not detected'}</span>
                            <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${resume.score >= 75 ? 'bg-emerald-50 text-emerald-700' : resume.score >= 50 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>{resume.score >= 75 ? 'Ready to apply' : 'Room to improve'}</span>
                        </div>

                    </div>
                    <div className='flex w-full flex-wrap gap-2 border-t border-slate-200 pt-4 sm:ml-auto sm:max-w-md sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0'>
                        {[
                            { label: 'Strengths', count: resume?.strengths?.length || 0, tone: 'text-emerald-700' },
                            { label: 'To improve', count: (resume?.weaknesses?.length || 0) + (resume?.missingSkills?.length || 0), tone: 'text-amber-700' },
                            { label: 'Next steps', count: resume?.recommendations?.length || 0, tone: 'text-indigo-700' },
                        ].map((item) => <div key={item.label} className='min-w-20 flex-1 rounded-xl bg-white/80 px-2 py-3 text-center sm:px-3'>
                            <p className={`text-xl font-bold ${item.tone}`}>{item.count}</p>
                            <p className='mt-1 text-[10px] font-medium text-slate-500 sm:text-xs'>{item.label}</p>
                        </div>)}
                    </div>

                </motion.div >

                {/* Weaknesses & Strengths */}
                <div className='space-y-3'>


                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.07 }}
                        className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                        <div className='mb-2.5 flex items-center gap-1.5'>
                            <FiAlertCircle className='text-green-400' size={14} />
                            <span className='text-sm font-semibold text-slate-900'>Strengths</span>
                        </div>



                        <div className='flex flex-wrap gap-1.5'>

                            {resume?.strengths?.length ? resume.strengths.map(s => <Tag key={s} text={s} color="green" />) : <p className='text-xs leading-5 text-slate-500'>No strengths were detected yet. Add clear achievements and measurable results to your resume.</p>}

                        </div>

                    </motion.div>


                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.07 }}
                        className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                        <div className='mb-2.5 flex items-center gap-1.5'>
                            <FiAlertCircle className='text-yellow-400' size={14} />
                            <span className='text-sm font-semibold text-slate-900'>Weaknesses</span>
                        </div>

                        <div className='flex flex-wrap gap-1.5'>

                            {resume?.weaknesses?.length ? resume.weaknesses.map(s => <Tag key={s} text={s} color="yellow" />) : <p className='text-xs leading-5 text-slate-500'>No major weaknesses were identified.</p>}

                        </div>

                    </motion.div>

                </div>

                <div className='space-y-3'>
                {/* Missing Skills */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.09 }}
                    className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                    <div className='mb-2.5 flex items-center gap-1.5'>
                        <FiZap className='text-red-400' size={14} />
                        <span className='text-sm font-semibold text-slate-900'>Missing skills</span>
                    </div>

                    <div className='flex flex-wrap gap-1.5'>

                        {resume?.missingSkills?.length ? resume.missingSkills.map(s => <Tag key={s} text={s} color="red" />) : <p className='text-xs leading-5 text-slate-500'>No missing skills were identified for the suggested role.</p>}

                    </div>

                </motion.div>
                {/* Recommendations */}

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.12 }}
                    className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                    <div className='mb-2.5 flex items-center gap-1.5'>
                        <FiTrendingUp className='text-purple-400' size={14} />
                        <span className='text-sm font-semibold text-slate-900'>Recommendations</span>
                    </div>

                    <div className='flex flex-wrap gap-1.5'>

                        {resume?.recommendations?.length ? resume.recommendations.map(s => <Tag key={s} text={s} color="purple" />) : <p className='text-xs leading-5 text-slate-500'>Your resume is in good shape. Keep your experience and contact details current.</p>}

                    </div>

                </motion.div>

                </div>

            </section>

        </div>
    )
    //upload section
    return (
        <div className='min-h-screen bg-[#F6F7FB] text-slate-900'>
            <Navbar label="Resume Scorer" />


            <section className='mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center gap-8 px-4 py-12 sm:px-8'>
                <div className='mx-auto max-w-3xl text-center'>
                    <span className='inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm'><FiZap size={13} /> Resume tools</span>
                    <h1 className='mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl'>Make your resume <span className='text-indigo-600'>stand out.</span></h1>
                    <p className='mt-4 max-w-lg text-sm leading-6 text-slate-600 sm:text-base'>Get a clear score, spot missing skills, and follow practical recommendations to strengthen your next application.</p>
                    <div className='mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3'>
                        {['See what your resume already does well', 'Find gaps for your suggested role', 'Get clear next steps to improve'].map((item) => <div key={item} className='flex items-center gap-2 text-xs text-slate-700 sm:text-sm'><FiCheckCircle className='shrink-0 text-emerald-500' size={17} />{item}</div>)}
                    </div>
                    <div className='mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-xs text-slate-500'><FiFileText size={15} className='text-indigo-500' /> PDF format <span className='text-slate-300'>|</span> Up to 20 MB</div>
                </div>

                <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className='mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.22)] sm:p-8'>

                    <p className='text-xs font-bold uppercase tracking-[0.16em] text-indigo-600'>Resume scorer</p>

                    <h2 className='text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>
                        Upload Your Resume
                    </h2>
                    <p className='mb-6 mt-2 text-sm text-slate-500'>
                        Upload a PDF to get your score and personalized feedback.
                    </p>


                    <label className={`flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors sm:h-56
              ${file
                            ? "border-indigo-300 bg-indigo-50/70"
                            : "border-slate-300 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50"
                        }`}>
                        <FiUploadCloud className={`mb-3 text-4xl sm:text-5xl ${file ? "text-indigo-600" : "text-slate-400"}`} />
                        <p className="max-w-[90%] truncate text-sm font-semibold text-slate-800">
                            {file ? file.name : "Click or drag PDF here"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">PDF only · Max 20MB</p>

                        <input type='file'
                            accept='.pdf'
                            className='hidden'
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>

                    <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={uploadResume}
                        disabled={!file || loading} className='mt-5 h-12 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40'>
                        {loading ? "Analyzing..." : "Analyze Resume"}

                    </motion.button>



                </motion.div>
            </section>




        </div>
    )
}

export default Scorer
