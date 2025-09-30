import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, doc, arrayUnion, increment, serverTimestamp } from "firebase/firestore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

const db = getFirestore();

const DEMO_FEEDBACKS = [
    {
        id: "demo-feedback-1",
        title: "Add dark mode",
        content: "A dark mode option would be great for night use!",
        userId: "demo-user",
        upvotes: 3,
        comments: [{ text: "+1", userId: "user-abc", createdAt: new Date().toISOString() }],
        createdAt: new Date()
    },
    {
        id: "demo-feedback-2",
        title: "More calculators",
        content: "Please add a SIP and retirement calculator.",
        userId: "demo-user2",
        upvotes: 1,
        comments: [],
        createdAt: new Date()
    }
];

export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [form, setForm] = useState({ title: "", content: "" });
    const [userId] = useState(() => localStorage.getItem("feedbackUserId") || (() => { const id = "user-" + Math.random().toString(36).slice(2, 10); localStorage.setItem("feedbackUserId", id); return id; })());

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "feedback"), (snap) => {
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            const merged = [...DEMO_FEEDBACKS, ...data];
            setFeedbacks(merged);
            console.log('Feedback:', merged);
        });
        return () => unsub();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await addDoc(collection(db, "feedback"), { ...form, userId, upvotes: 0, comments: [], createdAt: serverTimestamp() });
        setForm({ title: "", content: "" });
    }
    async function upvote(id) {
        const ref = doc(db, "feedback", id);
        await updateDoc(ref, { upvotes: increment(1) });
    }
    async function addComment(id, text) {
        const ref = doc(db, "feedback", id);
        await updateDoc(ref, { comments: arrayUnion({ text, userId, createdAt: new Date().toISOString() }) });
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 border border-gray-100">
                <Input className="mb-2" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                <textarea className="border rounded px-3 py-2 w-full mb-2" placeholder="Describe your feedback or feature request..." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required />
                <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Submit</Button>
            </form>
            <div className="space-y-4">
                {feedbacks.length === 0 && <div className="text-gray-500">No feedback yet.</div>}
                {feedbacks.map(f => (
                    <div key={f.id} className="bg-white p-4 rounded shadow border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">{f.title}</h3>
                                <div className="text-xs text-gray-500">by {f.userId}</div>
                            </div>
                            <Button variant="ghost" className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-2 py-1" onClick={() => upvote(f.id)}>▲ {f.upvotes}</Button>
                        </div>
                        <div className="mt-2 text-gray-700">{f.content}</div>
                        <div>
                            <h4 className="font-medium mb-1">Comments</h4>
                            <ul className="space-y-2">
                                {f.comments?.map((c, idx) => (<li key={idx} className="bg-gray-50 p-2 rounded"><span className="font-mono text-xs">{c.userId}</span>: {c.text}</li>))}
                            </ul>
                            <AddReplyForm onSubmit={text => addComment(f.id, text)} />
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
            <Input className="flex-1" placeholder="Write a comment..." value={text} onChange={e => setText(e.target.value)} />
            <Button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Comment</Button>
        </form>
    );
} 