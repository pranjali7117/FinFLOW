import React, { useState, useEffect } from "react";
// --- Firebase imports ---
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    doc,
    updateDoc,
    increment,
    arrayUnion,
    serverTimestamp,
} from "firebase/firestore";
// --- UI components ---
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

// --- Firebase config from environment variables ---
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Gemini API config from environment variable ---
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
    GEMINI_API_KEY;

async function geminiGenerate(prompt) {
    const res = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
        }),
    });
    const data = await res.json();
    return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No suggestion available."
    );
}

const categories = [
    "General Finance",
    "Investing",
    "Saving",
    "Budgeting",
    "Tools Help",
];

// Helper to extract a short summary or first prompt from Gemini output
function extractShortSummary(summary) {
    if (!summary) return "";
    // Try to extract the first summary or discussion prompt
    const match = summary.match(/\*\*Summary:\*\*([^*]+)/) || summary.match(/\*\*Discussion Prompt:\*\*([^*]+)/);
    if (match) return match[1].trim();
    // Fallback: first 200 chars
    return summary.slice(0, 200) + (summary.length > 200 ? "..." : "");
}

export default function Forum() {
    const [threads, setThreads] = useState([]);
    const [category, setCategory] = useState(categories[0]);
    const [search, setSearch] = useState("");
    const [newThread, setNewThread] = useState({
        title: "",
        content: "",
        category: categories[0],
    });
    const [loading, setLoading] = useState(false);
    const [userId] = useState(() =>
        localStorage.getItem("forumUserId") ||
        (() => {
            const id = "user-" + Math.random().toString(36).slice(2, 10);
            localStorage.setItem("forumUserId", id);
            return id;
        })()
    );
    const [showMore, setShowMore] = useState({});

    // Real-time threads
    useEffect(() => {
        const q = query(
            collection(db, "forumThreads"),
            orderBy("createdAt", "desc")
        );
        const unsub = onSnapshot(q, (snap) => {
            setThreads(
                snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((t) =>
                    t.title.toLowerCase().includes(search.toLowerCase())
                )
            );
        });
        return () => unsub();
    }, [search]);

    // Create thread
    async function handleCreateThread(e) {
        e.preventDefault();
        setLoading(true);
        // Gemini prompt for summary
        const summary = await geminiGenerate(
            `Summarize or suggest a discussion prompt for: "${newThread.title}"`
        );
        await addDoc(collection(db, "forumThreads"), {
            ...newThread,
            summary,
            userId,
            upvotes: 0,
            replies: [],
            createdAt: serverTimestamp(),
        });
        setNewThread({ title: "", content: "", category: categories[0] });
        setLoading(false);
    }

    // Upvote thread
    async function upvoteThread(id) {
        const ref = doc(db, "forumThreads", id);
        await updateDoc(ref, { upvotes: increment(1) });
    }

    // Add reply
    async function addReply(threadId, reply) {
        const ref = doc(db, "forumThreads", threadId);
        await updateDoc(ref, {
            replies: arrayUnion({
                ...reply,
                userId,
                upvotes: 0,
                createdAt: new Date().toISOString(),
            }),
        });
    }

    // Upvote reply
    async function upvoteReply(threadId, idx) {
        const ref = doc(db, "forumThreads", threadId);
        const thread = threads.find((t) => t.id === threadId);
        if (!thread) return;
        const replies = [...thread.replies];
        replies[idx].upvotes = (replies[idx].upvotes || 0) + 1;
        await updateDoc(ref, { replies });
    }

    return (
        <div>
            {/* New Thread Form */}
            <form
                onSubmit={handleCreateThread}
                className="bg-white p-4 rounded shadow mb-6 border border-gray-100"
            >
                <div className="flex flex-col md:flex-row gap-2 mb-2">
                    <Input
                        className="flex-1"
                        placeholder="Thread Title"
                        value={newThread.title}
                        onChange={(e) =>
                            setNewThread((t) => ({ ...t, title: e.target.value }))
                        }
                        required
                    />
                    <select
                        className="border rounded px-3 py-2"
                        value={newThread.category}
                        onChange={(e) =>
                            setNewThread((t) => ({ ...t, category: e.target.value }))
                        }
                    >
                        {categories.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <textarea
                    className="border rounded px-3 py-2 w-full mb-2"
                    placeholder="Thread Content"
                    value={newThread.content}
                    onChange={(e) =>
                        setNewThread((t) => ({ ...t, content: e.target.value }))
                    }
                    required
                />
                <Button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? "Posting..." : "Post Thread"}
                </Button>
            </form>
            {/* Search & Category */}
            <div className="flex flex-col md:flex-row gap-2 mb-4">
                <Input
                    className="flex-1"
                    placeholder="Search threads..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="border rounded px-3 py-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((c) => (
                        <option key={c}>{c}</option>
                    ))}
                </select>
            </div>
            {/* Threads List */}
            <div className="space-y-4">
                {threads
                    .filter((t) => t.category === category)
                    .map((t) => (
                        <div key={t.id} className="bg-white p-4 rounded shadow border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-lg">{t.title}</h3>
                                    <div className="text-xs text-gray-500">
                                        {t.category} • by {t.userId}
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-2 py-1"
                                    onClick={() => upvoteThread(t.id)}
                                >
                                    ▲ {t.upvotes}
                                </Button>
                            </div>
                            <div className="mt-2 text-gray-700 whitespace-pre-line">{t.content}</div>
                            {t.summary && (
                                <div className="mt-3 mb-2 bg-blue-50 border-l-4 border-blue-400 p-3 rounded text-sm text-blue-800">
                                    <strong>Suggested Discussion:</strong> {extractShortSummary(t.summary)}
                                    {t.summary.length > 220 && (
                                        <button
                                            onClick={() => setShowMore((s) => ({ ...s, [t.id]: !s[t.id] }))}
                                            className="ml-2 text-xs underline text-blue-600"
                                        >
                                            {showMore[t.id] ? "Show less" : "Show more"}
                                        </button>
                                    )}
                                    {showMore[t.id] && (
                                        <div className="mt-2 text-gray-700 whitespace-pre-line">{t.summary}</div>
                                    )}
                                </div>
                            )}
                            {/* Replies */}
                            <div className="mt-4">
                                <h4 className="font-medium mb-1">Replies</h4>
                                <ul className="space-y-2">
                                    {t.replies?.map((r, idx) => (
                                        <li
                                            key={idx}
                                            className="bg-gray-50 p-2 rounded flex items-center justify-between"
                                        >
                                            <div>
                                                <span className="font-mono text-xs">{r.userId}</span>: {r.text}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                className="text-blue-500 text-xs px-2 py-1"
                                                onClick={() => upvoteReply(t.id, idx)}
                                            >
                                                ▲ {r.upvotes}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                                {/* Add Reply */}
                                <AddReplyForm
                                    onSubmit={(text) => addReply(t.id, { text })}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

// --- Add Reply Form ---
function AddReplyForm({ onSubmit }) {
    const [text, setText] = useState("");
    return (
        <form
            className="flex gap-2 mt-2"
            onSubmit={(e) => {
                e.preventDefault();
                if (!text.trim()) return;
                onSubmit(text);
                setText("");
            }}
        >
            <Input
                className="flex-1"
                placeholder="Write a reply..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded"
            >
                Reply
            </Button>
        </form>
    );
} 