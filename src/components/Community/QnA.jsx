import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, doc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

const db = getFirestore();
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
async function geminiGenerate(prompt) {
    const res = await fetch(GEMINI_API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestion available.";
}

const DEMO_QUESTIONS = [
    {
        id: "demo1",
        title: "How to start investing as a student?",
        content: "What are the best beginner-friendly investment options?",
        userId: "demo-user",
        answers: [
            { text: "Start with index funds or SIPs. They're low risk and easy to manage!", userId: "demo-expert", upvotes: 2, createdAt: new Date().toISOString() }
        ],
        solved: false,
        createdAt: new Date()
    },
    {
        id: "demo2",
        title: "How to build an emergency fund?",
        content: "How much should I save and where should I keep it?",
        userId: "demo-user2",
        answers: [
            { text: "Aim for 3-6 months of expenses in a high-yield savings account.", userId: "demo-expert2", upvotes: 1, createdAt: new Date().toISOString() }
        ],
        solved: false,
        createdAt: new Date()
    }
];

export default function QnA() {
    const [questions, setQuestions] = useState([]);
    const [form, setForm] = useState({ title: "", content: "" });
    const [userId] = useState(() => localStorage.getItem("qnaUserId") || (() => { const id = "user-" + Math.random().toString(36).slice(2, 10); localStorage.setItem("qnaUserId", id); return id; })());

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "qna"), (snap) => {
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setQuestions([...DEMO_QUESTIONS, ...data]);
        });
        return () => unsub();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const suggestion = await geminiGenerate(`Suggest a possible answer or elaborate on: "${form.content}"`);
        await addDoc(collection(db, "qna"), { ...form, userId, answers: [{ text: suggestion, userId: "gemini-bot", upvotes: 0, createdAt: new Date().toISOString() }], solved: false, createdAt: serverTimestamp() });
        setForm({ title: "", content: "" });
    }
    async function addAnswer(qid, text) {
        const ref = doc(db, "qna", qid);
        await updateDoc(ref, { answers: arrayUnion({ text, userId, upvotes: 0, createdAt: new Date().toISOString() }) });
    }
    async function upvoteAnswer(qid, idx) {
        const ref = doc(db, "qna", qid);
        const q = questions.find((q) => q.id === qid);
        if (!q) return;
        const answers = [...q.answers];
        answers[idx].upvotes = (answers[idx].upvotes || 0) + 1;
        await updateDoc(ref, { answers });
    }
    async function markSolved(qid, idx) {
        const ref = doc(db, "qna", qid);
        await updateDoc(ref, { solved: true, bestAnswer: idx });
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 border border-gray-100">
                <Input className="mb-2" placeholder="Question Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                <textarea className="border rounded px-3 py-2 w-full mb-2" placeholder="Describe your question..." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required />
                <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Post Question</Button>
            </form>
            <div className="space-y-4">
                {questions.map(q => (
                    <div key={q.id} className="bg-white p-4 rounded shadow border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">{q.title}</h3>
                                <div className="text-xs text-gray-500">by {q.userId}</div>
                            </div>
                            {q.solved && (<span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Solved</span>)}
                        </div>
                        <div className="mt-2 text-gray-700 whitespace-pre-line">{q.content}</div>
                        <div className="mt-4">
                            <h4 className="font-medium mb-1">Answers</h4>
                            <ul className="space-y-2">
                                {q.answers?.map((a, idx) => (
                                    <li key={idx} className={`bg-gray-50 p-2 rounded flex items-center justify-between ${q.bestAnswer === idx ? "border-l-4 border-green-500" : ""}`}>
                                        <div><span className="font-mono text-xs">{a.userId}</span>: {a.text}</div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" className="text-blue-500 text-xs px-2 py-1" onClick={() => upvoteAnswer(q.id, idx)}>▲ {a.upvotes}</Button>
                                            {!q.solved && q.userId === userId && (<Button variant="ghost" className="text-green-600 text-xs px-2 py-1" onClick={() => markSolved(q.id, idx)}>Mark as Best</Button>)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <AddReplyForm onSubmit={text => addAnswer(q.id, text)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AddReplyForm({ onSubmit }) {
    const [text, setText] = useState("");
    return (
        <form className="flex gap-2 mt-2" onSubmit={e => { e.preventDefault(); if (!text.trim()) return; onSubmit(text); setText(""); }}>
            <Input className="flex-1" placeholder="Write an answer..." value={text} onChange={e => setText(e.target.value)} />
            <Button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Answer</Button>
        </form>
    );
} 