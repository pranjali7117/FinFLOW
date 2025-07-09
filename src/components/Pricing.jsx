import React from "react";
import { ShieldCheck } from "lucide-react";

const plans = [
    {
        plan: "Free Tier",
        price: "$0",
        period: "/month",
        features: [
            "Basic Budgeting",
            "Net Worth Tracking",
            "Limited Articles & Guides",
            "Community Forum Access",
            "Basic Calculators",
        ],
        isPrimary: false,
        buttonText: "Get Started Free",
    },
    {
        plan: "Premium",
        price: "$9.99",
        period: "/month",
        features: [
            "All Free Tier Features",
            "Advanced Budgeting Tools",
            "Detailed Spending Analysis",
            "Full Education Library",
            "All Planning Tools",
            "Expert Q&A Sessions",
        ],
        isPrimary: true,
        buttonText: "Start 7-Day Free Trial",
    },
    {
        plan: "Pro",
        price: "$19.99",
        period: "/month",
        features: [
            "All Premium Features",
            "Account Aggregation (Beta)",
            "Personalized Financial Coaching (add-on)",
            "Priority Support",
            "Exclusive Webinars",
            "Group Challenges",
        ],
        isPrimary: false,
        buttonText: "Upgrade to Pro",
    },
];

export default function Pricing() {
    return (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
                Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className={`bg-white p-8 rounded-xl shadow-lg border ${plan.isPrimary ? "border-indigo-500 ring-4 ring-indigo-200" : "border-gray-200"} flex flex-col items-center text-center transform hover:scale-105 transition duration-300`}
                    >
                        <h3 className={`text-2xl font-bold mb-2 ${plan.isPrimary ? "text-indigo-700" : "text-gray-900"}`}>{plan.plan}</h3>
                        <p className="text-5xl font-extrabold text-gray-900 mb-4">
                            {plan.price}<span className="text-xl font-medium text-gray-500">{plan.period}</span>
                        </p>
                        <ul className="text-gray-700 space-y-2 mb-8 text-left w-full">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <ShieldCheck size={20} className="text-green-500 mr-2 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            className={`mt-auto w-full px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300
                ${plan.isPrimary
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : 'bg-gray-100 text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                                }`}
                            onClick={() => alert(`${plan.buttonText} coming soon!`)}
                        >
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
} 