import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, doc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

const db = getFirestore();

const DEMO_STORIES = [
    {
        id: "demo1",
        title: "How I Saved My First $10,000",
        content: "I started by tracking my expenses and setting a monthly savings goal. It took discipline, but seeing my progress kept me motivated!",
        userId: "demo-user",
        comments: [
            { text: "Inspiring!", userId: "user-abc", createdAt: new Date().toISOString() }
        ],
        createdAt: new Date()
    },
    {
        id: "demo2",
        title: "Paid Off My Student Loans Early",
        content: "I used the snowball method and made extra payments whenever I could. It feels amazing to be debt-free!",
        userId: "demo-user2",
        comments: [],
        createdAt: new Date()
    }
];

export default function Stories() {
    const [stories, setStories] = useState([]);
    const [form, setForm] = useState({ title: "", content: "" });
    const [userId] = useState(() => localStorage.getItem("storiesUserId") || (() => { const id = "user-" + Math.random().toString(36).slice(2, 10); localStorage.setItem("storiesUserId", id); return id; })());

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "userStories"), (snap) => {
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setStories([...DEMO_STORIES, ...data]);
        });
        return () => unsub();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await addDoc(collection(db, "userStories"), { ...form, userId, comments: [], createdAt: serverTimestamp() });
        setForm({ title: "", content: "" });
    }
    async function addComment(storyId, text) {
        const ref = doc(db, "userStories", storyId);
        await updateDoc(ref, { comments: arrayUnion({ text, userId, createdAt: new Date().toISOString() }) });
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 border border-gray-100">
                <Input className="mb-2" placeholder="Story Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                <textarea className="border rounded px-3 py-2 w-full mb-2" placeholder="Share your journey..." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required />
                <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Submit Story</Button>
            </form>
            <div className="space-y-4">
                {stories.map(s => (
                    <div key={s.id} className="bg-white p-4 rounded shadow border border-gray-100">
                        <h3 className="font-semibold text-lg">{s.title}</h3>
                        <div className="text-xs text-gray-500 mb-2">by {s.userId}</div>
                        <div className="text-gray-700 mb-2 whitespace-pre-line">{s.content}</div>
                        <div>
                            <h4 className="font-medium mb-1">Comments</h4>
                            <ul className="space-y-2">
                                {s.comments?.map((c, idx) => (
                                    <li key={idx} className="bg-gray-50 p-2 rounded"><span className="font-mono text-xs">{c.userId}</span>: {c.text}</li>
                                ))}
                            </ul>
                            <AddReplyForm onSubmit={text => addComment(s.id, text)} />
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