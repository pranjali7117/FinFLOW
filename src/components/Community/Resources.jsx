import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, doc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

const db = getFirestore();

const DEMO_RESOURCES = [
    {
        id: "demo-resource-1",
        title: "Best Budgeting Apps",
        url: "https://www.example.com/budget-apps",
        description: "A curated list of top budgeting apps for 2024.",
        type: "Article",
        userId: "demo-user",
        ratings: [{ userId: "demo-user", rating: 5 }],
        createdAt: new Date()
    },
    {
        id: "demo-resource-2",
        title: "Investing 101 Video",
        url: "https://www.example.com/investing-101",
        description: "A beginner-friendly video on investing basics.",
        type: "Video",
        userId: "demo-user2",
        ratings: [{ userId: "demo-user2", rating: 4 }],
        createdAt: new Date()
    }
];

export default function Resources() {
    const [resources, setResources] = useState([]);
    const [form, setForm] = useState({ title: "", url: "", description: "", type: "Article" });
    const [userId] = useState(() => localStorage.getItem("resourcesUserId") || (() => { const id = "user-" + Math.random().toString(36).slice(2, 10); localStorage.setItem("resourcesUserId", id); return id; })());

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "resources"), (snap) => {
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            const merged = [...DEMO_RESOURCES, ...data];
            setResources(merged);
            console.log('Resources:', merged);
        });
        return () => unsub();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await addDoc(collection(db, "resources"), { ...form, userId, ratings: [], createdAt: serverTimestamp() });
        setForm({ title: "", url: "", description: "", type: "Article" });
    }
    async function rateResource(id, rating) {
        const ref = doc(db, "resources", id);
        await updateDoc(ref, { ratings: arrayUnion({ userId, rating }) });
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-2 mb-2">
                    <Input className="flex-1" placeholder="Resource Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                    <Input className="flex-1" placeholder="URL" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} required type="url" />
                    <select className="border rounded px-3 py-2" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}><option>Article</option><option>Video</option><option>Book</option><option>Tool</option></select>
                </div>
                <textarea className="border rounded px-3 py-2 w-full mb-2" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
                <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Share Resource</Button>
            </form>
            <div className="space-y-4">
                {resources.length === 0 && <div className="text-gray-500">No resources yet.</div>}
                {resources.map(r => (
                    <div key={r.id} className="bg-white p-4 rounded shadow border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-lg text-blue-700 hover:underline">{r.title}</a>
                                <div className="text-xs text-gray-500">{r.type} • by {r.userId}</div>
                            </div>
                            <div>
                                <span className="text-yellow-500">{(r.ratings?.reduce((a, b) => a + b.rating, 0) / (r.ratings?.length || 1)).toFixed(1)}</span>
                                <span className="text-xs text-gray-400 ml-1">({r.ratings?.length || 0} ratings)</span>
                            </div>
                        </div>
                        <div className="mt-2 text-gray-700">{r.description}</div>
                        <div className="mt-2 flex gap-1">{[1, 2, 3, 4, 5].map(n => (<button key={n} className="text-yellow-500" onClick={() => rateResource(r.id, n)}>★</button>))}</div>
                    </div>
                ))}
            </div>
        </div>
    );
} 