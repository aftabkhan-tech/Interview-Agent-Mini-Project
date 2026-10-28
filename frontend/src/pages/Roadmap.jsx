import React from 'react'
import { AnimatePresence, motion } from "motion/react"
import { FiCheck, FiChevronDown, FiClock, FiFileText, FiSend, FiX, FiZap } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BsRocketTakeoff } from "react-icons/bs";
import { useCoins } from '../apis/user.api'
import api from '../utils/axios'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import RoadmapResult from '../components/roadmap/RoadmapResult'
const PACKAGE_OPTIONS = ["10 LPA", "15 LPA", "20 LPA", "30 LPA", "40 LPA"];
function Roadmap({ user, setUser }) {
    const navigate = useNavigate()
    const [historyOpen, setHistoryOpen] = useState(false);
    const [roadmap, setRoadmap] = useState(null);
    const [role, setRole] = useState("");
    const [targetPackage, setTargetPackage] = useState(PACKAGE_OPTIONS[2]); // default "20 LPA"
    const [packageOpen, setPackageOpen] = useState(false);
    const [useResume, setUseResume] = useState(false);
    const [loading, setLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");

    const { resume } = useSelector((state) => state.resume)


    useEffect(() => {

        getAllRoadmaps()
    }, [])

    const getAllRoadmaps = async () => {
            setHistoryLoading(true)
            try {
                const response = await api.get("/api/roadmap/all")
                console.log(response.data)
                setHistory(response.data.data)
                setHistoryLoading(false)
            } catch (error) {
                console.log(error)
                setHistoryLoading(false)
            }
        }


    const getRoadmapById = async (id) => {
        try {
            const response = await api.get(`/api/roadmap/${id}`)
            console.log(response.data)
            setRoadmap(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }


    const handleGenerate = async () => {
        if (!role.trim() || loading) return;
        setLoading(true);
        setError("");
        try {
            try {
                const coinResponse = await useCoins({ coins: 20, action: "roadmap-builder" })
                setUser((prev) => ({
                    ...prev, interviewCoin: coinResponse?.interviewCoin,
                }))
            } catch (error) {
                setLoading(false)
                alert(error.message)
                return;
            }

            const response = await api.post("/api/roadmap/generate", {
                role: role.trim(),
                targetPackage,
                useResume,
                resume
            })
            setRoadmap(response.data.data)
getAllRoadmaps()
            setLoading(false)

        } catch (error) {
            console.error("Failed to generate roadmap:", error);
            setError("Something went wrong while generating your roadmap. Please try again.");
            setLoading(false)

        }
    }


    return (
        <div className='min-h-screen bg-[#F6F7FB] font-sans text-slate-900 flex flex-col'>
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className='sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl'>
                <div className='mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-8'>
                    <div onClick={() => navigate("/dashboard")}
                        className='group flex cursor-pointer items-center gap-3'>
                        <span className='grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-sm font-bold text-white transition group-hover:bg-indigo-700'>F</span>
                        <span className='text-left'><span className='block text-sm font-bold'>FresherAI</span><span className='block text-[11px] text-slate-500'>Roadmap Builder</span></span>
                    </div>

                    <button onClick={() => setHistoryOpen(!historyOpen)} className='flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'>
                        <FiClock />
                        <span className="hidden sm:inline">History</span>
                    </button>

                </div>

            </motion.nav>

            <main className='flex-1 overflow-y-auto pb-32 sm:pb-36'>
                <div className='mx-auto max-w-[1200px] px-4 pt-8 sm:px-8 sm:pt-12'>
                    <AnimatePresence mode='wait'>
                        {!roadmap ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.4 }}
                                className='flex min-h-[55vh] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm sm:px-10'>
                                <div className='mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-indigo-50 text-3xl text-indigo-600 sm:h-20 sm:w-20 sm:text-4xl'>
                                    <BsRocketTakeoff />

                                </div>

                                <h3 className='mb-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>AI Roadmap Generator</h3>

                                <p className='mb-1 max-w-xs text-sm text-slate-500 sm:max-w-md'>Generate a personalised roadmap for your dream job.</p>

                                <p className='max-w-xs text-xs text-slate-400 sm:max-w-md sm:text-sm'>
                                    Choose a role and let AI build a complete learning path.
                                </p>

                                {error && <p className="mt-4 text-xs text-red-500 max-w-xs sm:max-w-md">{error}</p>}

                                <div className='mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-sm'>
                                    {
                                        ["Frontend Dev", "Backend Eng", "ML Engineer"].map((r) => (
                                            <motion.button
                                                key={r}
                                                onClick={() => setRole(r)}
                                                whileHover={{ y: -2 }}
                                                whileTap={{ scale: 0.97 }}
                                                className='rounded-xl border border-slate-200 bg-slate-50 px-2 py-2.5 text-xs font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 sm:px-3'>
                                                <span>{r}</span>

                                            </motion.button>
                                        ))
                                    }
                                </div>

                            </motion.div>
                        ) : (
                            <RoadmapResult
                            roadmap={roadmap}
                            onClear={()=>setRoadmap(null)}
                            
                            />

                        )}


                    </AnimatePresence>
                </div>

            </main>

            <div className='fixed bottom-0 left-0 right-0 z-30 px-3 pb-3 pt-5 sm:px-4 sm:pb-5'>
                <div className='mx-auto max-w-[1200px]'>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className='relative flex items-center gap-1.5 overflow-visible rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_12px_40px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:gap-2 sm:p-2.5'>

                        <input
                            type='text'
                            placeholder='Backend Developer'
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                            className='relative min-w-0 flex-1 bg-transparent px-2 py-2 text-xs text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm' />

                        <div className='relative'>
                            <motion.button
                                type='button'
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setPackageOpen(!packageOpen)}
                                className='relative flex items-center gap-1 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-600 transition-all hover:border-indigo-200 hover:text-indigo-700'>
                                {targetPackage}
                                <FiChevronDown size={11} className={`transition-transform ${packageOpen ? "rotate-180" : ""}`} />


                            </motion.button>

                            <AnimatePresence>
                                {packageOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                        transition={{ duration: 0.15 }}
                                        className='absolute bottom-full right-0 z-10 mb-4 w-28 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg'>
                                        {
                                            PACKAGE_OPTIONS.map((pkg) => (
                                                <button key={pkg}
                                                    onClick={() => {
                                                        setTargetPackage(pkg);
                                                        setPackageOpen(false)
                                                    }}
                                                    className={`w-full text-left text-xs px-3 py-2 transition-colors ${pkg === targetPackage
                                                        ? "bg-indigo-50 text-indigo-700"
                                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                        }`}>
                                                    {pkg}

                                                </button>
                                            ))
                                        }

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type='button'
                            onClick={() => setUseResume(!useResume)}
                            className={`flex items-center text-xs gap-1 px-2 py-2 rounded-xl ${useResume
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}>
                            {useResume ? (
                                <>
                                    <FiCheck size={12} />
                                    Added
                                </>
                            ) : (
                                <>
                                    <FiFileText size={12} />
                                    Resume
                                </>
                            )}

                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={loading || !role.trim()}
                            onClick={handleGenerate}
                            className='relative flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4'>
                            {loading ? (
                                <>
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="inline-block"
                                    >
                                        <FiZap size={12} />
                                    </motion.span>
                                    <span className="hidden sm:inline">Generating…</span>
                                </>
                            ) : (
                                <>
                                    <FiSend size={12} />
                                    <span className="hidden sm:inline">Generate</span>
                                </>
                            )}

                        </motion.button>


                    </motion.div>

                </div>
            </div>

            <AnimatePresence>
                {
                    historyOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setHistoryOpen(false)}
                                className='fixed inset-0 z-40 bg-black/20 backdrop-blur-sm' />

                            <motion.aside
                                initial={{ x: 320 }}
                                animate={{ x: 0 }}
                                exit={{ x: 320 }}
                                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                                className='fixed bottom-0 right-0 top-0 z-50 flex w-[280px] max-w-[85vw] flex-col overflow-y-auto border-l border-slate-200 bg-white shadow-2xl sm:w-[340px]'>
                                <div className='sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-xl'>
                                    <span className='text-sm font-semibold text-slate-900'>Previous Roadmaps</span>
                                    <button onClick={() => setHistoryOpen(false)} aria-label="Close history" className='rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900'><FiX size={16} /></button>
                                </div>

                                <div className='flex flex-col gap-2 p-3'>
                                    {historyLoading ? (
                                        <p className="py-6 text-center text-xs text-slate-400">Loading…</p>
                                    )
                                        : history.length === 0 ?
                                            (
                                                <p className="py-6 text-center text-xs text-slate-400">No roadmaps yet.</p>
                                            ) :
                                            (
                                                history.map((h, i) => (
                                                    <button key={i} onClick={()=>{
                                                        getRoadmapById(h._id);
                                                        setHistoryOpen(false)
                                                    }} className='rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/40'>
                                                        <h3 className='font-semibold text-slate-900'>{h.title}</h3>
                                                        <div className='flex justify-between items-center my-1'>
                                                            <span className='text-xs font-medium text-indigo-600'>{h.targetPackage}</span>
                                                            <p className='text-xs text-slate-400'>{h.duration}</p>
                                                        </div>

                                                        <p className='mt-1 text-xs text-slate-400'>
                                                        {new Date(h.createdAt).toLocaleDateString()}</p>

                                                    </button>
                                                ))
                                            )}
                                </div>


                            </motion.aside>

                        </>
                    )
                }
            </AnimatePresence>




        </div>
    )
}

export default Roadmap
