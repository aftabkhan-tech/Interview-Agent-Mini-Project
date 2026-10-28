import React from 'react'
import { motion } from "motion/react";
import { FiCheckCircle, FiClock, FiMap, FiTarget, FiX } from 'react-icons/fi';
import ModuleCard from './ModuleCard';
function RoadmapResult({roadmap, onClear}) {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}>

        <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
         className='relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 mb-7'>

            <div className='relative flex items-start justify-between mb-4'>

                <div>
                    <p className='text-xs font-bold text-indigo-600 tracking-[0.16em] uppercase mb-1'>Your Roadmap</p>
                    <h2 className='text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>{roadmap.title}</h2>
                    <p className='text-sm text-slate-500 mt-1'>
                    Target: <span className="text-indigo-700 font-semibold">{roadmap.targetPackage}</span>
                    </p>
                </div>
                <button onClick={onClear} aria-label="Close roadmap" className='rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors mt-0.5'>
                <FiX size={16}/></button>
            </div>

            <div className='relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
                {[
            { icon: FiTarget,      label: "Difficulty", value: roadmap.level },
            { icon: FiClock,       label: "Duration",   value: roadmap.duration },
            { icon: FiCheckCircle, label: "Modules",    value: `${roadmap.modules.length} topics` },
          ].map(({icon:Icon , label , value})=>(
            <div key={label} className='rounded-2xl p-4 bg-slate-50 border border-slate-100'>
                <div className='flex items-center gap-1.5 mb-1'>
                    <Icon size={12} className="text-indigo-500"/>
                    <span className='text-xs font-medium text-slate-500'>{label}</span>
                    </div>
                    <p className='text-sm font-semibold text-slate-900'>{value}</p>

            </div>
          ))}
            </div>

        </motion.div>

        <div className='mb-4'>
            <p className='text-xs text-slate-500 font-bold uppercase tracking-[0.16em] mb-3 flex items-center gap-2'>
            <FiMap size={12}/> Learning Modules </p>
            <div className='flex flex-col gap-2'>
                {
                    roadmap.modules.map((m,i)=>(
                        <ModuleCard key={m.title} mod={m} index={i}/>
                    ))
                }
            </div>
        </div>
      
    </motion.div>
  )
}

export default RoadmapResult
