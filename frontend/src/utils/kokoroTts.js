let worker;
let requestId = 0;
const pendingRequests = new Map();

const getWorker = () => {
    if (worker) return worker;

    worker = new Worker(new URL("../workers/kokoro.worker.js", import.meta.url), {
        type: "module",
    });

    worker.onmessage = ({ data }) => {
        const pending = pendingRequests.get(data.requestId);
        if (!pending) return;

        if (data.type === "progress") {
            pending.onProgress?.(data);
            return;
        }

        pendingRequests.delete(data.requestId);
        if (data.type === "error") {
            pending.reject(new Error(data.message));
        } else {
            pending.resolve(data.audio || null);
        }
    };

    worker.onerror = (event) => {
        const error = new Error(event.message || "Local voice worker failed.");
        pendingRequests.forEach(({ reject }) => reject(error));
        pendingRequests.clear();
        worker?.terminate();
        worker = null;
    };

    return worker;
};

const sendRequest = (payload, onProgress) => new Promise((resolve, reject) => {
    const id = ++requestId;
    pendingRequests.set(id, { resolve, reject, onProgress });
    try {
        getWorker().postMessage({ ...payload, requestId: id });
    } catch (error) {
        pendingRequests.delete(id);
        reject(error);
    }
});

export const loadLocalVoiceModel = (onProgress) =>
    sendRequest({ type: "load" }, onProgress);

export const generateLocalSpeech = (text, voice, onProgress) =>
    sendRequest({ type: "generate", text, voice }, onProgress);
