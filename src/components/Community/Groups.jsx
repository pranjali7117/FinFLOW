import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, doc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

const db = getFirestore();

const DEMO_GROUPS = [
    {
        id: "demo1",
        name: "Student Investors",
        description: "A group for students interested in learning about investing.",
        userId: "demo-user",
        members: ["demo-user", "demo-user2"],
        discussions: [
            { text: "Welcome to the group!", userId: "demo-user", createdAt: new Date().toISOString() }
        ],
        createdAt: new Date()
    },
    {
        id: "demo2",
        name: "Budgeting Enthusiasts",
        description: "Share your best budgeting tips and tricks!",
        userId: "demo-user2",
        members: ["demo-user2"],
        discussions: [],
        createdAt: new Date()
    }
];

export default function Groups() {
    const [groups, setGroups] = useState([]);
    const [form, setForm] = useState({ name: "", description: "" });
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [userId] = useState(() => localStorage.getItem("groupsUserId") || (() => { const id = "user-" + Math.random().toString(36).slice(2, 10); localStorage.setItem("groupsUserId", id); return id; })());

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "groups"), (snap) => {
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setGroups([...DEMO_GROUPS, ...data]);
        });
        return () => unsub();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await addDoc(collection(db, "groups"), { ...form, userId, members: [userId], discussions: [], createdAt: serverTimestamp() });
        setForm({ name: "", description: "" });
    }
    async function joinGroup(id) {
        const ref = doc(db, "groups", id);
        const group = groups.find((g) => g.id === id);
        if (!group) return;
        if (!group.members.includes(userId)) {
            await updateDoc(ref, { members: arrayUnion(userId) });
        }
        setSelectedGroup(id);
    }
    async function addDiscussion(id, text) {
        const ref = doc(db, "groups", id);
        await updateDoc(ref, { discussions: arrayUnion({ text, userId, createdAt: new Date().toISOString() }) });
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 border border-gray-100">
                <Input className="mb-2" placeholder="Group Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                <textarea className="border rounded px-3 py-2 w-full mb-2" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
                <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Create Group</Button>
            </form>
            <div className="space-y-4">
                {groups.map(g => (
                    <div key={g.id} className="bg-white p-4 rounded shadow border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">{g.name}</h3>
                                <div className="text-xs text-gray-500">by {g.userId} • {g.members?.length || 0} members</div>
                            </div>
                            <Button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => joinGroup(g.id)}>{g.members?.includes(userId) ? "Open" : "Join"}</Button>
                        </div>
                        <div className="mt-2 text-gray-700">{g.description}</div>
                        {selectedGroup === g.id && (
                            <div className="mt-4">
                                <h4 className="font-medium mb-1">Group Discussion</h4>
                                <ul className="space-y-2">
                                    {g.discussions?.map((d, idx) => (<li key={idx} className="bg-gray-50 p-2 rounded"><span className="font-mono text-xs">{d.userId}</span>: {d.text}</li>))}
                                </ul>
                                <AddReplyForm onSubmit={text => addDiscussion(g.id, text)} />
                            </div>
                        )}
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
            <Input className="flex-1" placeholder="Write a message..." value={text} onChange={e => setText(e.target.value)} />
            <Button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Send</Button>
        </form>
    );
} 