import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { PiggyBank, Target, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const planningOptions = [
    {
        key: "budget",
        title: "Budget Planner",
        description: "Allocate your income to expenses, savings, and investments.",
        icon: <PiggyBank className="text-blue-600" size={32} />,
        path: "/planning/budget"
    },
    {
        key: "savings-goal",
        title: "Savings Goal Calculator",
        description: "How much to save per month to reach a goal.",
        icon: <Target className="text-green-600" size={32} />,
        path: "/planning/savings-goal"
    },
    {
        key: "emergency-fund",
        title: "Emergency Fund Calculator",
        description: "How much you need for 3/6/12 months of expenses.",
        icon: <Shield className="text-red-600" size={32} />,
        path: "/planning/emergency-fund"
    }
];

export default function Planning() {
    const navigate = useNavigate();
    return (
        <section className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full border border-emerald-200 mb-6">
                    <PiggyBank size={16} className="text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">Planning Tools</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                    Plan Your
                    <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                        Financial Success
                    </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Choose a planning tool to get started.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {planningOptions.map(option => (
                    <Card
                        key={option.key}
                        className="cursor-pointer hover:shadow-2xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-gray-50 group relative overflow-hidden"
                        onClick={() => navigate(option.path)}
                    >
                        <CardHeader className="flex flex-col items-start gap-2 z-10 relative">
                            <div className="mb-2">{option.icon}</div>
                            <CardTitle className="text-lg font-bold text-blue-700 mb-1 group-hover:text-blue-800 transition-colors">
                                {option.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="z-10 relative">
                            <p className="text-gray-600 mb-2 text-sm min-h-[48px]">{option.description}</p>
                            <span className="text-blue-600 font-medium group-hover:underline">Open Tool →</span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
} 