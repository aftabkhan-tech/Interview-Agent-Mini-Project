import React from 'react'
import { useState } from 'react';
import { AnimatePresence, motion } from "motion/react";
import { FiBookOpen, FiChevronDown, FiChevronUp, FiClock, FiYoutube } from 'react-icons/fi';

const difficultyColor = { Easy: "#059669", Medium: "#7c3aed", Hard: "#dc2626" };
function ModuleCard({ mod, index }) {
    const [open, setOpen] = useState(false);
    const tutorialUrl = mod.youtube?.startsWith("http")
        ? mod.youtube
        : `https://www.youtube.com/results?search_query=${encodeURIComponent(`${mod.title} tutorial`)}`;
  return (
    <motion.div 
     initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={{ y: -2 }}
      onClick={()=>setOpen(!open)}
    className='relative overflow-hidden rounded-2xl border border-slate-200 bg-white cursor-pointer select-none shadow-sm hover:border-indigo-200 hover:shadow-md transition-all'>

        <div className='relative flex items-center gap-3 p-4'>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold bg-indigo-50 border border-indigo-100"
          style={{ color: difficultyColor[mod.difficulty] }}>{index + 1}</div>

            <div className='flex-1 min-w-0'>
                <p className='text-sm font-semibold text-slate-900 truncate'>{mod.title}</p>
                <div className='flex items-center gap-1.5 mt-0.5'>
                    <FiClock size={11} className="text-slate-400"/>
                    <span className='text-xs text-slate-500'>{mod.duration}</span>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <span className="text-xs font-medium hidden sm:block" style={{ color: difficultyColor[mod.difficulty] }}>
            {mod.difficulty}
          </span>
          {open
            ? <FiChevronUp size={14} className="text-slate-400" />
            : <FiChevronDown size={14} className="text-slate-400" />
          }
            </div>
        </div>


        <AnimatePresence>
            {open && (
                <motion.div
                initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
                 className='overflow-hidden'>
                    <div className='relative px-4 pb-4 pt-0 border-t border-slate-100'>
                    
                    <p className='text-sm text-slate-600 mt-3 mb-3 leading-relaxed'>{mod.description}</p>
                    <div className='flex gap-2 flex-wrap'>

                        <a href={tutorialUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <motion.button 
                            whileHover={{ scale: 1.03 }} 
                            whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors">
                        <FiYoutube size={12}/> Watch Tutorial

                            </motion.button>

                        </a>

                        <a href={mod.article} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <motion.button 
                            whileHover={{ scale: 1.03 }} 
                            whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-colors">
                        <FiBookOpen size={12}/> Read Article

                            </motion.button>

                        </a>
                    </div>
                    
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
      
    </motion.div>
  )
}

export default ModuleCard
