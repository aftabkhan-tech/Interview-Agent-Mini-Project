/**
 * Indian Native English Speech Synthesis Utility (en-IN)
 * Provides crystal clear, consistent Indian English voice for the AI interviewer.
 * Uses Web Speech API with zero model download overhead and instant initialization.
 */

let selectedIndianVoice = null;
let keepAliveInterval = null;

// Clean up speech keep-alive timer
const clearSpeechKeepAlive = () => {
    if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
        keepAliveInterval = null;
    }
};

/**
 * Searches and selects the highest quality Indian Native English (en-IN) voice available on the device.
 * Priority:
 * 1. Microsoft Natural Online voices (Neerja, Prabhat)
 * 2. Google Indian English (Chrome / Android)
 * 3. Apple Indian English (Rishi, Veena)
 * 4. Any en-IN system voice
 * 5. Clean English voice with en-IN lang tag as fallback
 */
export const getIndianVoice = () => {
    if (selectedIndianVoice) return selectedIndianVoice;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Helper: matches en-IN locale
    const isEnInLang = (v) => {
        const lang = (v.lang || "").toLowerCase().replace(/_/g, "-");
        return lang === "en-in" || lang.startsWith("en-in");
    };

    // Helper: filter out known male voices
    const isKnownMale = (v) => {
        return /prabhat|rishi|aarav|ravi|hemant|karan|david|mark|george|guy|\bmale\b/i.test(v.name);
    };

    // Helper: identifies female names or tags
    const isFemaleName = (v) => {
        return /neerja|heera|veena|sangeeta|kavya|swara|aditi|kalpana|ananya|zira|samantha|victoria|karen|catherine|jenny|\bfemale\b/i.test(v.name);
    };

    // Priority 1: Microsoft Neerja Online / Natural (Premium Indian Female)
    const msNeerjaNatural = voices.find((v) =>
        isEnInLang(v) && /neerja/i.test(v.name) && /natural|online|neural/i.test(v.name)
    );
    if (msNeerjaNatural) {
        selectedIndianVoice = msNeerjaNatural;
        return selectedIndianVoice;
    }

    // Priority 2: Named Indian Female voices (Neerja, Heera, Veena, Sangeeta, Kavya, Aditi)
    const namedIndianFemale = voices.find((v) =>
        isEnInLang(v) && /neerja|heera|veena|sangeeta|kavya|swara|aditi|kalpana/i.test(v.name)
    );
    if (namedIndianFemale) {
        selectedIndianVoice = namedIndianFemale;
        return selectedIndianVoice;
    }

    // Priority 3: Google Indian English (Female default)
    const googleIndianFemale = voices.find((v) =>
        isEnInLang(v) && /google/i.test(v.name) && !isKnownMale(v)
    );
    if (googleIndianFemale) {
        selectedIndianVoice = googleIndianFemale;
        return selectedIndianVoice;
    }

    // Priority 4: Any en-IN voice with female indicator or non-male
    const anyEnInFemale = voices.find((v) => isEnInLang(v) && isFemaleName(v))
        || voices.find((v) => isEnInLang(v) && !isKnownMale(v));
    if (anyEnInFemale) {
        selectedIndianVoice = anyEnInFemale;
        return selectedIndianVoice;
    }

    // Priority 5: Fallback to any clear English female voice
    const fallbackEnglishFemale = voices.find((v) =>
        (v.lang || "").toLowerCase().startsWith("en") && isFemaleName(v)
    ) || voices.find((v) =>
        (v.lang || "").toLowerCase().startsWith("en") && !isKnownMale(v)
    );

    selectedIndianVoice = fallbackEnglishFemale || voices[0] || null;
    return selectedIndianVoice;
};

/**
 * Initializes and guarantees voice availability.
 * Resolves immediately if voices are already loaded or waits for `onvoiceschanged`.
 */
export const loadIndianVoice = () => {
    return new Promise((resolve) => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) {
            resolve(null);
            return;
        }

        const voice = getIndianVoice();
        if (voice) {
            resolve(voice);
            return;
        }

        const handleVoicesChanged = () => {
            const v = getIndianVoice();
            window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
            resolve(v);
        };

        window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);

        // Fallback timeout: resolve anyway after 400ms if voiceschanged doesn't fire
        setTimeout(() => {
            window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
            resolve(getIndianVoice());
        }, 400);
    });
};

/**
 * Speaks the given text using the selected Indian Native English voice.
 * Keeps utterance alive against browser garbage collection bugs and provides full lifecycle callbacks.
 */
export const speakIndianText = (text, { onStart, onEnd, onError } = {}) => {
    return new Promise((resolve) => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) {
            resolve();
            return;
        }

        const trimmed = (text || "").trim();
        if (!trimmed) {
            resolve();
            return;
        }

        // Cancel any active speech before starting new one
        window.speechSynthesis.cancel();
        clearSpeechKeepAlive();

        const voice = getIndianVoice();
        const utterance = new SpeechSynthesisUtterance(trimmed);

        if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang || "en-IN";
        } else {
            utterance.lang = "en-IN";
        }

        // Pacing & pitch tuned for natural, crystal-clear Indian English interview delivery
        utterance.rate = 0.94;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        let hasFinished = false;
        const handleFinish = () => {
            if (hasFinished) return;
            hasFinished = true;
            clearSpeechKeepAlive();
            onEnd?.();
            resolve();
        };

        utterance.onstart = () => {
            onStart?.();

            // Chrome bug workaround: speech synthesis can pause if text is long.
            // A periodic resume keeps it smoothly speaking.
            clearSpeechKeepAlive();
            keepAliveInterval = setInterval(() => {
                if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
                    window.speechSynthesis.pause();
                    window.speechSynthesis.resume();
                } else {
                    clearSpeechKeepAlive();
                }
            }, 10000);
        };

        utterance.onend = handleFinish;

        utterance.onerror = (e) => {
            // Ignore error if speech was intentionally cancelled or replaced
            if (e.error === "canceled" || e.error === "interrupted") {
                handleFinish();
                return;
            }
            console.warn("Speech synthesis error:", e);
            onError?.(e);
            handleFinish();
        };

        window.speechSynthesis.speak(utterance);
    });
};

/**
 * Cancels any ongoing speech immediately.
 */
export const stopIndianSpeech = () => {
    clearSpeechKeepAlive();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
};
