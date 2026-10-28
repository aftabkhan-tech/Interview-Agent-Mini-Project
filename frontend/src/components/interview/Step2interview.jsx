import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import femaleVideo from "../../assets/female-ai.mp4"
import { AnimatePresence, motion } from "motion/react"
import { FiArrowRight, FiCamera, FiCameraOff, FiClock, FiCode, FiMessageSquare, FiMic, FiMicOff, FiVolume2 } from 'react-icons/fi'
import CodeEditor from './CodeEditor'
import Timer from './Timer'
import { submitAnswer } from '../../apis/interview.api'
import { useNavigate } from 'react-router-dom'
import { loadIndianVoice, speakIndianText, stopIndianSpeech, getIndianVoice } from '../../utils/indianSpeech'

function Step2interview({ interviewData, user }) {
const navigate = useNavigate()
  const speechRecognitionSupported = typeof window !== "undefined" && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  // â”€â”€ State â”€â”€
  const [question, setQuestion] = useState(interviewData.question);
  const [currentIndex, setCurrentIndex] = useState(interviewData.currentQuestion || 0);
  const [totalQuestions, setTotalQuestions] = useState(interviewData.totalQuestions);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(interviewData.question.timer || 60);
  const [timerActive, setTimerActive] = useState(false);

  // UI toggles
  const [micOn, setMicOn] = useState(false); // user's manual preference â€” only changed by the mic button
  const [cameraOn, setCameraOn] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);

  // Speech & Voice State
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [voiceError, setVoiceError] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("Setting up Indian English voiceâ€¦");
  const [voiceReady, setVoiceReady] = useState(false);
  const [introSpoken, setIntroSpoken] = useState(false);
  const [activeVoiceName, setActiveVoiceName] = useState("Indian English (en-IN)");
  const [interimText, setInterimText] = useState("");
  const [micError, setMicError] = useState(speechRecognitionSupported ? "" : "Voice input is not supported in this browser. Please use Chrome or type your answer.");
  const [isListening, setIsListening] = useState(false);

  // Refs
  const aiVideoRef = useRef(null);
  const userVideoRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);
  const isAIPlayingRef = useRef(false);
  const micOnRef = useRef(false);
  const recognitionStartedRef = useRef(false);
  const recognitionBlockedRef = useRef(false);
  const answerRef = useRef("");
  const interimTextRef = useRef("");

  // Keep refs in sync for event listeners
  useEffect(() => {
    isAIPlayingRef.current = isAIPlaying;
  }, [isAIPlaying]);

  useEffect(() => {
    micOnRef.current = micOn;
  }, [micOn]);

  const videoSource = femaleVideo
  const progress = ((currentIndex + 1)/(totalQuestions || 1))*100
  const showMicon = micOn && !isAIPlaying

  // Speech recognition (Indian English Accent en-IN)
  const startMic = () => {
    const recognition = recognitionRef.current;
    if (!micOnRef.current || isAIPlayingRef.current || recognitionBlockedRef.current) return;
    if (!recognition) {
      setMicError("Voice input is not supported in this browser. Please use Chrome or type your answer.");
      return;
    }
    if (recognitionStartedRef.current) return;

    try {
      recognition.start();
      recognitionStartedRef.current = true;
      setMicError("");
    } catch (error) {
      if (error.name !== "InvalidStateError") {
        console.warn("Could not start interview speech recognition", error);
        setMicError("Could not start the microphone. Check browser microphone permission and try again.");
      }
    }
  };

  const stopMic = () => {
    try {
      recognitionRef.current?.stop();
    } catch (error) {
      if (error.name !== "InvalidStateError") {
        console.warn("Could not stop interview speech recognition", error);
      }
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return undefined;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      recognitionStartedRef.current = true;
      setIsListening(true);
      setMicError("");
    };

    recognition.onresult = (event) => {
      let interim = "";
      let finalChunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalChunk += `${transcript} `;
        else interim += transcript;
      }

      const currentInterim = interim.trim();
      interimTextRef.current = currentInterim;
      setInterimText(currentInterim);

      if (finalChunk.trim()) {
        const currentAnswer = answerRef.current.trim();
        const updatedAnswer = currentAnswer
          ? `${currentAnswer} ${finalChunk.trim()}`
          : finalChunk.trim();
        answerRef.current = updatedAnswer;
        setAnswer(updatedAnswer);
      }
    };

    recognition.onerror = (event) => {
      recognitionStartedRef.current = false;
      setIsListening(false);
      if (event.error === "no-speech" || event.error === "aborted") return;

      recognitionBlockedRef.current = true;
      console.warn("Speech recognition error:", event.error);
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        recognitionBlockedRef.current = true;
        micOnRef.current = false;
        setMicOn(false);
        setMicError("Microphone access is blocked. Allow microphone access for this site, then turn the mic back on.");
      } else if (event.error === "audio-capture") {
        setMicError("No microphone was found. Connect a microphone or type your answer.");
      } else if (event.error === "network") {
        setMicError("Voice recognition could not connect. Check your internet and try again.");
      } else {
        setMicError("Voice recognition stopped. Turn the mic off and on to retry.");
      }
    };

    recognition.onend = () => {
      recognitionStartedRef.current = false;
      setIsListening(false);
      const pendingTranscript = interimTextRef.current.trim();
      const currentAnswer = answerRef.current.trim();
      if (pendingTranscript && !currentAnswer.toLowerCase().endsWith(pendingTranscript.toLowerCase())) {
        const updatedAnswer = currentAnswer
          ? `${currentAnswer} ${pendingTranscript}`
          : pendingTranscript;
        answerRef.current = updatedAnswer;
        setAnswer(updatedAnswer);
      }
      interimTextRef.current = "";
      setInterimText("");
      if (micOnRef.current && !isAIPlayingRef.current && !recognitionBlockedRef.current) {
        window.setTimeout(startMic, 250);
      }
    };
    recognitionRef.current = recognition;
    return () => {
      recognitionBlockedRef.current = true;
      recognitionRef.current = null;
      try {
        recognition.stop();
      } catch {
        // Recognition may already be stopped.
      }
    };
  }, []);

  const toggleMic = () => {
    const nextMicState = !micOnRef.current;
    micOnRef.current = nextMicState;
    setMicOn(nextMicState);

    if (nextMicState) {
      recognitionBlockedRef.current = false;
      setMicError("");
      startMic();
    } else {
      stopMic();
      setMicError("");
    }
  };
  const toggleCamera =async ()=>{
    if(cameraOn){
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setCameraOn(false);

    }else{
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video:true})
        streamRef.current = stream
        setCameraOn(true)
        setTimeout(()=>{
          if(userVideoRef.current) userVideoRef.current.srcObject = stream

        },100)
      } catch (error) {
        setCameraOn(false)
      }
    }
  }

  const handleSubmitCode = (code) => {
    setAnswer((previousAnswer) => {
      const separator = previousAnswer.trim() ? "\n\n--- Code ---\n" : "--- Code ---\n";
      const updatedAnswer = previousAnswer + separator + code;
      answerRef.current = updatedAnswer;
      return updatedAnswer;
    });
    setCodeOpen(false);
  }
  useEffect(()=>{
    if (timeLeft <= 0 || !timerActive) return;
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);

  },[timeLeft , timerActive])


  useEffect(() => {
    let active = true;
    loadIndianVoice()
      .then((voice) => {
        if (!active) return;
        const voiceLabel = voice?.name ? `${voice.name}` : "Indian English (en-IN)";
        setActiveVoiceName(voiceLabel);
        setVoiceReady(true);
        setVoiceError(false);
        setVoiceStatus("");
        setTimerActive(true);
      })
      .catch((error) => {
        if (!active) return;
        console.warn("Could not load preferred Indian voice, using system speech engine", error);
        setVoiceReady(true);
        setVoiceError(false);
        setVoiceStatus("");
        setTimerActive(true);
      });

    return () => {
      active = false;
      stopIndianSpeech();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const speakText = (text) =>
    new Promise((resolve) => {
      if (!text?.trim()) {
        resolve();
        return;
      }
      setVoiceError(false);
      setSubtitle(text);
      isAIPlayingRef.current = true;
      setIsAIPlaying(true);
      stopMic();
      aiVideoRef.current?.play().catch(() => {});

      speakIndianText(text, {
        onStart: () => {
          isAIPlayingRef.current = true;
          setIsAIPlaying(true);
          stopMic();
          aiVideoRef.current?.play().catch(() => {});
        },
        onEnd: () => {
          aiVideoRef.current?.pause();
          isAIPlayingRef.current = false;
          setIsAIPlaying(false);
          if (micOnRef.current) startMic();
          setTimeout(() => {
            setSubtitle("");
            resolve();
          }, 250);
        },
        onError: () => {
          aiVideoRef.current?.pause();
          isAIPlayingRef.current = false;
          setIsAIPlaying(false);
          if (micOnRef.current) startMic();
          setTimeout(() => {
            setSubtitle("");
            resolve();
          }, 250);
        },
      });
    });
  

  useEffect(()=>{
    if(!voiceReady || introSpoken)return;
    const runIntro=async () => {
      await new Promise((r) => setTimeout(r, 1200));
      await speakText(`Welcome ${user?.name.split(" ")[0]}! Let's begin your interview.`);
      setIntroSpoken(true);
    }
    runIntro()

  },[voiceReady])



  useEffect(()=>{
    setQuestion(interviewData.question);
    setCurrentIndex(interviewData.currentQuestion);
    setTimeLeft(interviewData.question.timer || 60);

  },[interviewData])

  
  useEffect(()=>{
    if(!voiceReady || !introSpoken)return;
    const speakQuestion = async () => {
      await new Promise((r) => setTimeout(r, 900));
      await speakText(question.question);
    }
    speakQuestion()

  },[question, voiceReady, introSpoken])

  useEffect(()=>{
     setTimeLeft(question.timer || 60);
     setTimerActive(voiceReady);

  },[question, voiceReady])



  useEffect(()=>{
    if(timeLeft !== 0)return;
    const autoSubmit = async () => {
      await speakText("Time is up. Submitting your answer now.");
      const pendingSpeech = interimTextRef.current.trim();
      const finalAnswer = [answerRef.current.trim(), pendingSpeech].filter(Boolean).join(" ") || "No answer provided. Time over.";

      setLoading(true)

    const res = await submitAnswer({ interviewId: interviewData.interviewId, answer:finalAnswer})

    if(res.completed){
      await speakText("Great job! Your interview is complete. Preparing your report now.");
      setLoading(false);
      navigate(`/interview/${interviewData.interviewId}/report`);
      return;
    }

    await speakText(res.followUp ? "Let me ask a follow-up question about your answer." : "Thank you. Let's move to the next question.");
    setLoading(false);
    setQuestion(res.question);
    setCurrentIndex(res.currentQuestion);
    setTotalQuestions(res.totalQuestions || totalQuestions);
    answerRef.current = "";
    interimTextRef.current = "";
    setInterimText("");
    setAnswer("");
  }

  autoSubmit()
},[timeLeft])

  const submit = async () => {
    const pendingSpeech = interimTextRef.current.trim();
    const spokenAnswer = [answerRef.current.trim(), pendingSpeech].filter(Boolean).join(" ");
    if(!spokenAnswer) return;

    setTimerActive(false)
    setLoading(true)

    const res = await submitAnswer({ interviewId: interviewData.interviewId, answer: spokenAnswer })

    if(res.completed){
      await speakText("Great job! Your interview is complete. Preparing your report now.");
      setLoading(false);
      navigate(`/interview/${interviewData.interviewId}/report`);
      return;
    }

    await speakText(res.followUp ? "Let me ask a follow-up question about your answer." : "Thank you. Let's move to the next question.");
    setLoading(false);
    setQuestion(res.question);
    setCurrentIndex(res.currentQuestion);
    setTotalQuestions(res.totalQuestions || totalQuestions);
    answerRef.current = "";
    interimTextRef.current = "";
    setInterimText("");
    setAnswer("");
  }

  


  return (
    <div className='min-h-screen bg-white flex items-center justify-center p-3 sm:p-5'>


      {codeOpen && <CodeEditor onClose={()=>setCodeOpen(false)} onSubmitCode={handleSubmitCode} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='w-full max-w-5xl bg-[#0E1016] border border-white/10 rounded-2xl sm:rounded-[24px] overflow-hidden shadow-[0_0_60px_rgba(255,255,255,.03)] grid lg:grid-cols-[36%_64%]'>
        {/* left */}

        <div className='flex flex-col border-b lg:border-b-0 lg:border-r border-white/8 p-4 sm:p-5 gap-3'>

          {/* Ai Video */}
          <div className='relative rounded-xl overflow-hidden bg-black aspect-video'>
            <video
              src={videoSource}
              ref={aiVideoRef}
              muted
              playsInline
              preload="auto"
              loop
              className="w-full h-full object-cover"
            />
            {voiceError && (
              <div className="absolute inset-x-2 bottom-2 rounded-lg bg-red-950/90 px-3 py-2 text-center text-[11px] text-red-200">
                Local voice could not start. Refresh the interview and try again.
              </div>
            )}
            {isAIPlaying && (
              <div className='absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1'>
                <div className='flex gap-0.5 items-end h-3'>
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-white rounded-full"
                      animate={{ height: ["4px", "12px", "4px"] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
                <span className='text-[10px] text-white/80'>AI Speaking</span>
              </div>
            )}
          </div>

          <div className='space-y-2'>
            <div className='flex items-center justify-between text-[10px] text-white/50 px-1'>
              <div className='flex items-center gap-1.5'>
                <FiVolume2 size={11} className="text-emerald-400" />
                <span className='truncate max-w-[200px]' title={activeVoiceName}>
                  {activeVoiceName}
                </span>
              </div>
              <span className='text-emerald-400/80 font-medium'>Female Indian English (en-IN)</span>
            </div>

            {voiceStatus && <p className="text-[10px] text-white/40">{voiceStatus}</p>}

            <div className='min-h-[52px] flex items-center'>
              <AnimatePresence>
                {subtitle &&
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className='w-full rounded-xl bg-white/5 border border-white/8 px-3 py-2'>
                    <p className="text-xs text-white/65 leading-relaxed text-center">{subtitle}</p>
                  </motion.div>}
              </AnimatePresence>
            </div>
          </div>


          <div className='relative rounded-xl overflow-hidden bg-[#17181E] border border-white/8 aspect-video flex items-center justify-center'>
            {cameraOn ?
              <>
                <video
                  ref={userVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                <div className='absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5'>
                <span className="text-[10px] text-white/70">You</span>
                </div>
              </>
              :
              <div className='flex flex-col items-center gap-2'>
                <div className='w-14 h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center'>
                <span className='text-2xl font-bold text-white'>{user?.name.charAt(0).toUpperCase()}</span>
                </div>
                <span className='text-xs text-white/35'>{user?.name.split(" ")[0]}</span>
                </div>}     
          </div>


          <div className='flex flex-col items-center gap-1.5 pt-1'>
            <div className='flex items-center justify-center gap-3'>
              <motion.button
              onClick={toggleMic} 
              whileHover={{ scale: 1.08 }} 
              whileTap={{ scale: 0.93 }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  showMicon ? "bg-white/10 border-white/15 text-white" : "bg-red-500/20 border-red-500/30 text-red-400"
                }`}>
                  {showMicon ? <FiMic size={15}/> : <FiMicOff size={15}/>}

              </motion.button>

              <motion.button 
              whileHover={{ scale: 1.08 }} 
              whileTap={{ scale: 0.93 }}
              onClick={toggleCamera}
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  cameraOn ? "bg-white/10 border-white/15 text-white" : "bg-white/5 border-white/10 text-white/45 hover:text-white/70"
                }`}>
                  {cameraOn ? <FiCamera size={15}/> : <FiCameraOff size={15}/>}
                

              </motion.button>

              <motion.button 
              whileHover={{ scale: 1.08 }} 
              whileTap={{ scale: 0.93 }}
              onClick={()=>setCodeOpen(true)}
              className="w-10 h-10 rounded-xl flex items-center justify-center border bg-white/5 border-white/10 text-white/45 hover:text-white/70 hover:border-white/20 transition-all">

                <FiCode size={15}/>
                
              </motion.button>


            </div>

            <div className='min-h-[14px] flex items-center justify-center'>
              {micOn && isAIPlaying && (
                <span className="text-[10px] text-red-400/80">Mic paused â€” AI is speaking</span>)}
            </div>

            <span className="text-[10px] text-white/35 text-center">
              Coding question? Use <FiCode size={9} className="inline -mt-0.5" /> to write &amp; add code
            </span>

          </div>

        </div>
        {/* right */}

        <div className='flex flex-col p-4 sm:p-6'>


          <div className='flex items-start justify-between mb-4'>

            <div> 
              <h2 className='text-base sm:text-lg font-semibold text-white'>
                AI Interview
              </h2>
              <div className='flex items-center gap-2 text-zinc-500 text-xs mt-0.5'>
                <FiClock size={11}/>
                <span>{question.difficulty}</span>

              </div>
            </div>

            <div className='flex flex-col items-end gap-1.5 min-w-[110px]'>
              <Timer timeLeft={timeLeft} totalTime={question.timer || 60}/>

            </div>
          </div>


          <motion.div 
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          className='relative overflow-hidden rounded-xl bg-[#17181E] border border-white/8 p-4 sm:p-5 mb-4'>
            <div className='absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none'/>
            <div className='relative flex items-center gap-2.5 mb-3'>
              <div className='w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center shrink-0'>
                <FiMessageSquare size={14}/>
              </div>
              <p className="text-xs text-zinc-500">{question.isFollowUp ? "Follow-up question" : `Question ${currentIndex + 1}`}</p>
            </div>
            <p className='relative text-white text-sm sm:text-base leading-7'>
              {question.question}</p>

          </motion.div>

          <div className='mb-3'>
            <div className='flex justify-between text-[10px] text-white/35 mb-1'>
            <span>Progress</span>
            <span>{currentIndex+1}/{totalQuestions}</span>
            </div>
            <div className='w-full h-1 rounded-full bg-white/10 overflow-hidden'>
            <div className='h-full bg-white rounded-full transition-all duration-500' style={{width: `${progress}%`}} /></div>
          </div>

          <div className='flex-1 flex flex-col min-h-0'>
            <div className='flex items-center justify-between mb-1.5'>
              <label className='text-xs font-medium text-zinc-400'>Your Answer</label>
              {micError ? (
                <p role="alert" className="text-[10px] text-amber-300">{micError}</p>
              ) : (
                <p className="text-[10px] text-zinc-500">{isListening ? "Listening…" : micOn ? "Starting microphone…" : "Click mic to enable voice input"}</p>
              )}
              {interimText && (
                <div className='flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 animate-pulse'>
                  <span className='w-1.5 h-1.5 rounded-full bg-emerald-400' />
                  <span>Hearing: "{interimText}"</span>
                </div>
              )}
            </div>
            <textarea
              onChange={(e)=>{
                answerRef.current = e.target.value;
                setAnswer(e.target.value);
              }}
              value={answer}
              rows={5}
              onKeyDown={(e)=>{if(e.ctrlKey && e.key === "Enter") submit()}}
              placeholder='Write your answer here or speak clearly in English'
              className='flex-1 w-full rounded-xl bg-[#17181E] border border-white/8 p-4 text-sm text-white outline-none resize-none focus:border-white/25 transition placeholder-white/20'
            />
          </div>




          <div className='flex items-center justify-between mt-4 pt-3 border-t border-white/8'>
          <span className='text-xs text-zinc-600 hidden sm:block'>
            Press{" "}
            <span className='mx-1 rounded bg-white/10 px-1.5 py-0.5 text-white text-[10px]'>
             Ctrl+Enter
            </span>to Submit
          </span>

          <motion.button 
          whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={submit}
              disabled={loading || !(answer.trim() || interimText.trim())}
              className='ml-auto h-10 min-w-[150px] justify-center px-5 rounded-xl bg-white text-black text-sm font-semibold flex items-center gap-2 disabled:opacity-40 transition'

              
              >
                 {loading ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  Submittingâ€¦
                </>
              ) : (
                <>Submit Answer <FiArrowRight size={15} /></>
              )}

          </motion.button>
          
          </div>


        </div>


      </motion.div>



    </div>
  )
}

export default Step2interview










