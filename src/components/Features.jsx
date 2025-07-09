import React from "react";
import { LayoutDashboard, Briefcase, Users, Handshake, Calculator, BookOpen } from "lucide-react";

const features = [
    {
        icon: <LayoutDashboard size={48} className="text-indigo-600" />,
        title: "Personalized Dashboard",
        description: "Get a holistic view of all your accounts, track net worth, and analyze spending.",
    },
    {
        icon: <Briefcase size={48} className="text-indigo-600" />,
        title: "Smart Planning Tools",
        description: "Plan for retirement, manage debt, and allocate investments with intelligent calculators.",
    },
    {
        icon: <Users size={48} className="text-indigo-600" />,
        title: "Vibrant Community Forum",
        description: "Connect with peers, ask experts, share success stories, and join group challenges.",
    },
    {
        icon: <Handshake size={48} className="text-indigo-600" />,
        title: "Comparison Tools",
        description: "Compare credit cards, mortgages, insurance, and investment accounts with ease.",
    },
    {
        icon: <Calculator size={48} className="text-indigo-600" />,
        title: "Financial Calculators",
        description: "Quickly calculate compound interest, loans, inflation, and estimate taxes.",
    },
    {
        icon: <BookOpen size={48} className="text-indigo-600" />,
        title: "Rich Education Resources",
        description: "Access articles, videos, webinars, and interactive courses to boost your financial IQ.",
    },
];

export default function Features() {
    return (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
                Powerful Features Designed For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center cursor-pointer hover:shadow-xl hover:border-indigo-300 transition duration-300 transform hover:-translate-y-2"
                    >
                        <div className="flex justify-center mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
} 