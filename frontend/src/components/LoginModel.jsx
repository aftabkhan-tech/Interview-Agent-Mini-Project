import React, { useState } from 'react'
import { FiX } from "react-icons/fi";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import api from '../utils/axios';

function LoginModel({ onClose, setUser }) {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleGoogleAuth = async () => {
        if (loading) return

        setLoading(true)
        setErrorMessage('')

        try {
            const result = await signInWithPopup(auth, provider)
            const token = await result.user.getIdToken()
            const response = await api.post("/api/auth/login", { token })
            const user = response?.data?.user

            if (!user) {
                throw new Error('Login succeeded, but the server did not return a user.')
            }

            setUser(user)
            onClose()
        } catch (error) {
            console.error('Google sign-in failed:', error)
            const code = error?.code
            if (code === 'auth/popup-closed-by-user') {
                setErrorMessage('Sign-in window closed. Please try again.')
            } else if (code === 'auth/unauthorized-domain') {
                setErrorMessage('This website is not authorized for Google sign-in. Add its domain in Firebase Authentication settings.')
            } else if (error?.response) {
                setErrorMessage(error.response.data?.message || 'The server could not complete sign-in. Please try again.')
            } else if (code) {
                setErrorMessage(error.message || 'Google sign-in failed. Please try again.')
            } else {
                setErrorMessage('Could not reach the server. Check your connection and try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4'>
            <div className='relative w-full max-w-sm
        bg-[#0A0A0A]/80 backdrop-blur-2xl
        border border-white/10
        rounded-2xl
        overflow-hidden
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]'>

                <div className='absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none' />

                <div className='relative p-7'>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        aria-label='Close sign in'
                        className='absolute top-4 right-4
              text-white/30 hover:text-white
              transition-colors disabled:opacity-40'><FiX size={16} /></button>

                    <h2 className='text-lg font-bold text-center mb-2 text-white'>
                        Sign In to {" "}
                        <span className='font-extrabold text-lg tracking-tight text-white'>FresherAI</span>
                    </h2>
                    <p className='text-white/45 text-center text-xs'>
                        Continue your AI interview journey
                    </p>

                    <div className='mt-7'>
                        <motion.button
                            onClick={handleGoogleAuth}
                            disabled={loading}
                            aria-busy={loading}
                            whileHover={loading ? undefined : { scale: 1.04 }}
                            whileTap={loading ? undefined : { scale: 0.97 }}
                            className='w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md hover:border-white/25 hover:bg-white/[0.14] shadow-inner transition-all disabled:cursor-wait disabled:opacity-60'
                        >
                            <FcGoogle size={18}/>
                            <span className='text-white font-medium text-sm'>
                                {loading ? 'Signing in…' : 'Continue with Google'}
                            </span>
                        </motion.button>
                        {errorMessage && (
                            <p role='alert' className='mt-3 text-center text-xs leading-relaxed text-red-300'>
                                {errorMessage}
                            </p>
                        )}
                    </div>
                </div>

                <div className='relative border-t border-white/10 bg-black/30 p-4 text-center'>
                    <p className='text-white/30 text-xs'>
                        Secure authentication powered by Firebase
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginModel
