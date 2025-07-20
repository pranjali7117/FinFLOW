import React, { Suspense, useState } from "react";
import { Tabs, Tab } from "../ui/tabs";
import { cn } from "../../lib/utils";

const Forum = React.lazy(() => import("./Forum"));
const Stories = React.lazy(() => import("./Stories"));
const Challenges = React.lazy(() => import("./Challenges"));
const QnA = React.lazy(() => import("./QnA"));
const Resources = React.lazy(() => import("./Resources"));
const Events = React.lazy(() => import("./Events"));
const Feedback = React.lazy(() => import("./Feedback"));
const Groups = React.lazy(() => import("./Groups"));

const tabs = [
    { label: "Forum", component: Forum },
    { label: "Stories", component: Stories },
    { label: "Challenges", component: Challenges },
    { label: "Q&A", component: QnA },
    { label: "Resources", component: Resources },
    { label: "Events", component: Events },
    { label: "Feedback", component: Feedback },
    { label: "Groups", component: Groups },
];

export default function Community() {
    const [activeTab, setActiveTab] = useState(0);
    const ActiveComponent = tabs[activeTab].component;
    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-8 font-display">Community</h1>
            <Tabs value={activeTab} onChange={setActiveTab} className="mb-8" aria-label="Community Sections">
                {tabs.map((tab, idx) => (
                    <Tab key={tab.label} value={idx} className="">
                        {tab.label}
                    </Tab>
                ))}
            </Tabs>
            <div className="h-6" /> {/* Extra spacing between tabs and content */}
            <div className="bg-white rounded-lg shadow-lg p-6 min-h-[400px] animate-fadein">
                <Suspense fallback={<div className="text-center py-10 text-blue-600 font-semibold">Loading...</div>}>
                    <ActiveComponent />
                </Suspense>
            </div>
        </section>
    );
} 