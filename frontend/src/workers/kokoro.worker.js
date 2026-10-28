import { KokoroTTS } from "kokoro-js";

const MODEL_ID = "onnx-community/Kokoro-82M-v1.0-ONNX";
let modelPromise;
let taskQueue = Promise.resolve();

const loadModel = (requestId) => {
    if (!modelPromise) {
        modelPromise = KokoroTTS.from_pretrained(MODEL_ID, {
            dtype: "q8",
            device: "wasm",
            progress_callback: (event) => {
                self.postMessage({
                    requestId,
                    type: "progress",
                    progress: Number.isFinite(event?.progress) ? Math.round(event.progress) : null,
                    file: event?.file || "",
                });
            },
        }).catch((error) => {
            modelPromise = null;
            throw error;
        });
    }

    return modelPromise;
};

const processRequest = async ({ requestId, type, text, voice }) => {
    try {
        const tts = await loadModel(requestId);

        if (type === "load") {
            self.postMessage({ requestId, type: "ready" });
            return;
        }

        const audio = await tts.generate(text, { voice, speed: 0.92 });
        self.postMessage({ requestId, type: "complete", audio: audio.toBlob() });
    } catch (error) {
        self.postMessage({
            requestId,
            type: "error",
            message: error?.message || "Could not load the local speech model.",
        });
    }
};

self.addEventListener("message", (event) => {
    taskQueue = taskQueue.then(() => processRequest(event.data));
});
