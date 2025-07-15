import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { Calculator, PiggyBank, TrendingUp, DollarSign, Shield, BarChart2, Target, Home, Users, Layers, PieChart, Briefcase, Coins } from "lucide-react";

const calculators = [
    {
        key: "emi",
        name: "Loan EMI Calculator",
        description: "Calculate your monthly loan payments and total interest.",
        icon: <Calculator className="w-8 h-8 text-blue-600" />,
    },
    {
        key: "sip",
        name: "SIP Calculator",
        description: "Estimate returns from regular investments.",
        icon: <TrendingUp className="w-8 h-8 text-emerald-600" />,
    },
    {
        key: "lumpsum",
        name: "Lump Sum Investment Calculator",
        description: "See how a one-time investment grows over time.",
        icon: <DollarSign className="w-8 h-8 text-amber-600" />,
    },
    {
        key: "compound",
        name: "Compound Interest Calculator",
        description: "Calculate compound interest for any amount.",
        icon: <BarChart2 className="w-8 h-8 text-purple-600" />,
    },
    {
        key: "retirement",
        name: "Retirement Calculator",
        description: "Plan your retirement savings and timeline.",
        icon: <Briefcase className="w-8 h-8 text-pink-600" />,
    },
    {
        key: "emergency",
        name: "Emergency Fund Calculator",
        description: "Find out how much you need for emergencies.",
        icon: <Shield className="w-8 h-8 text-red-600" />,
    },
    {
        key: "tax",
        name: "Income Tax Calculator",
        description: "Estimate your annual tax liability.",
        icon: <PieChart className="w-8 h-8 text-yellow-600" />,
    },
    {
        key: "networth",
        name: "Net Worth Calculator",
        description: "Calculate your total net worth.",
        icon: <Layers className="w-8 h-8 text-gray-600" />,
    },
    {
        key: "comparison",
        name: "Investment Comparison Calculator",
        description: "Compare returns of two investment options.",
        icon: <BarChart2 className="w-8 h-8 text-indigo-600" />,
    },
    {
        key: "savingsgoal",
        name: "Savings Goal Calculator",
        description: "Plan how much to save for your goals.",
        icon: <Target className="w-8 h-8 text-green-600" />,
    },
    {
        key: "rentbuy",
        name: "Rent vs Buy Calculator",
        description: "Compare the cost of renting vs buying a home.",
        icon: <Home className="w-8 h-8 text-blue-400" />,
    },
    {
        key: "community",
        name: "Community Challenge Calculator",
        description: "Group savings and investment challenges.",
        icon: <Users className="w-8 h-8 text-orange-600" />,
    },
    {
        key: "currency",
        name: "Currency Converter",
        description: "Convert between currencies in real time.",
        icon: <Coins className="w-8 h-8 text-teal-600" />,
    },
];

export default function Calculators() {
    const navigate = useNavigate();
    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">Financial Calculators</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Plan, compare, and optimize your finances with our suite of easy-to-use calculators. Select a calculator to get started.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {calculators.map((calc) => (
                    <Card
                        key={calc.key}
                        className="cursor-pointer hover:shadow-2xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-gray-50 group relative overflow-hidden"
                        onClick={() => navigate(`/calculators/${calc.key}`)}
                    >
                        <div className="absolute right-0 top-0 opacity-10 text-9xl pointer-events-none select-none">
                            {calc.icon}
                        </div>
                        <CardHeader className="flex flex-col items-start gap-2 z-10 relative">
                            <div className="mb-2">{calc.icon}</div>
                            <CardTitle className="text-lg font-bold text-blue-700 mb-1 group-hover:text-blue-800 transition-colors">
                                {calc.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="z-10 relative">
                            <p className="text-gray-600 mb-2 text-sm min-h-[48px]">{calc.description}</p>
                            <span className="text-blue-600 font-medium group-hover:underline">Open Calculator →</span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
} 