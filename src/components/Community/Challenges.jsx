import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, doc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

const db = getFirestore();

const DEMO_CHALLENGES = [
    {
        id: "demo1",
        title: "July Savings Challenge",
        description: "Save at least ₹5,000 this month. Track your progress!",
        type: "Savings",
        goal: "5000",
        userId: "demo-user",
        participants: [
            { userId: "demo-user", progress: 2000 },
            { userId: "demo-user2", progress: 3500 }
        ],
        createdAt: new Date()
    },
    {
        id: "demo2",
        title: "Investment Starter",
        description: "Invest ₹1,000 in any asset this month.",
        type: "Investment",
        goal: "1000",
        userId: "demo-user2",
        participants: [],
        createdAt: new Date()
    }
];

export default function Challenges() {
    const [challenges, setChallenges] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", type: "Savings", goal: "" });
    const [userId] = useState(() => localStorage.getItem("challengesUserId") || (() => { const id = "user-" + Math.random().toString(36).slice(2, 10); localStorage.setItem("challengesUserId", id); return id; })());

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "challenges"), (snap) => {
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setChallenges([...DEMO_CHALLENGES, ...data]);
        });
        return () => unsub();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await addDoc(collection(db, "challenges"), { ...form, userId, participants: [], createdAt: serverTimestamp() });
        setForm({ title: "", description: "", type: "Savings", goal: "" });
    }
    async function joinChallenge(id) {
        const ref = doc(db, "challenges", id);
        await updateDoc(ref, { participants: arrayUnion({ userId, progress: 0 }) });
    }
    async function updateProgress(id, progress) {
        const ref = doc(db, "challenges", id);
        const challenge = challenges.find((c) => c.id === id);
        if (!challenge) return;
        const participants = challenge.participants.map((p) => p.userId === userId ? { ...p, progress } : p);
        await updateDoc(ref, { participants });
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-2 mb-2">
                    <Input className="flex-1" placeholder="Challenge Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                    <select className="border rounded px-3 py-2" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}><option>Savings</option><option>Investment</option></select>
                    <Input className="w-32" placeholder="Goal Amount" value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))} required type="number" min="1" />
                </div>
                <textarea className="border rounded px-3 py-2 w-full mb-2" placeholder="Challenge Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
                <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Create Challenge</Button>
            </form>
            <div className="space-y-4">
                {challenges.map(c => (
                    <div key={c.id} className="bg-white p-4 rounded shadow border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">{c.title}</h3>
                                <div className="text-xs text-gray-500">{c.type} • Goal: ₹{c.goal} • by {c.userId}</div>
                            </div>
                            <Button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => joinChallenge(c.id)}>{c.participants?.some(p => p.userId === userId) ? "Joined" : "Join"}</Button>
                        </div>
                        <div className="mt-2 text-gray-700">{c.description}</div>
                        <div className="mt-4">
                            <h4 className="font-medium mb-1">Leaderboard</h4>
                            <ul className="space-y-1">
                                {c.participants?.sort((a, b) => b.progress - a.progress).map((p, idx) => (
                                    <li key={idx} className="flex items-center gap-2"><span className="font-mono text-xs">{p.userId}</span><span>Progress: ₹{p.progress} / ₹{c.goal}</span>{p.userId === userId && (<Input className="w-24" type="number" min="0" max={c.goal} value={p.progress} onChange={e => updateProgress(c.id, Number(e.target.value))} />)}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 