import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, doc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

const db = getFirestore();

const DEMO_EVENTS = [
    {
        id: "demo1",
        title: "Webinar: Financial Planning 101",
        date: "2024-08-01",
        time: "18:00",
        description: "Join our free webinar on the basics of financial planning.",
        link: "https://meet.example.com/finance101",
        userId: "demo-user",
        rsvps: ["demo-user"],
        createdAt: new Date()
    },
    {
        id: "demo2",
        title: "Community Meetup",
        date: "2024-08-15",
        time: "17:00",
        description: "Meet fellow finance enthusiasts in your city!",
        link: "https://meet.example.com/meetup",
        userId: "demo-user2",
        rsvps: [],
        createdAt: new Date()
    }
];

export default function Events() {
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ title: "", date: "", time: "", description: "", link: "" });
    const [userId] = useState(() => localStorage.getItem("eventsUserId") || (() => { const id = "user-" + Math.random().toString(36).slice(2, 10); localStorage.setItem("eventsUserId", id); return id; })());

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "events"), (snap) => {
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setEvents([...DEMO_EVENTS, ...data]);
        });
        return () => unsub();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await addDoc(collection(db, "events"), { ...form, userId, rsvps: [], createdAt: serverTimestamp() });
        setForm({ title: "", date: "", time: "", description: "", link: "" });
    }
    async function rsvp(id) {
        const ref = doc(db, "events", id);
        await updateDoc(ref, { rsvps: arrayUnion(userId) });
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-2 mb-2">
                    <Input className="flex-1" placeholder="Event Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                    <Input className="w-32" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
                    <Input className="w-32" type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} required />
                </div>
                <Input className="mb-2" placeholder="Event Link" value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} required />
                <textarea className="border rounded px-3 py-2 w-full mb-2" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
                <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Event</Button>
            </form>
            <div className="space-y-4">
                {events.map(e => (
                    <div key={e.id} className="bg-white p-4 rounded shadow border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">{e.title}</h3>
                                <div className="text-xs text-gray-500">{e.date} {e.time} • by {e.userId}</div>
                            </div>
                            <a href={e.link} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-3 py-1 rounded">Join</a>
                        </div>
                        <div className="mt-2 text-gray-700">{e.description}</div>
                        <Button className="mt-2 bg-green-500 text-white px-3 py-1 rounded" onClick={() => rsvp(e.id)}>RSVP ({e.rsvps?.length || 0})</Button>
                    </div>
                ))}
            </div>
        </div>
    );
} 