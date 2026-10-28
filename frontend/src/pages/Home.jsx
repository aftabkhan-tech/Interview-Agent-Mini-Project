import React, { useState } from 'react'
import { motion } from "motion/react"
import { GiArtificialHive } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa6";
import LoginModel from '../components/LoginModel';
import dashboard from "../assets/image.png"
import { useNavigate } from 'react-router-dom';
import { FiMic, FiFileText, FiBarChart2, FiMap, FiStar, FiCheckCircle, FiLayers, FiShield, FiTrendingUp } from "react-icons/fi";

function Home({ setUser }) {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-sans min-h-screen overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Dynamic Background Glows (Canva Soft Light Pastels) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-tr from-purple-200/40 via-indigo-100/40 to-blue-200/30 blur-[130px] rounded-full" />
        <div className="absolute top-1/2 -left-48 w-[450px] h-[450px] bg-emerald-100/40 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 -right-40 w-[500px] h-[500px] bg-purple-100/40 blur-[150px] rounded-full" />
      </div>

      {/* Modern Sticky Canva-Style Glass Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-5 sm:px-10 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-xs"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-500/25">
            <GiArtificialHive size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-none">
              FresherAI
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Career &amp; Canva Resume Studio</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLogin(true)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors hidden sm:block cursor-pointer"
          >
            Sign In
          </button>

          <motion.button
            onClick={() => setShowLogin(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl px-4 py-2 text-xs cursor-pointer transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
          >
            <span>Get Started Free</span>
            <FaArrowRight size={11} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-28 pb-16 px-5 sm:px-8 text-center max-w-5xl mx-auto">
        {/* Floating Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-200 bg-white/80 text-purple-700 text-xs font-semibold mb-6 shadow-xs backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>✨ 30+ Canva-Style Interactive Resumes &amp; Indian English Voice AI</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.14] tracking-tight mb-6 text-slate-900"
        >
          Ace Your Next Interview &amp; Build{" "}
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Dream Resumes
          </span>{" "}
          with AI
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8 font-normal"
        >
          Personalized AI career platform for college students and job seekers. Practice real-time
          mock interviews with native Indian English voice, analyze speech mistakes, and customize 30+
          Canva-style prebuilt industry resumes with direct tap-to-edit canvas in minutes.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
        >
          <motion.button
            onClick={() => setShowLogin(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm cursor-pointer shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2"
          >
            <span>Start Practice Free</span>
            <FaArrowRight size={12} />
          </motion.button>

          <motion.button
            onClick={() => setShowLogin(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm cursor-pointer shadow-xs hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <FiLayers size={15} className="text-purple-600" />
            <span>Browse 30+ Canva Resume Templates</span>
          </motion.button>
        </motion.div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-16 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          {[
            { label: "Canva Prebuilt Resumes", value: "30+" },
            { label: "AI Mock Questions", value: "10,000+" },
            { label: "Voice Latency", value: "< 200ms" },
            { label: "ATS Pass Rate", value: "96.4%" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-2">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Product UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl max-w-4xl mx-auto group bg-white"
        >
          <img src={dashboard} alt="FresherAI Dashboard" className="w-full h-auto object-cover block" />
        </motion.div>
      </section>

      {/* Core Agents & Pillars */}
      <section className="relative z-10 py-16 px-5 sm:px-8 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-purple-700 text-xs font-semibold mb-3">
              Multi-Agent Architecture
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Everything You Need to Get Hired
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
              Autonomous AI agents coordinated to optimize every phase of your job search journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <FiFileText size={20} className="text-purple-600" />,
                title: "Canva Resume Studio",
                tag: "30+ Prebuilts",
                desc: "Choose from 30 ready-to-edit resumes (Isabel Mercado style, MERN, AI/ML, Fresher). Tap any text, image, shape, or color to edit directly.",
              },
              {
                icon: <FiMic size={20} className="text-emerald-600" />,
                title: "Female Indian Voice AI",
                tag: "Real-Time STT",
                desc: "Realistic live mock interviews with clear Indian English accent voice. No awkward pauses; auto-proceeds between questions.",
              },
              {
                icon: <FiBarChart2 size={20} className="text-indigo-600" />,
                title: "Mistake & Word Detection",
                tag: "In-Depth Feedback",
                desc: "AI detects incorrect technical terms, conceptual slips, or mispronounced concepts and provides precise corrections in reports.",
              },
              {
                icon: <FiMap size={20} className="text-amber-600" />,
                title: "Career Roadmap Agent",
                tag: "LangGraph Powered",
                desc: "Generate personalized week-by-week skill learning roadmaps based on your target role and current resume gaps.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden bg-slate-50 border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-purple-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                      {feature.icon}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && <LoginModel onClose={() => setShowLogin(false)} setUser={setUser} />}

      {/* Modern Footer */}
      <footer className="border-t border-slate-200 py-8 text-center bg-slate-50 text-xs text-slate-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center">
            <GiArtificialHive size={13} color="white" />
          </div>
          <span className="font-extrabold text-sm text-slate-900">FresherAI</span>
        </div>
        <p>© {new Date().getFullYear()} Fresher.AI · Empowering students &amp; professionals worldwide</p>
        <p className="text-[11px] text-slate-400 mt-1">Canva-Grade Career &amp; Resume Intelligence Platform</p>
      </footer>
    </div>
  );
}

export default Home;
