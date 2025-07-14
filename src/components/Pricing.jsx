import React, { useState } from "react";
import {
    Crown,
    CheckCircle,
    XCircle,
    ArrowRight,
    Star,
    ShieldCheck,
    Zap,
    Users,
    BookOpen,
    TrendingUp
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "../lib/utils";

const plans = [
    {
        plan: "Free",
        price: "$0",
        period: "/month",
        description: "Perfect for getting started",
        features: [
            { text: "Basic Portfolio Tracking", included: true },
            { text: "Educational Resources", included: true },
            { text: "Community Access", included: true },
            { text: "Basic Calculators", included: true },
            { text: "Email Support", included: true },
            { text: "Advanced Analytics", included: false },
            { text: "Priority Support", included: false },
        ],
        isPrimary: false,
        buttonText: "Get Started Free",
        popular: false,
        savings: null,
        icon: <BookOpen size={24} className="text-gray-600" />
    },
    {
        plan: "Premium",
        price: "$9.99",
        period: "/month",
        description: "For serious investors",
        features: [
            { text: "All Free Tier Features", included: true },
            { text: "Advanced Budgeting Tools", included: true },
            { text: "Detailed Spending Analysis", included: true },
            { text: "Full Education Library", included: true },
            { text: "All Planning Tools", included: true },
            { text: "Expert Q&A Sessions", included: true },
            { text: "Priority Support", included: true },
        ],
        isPrimary: true,
        buttonText: "Start 7-Day Free Trial",
        popular: true,
        savings: "Save 20% yearly",
        icon: <TrendingUp size={24} className="text-blue-600" />
    },
    {
        plan: "Pro",
        price: "$19.99",
        period: "/month",
        description: "For professionals and advanced users",
        features: [
            { text: "All Premium Features", included: true },
            { text: "Account Aggregation (Beta)", included: true },
            { text: "Personalized Financial Coaching", included: true },
            { text: "Priority Support", included: true },
            { text: "Exclusive Webinars", included: true },
            { text: "Group Challenges", included: true },
            { text: "API Access", included: true },
        ],
        isPrimary: false,
        buttonText: "Upgrade to Pro",
        popular: false,
        savings: "Save 30% yearly",
        icon: <Crown size={24} className="text-amber-600" />
    },
];

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState('monthly');

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* Section Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full border border-amber-200 mb-6">
                    <Crown size={16} className="text-amber-600" />
                    <span className="text-sm font-medium text-amber-700">Pricing Plans</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                    Choose Your
                    <span className="block bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                        Financial Journey
                    </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                    Start free and upgrade as you grow. All plans include our core features with no hidden fees.
                </p>

                {/* Billing Toggle */}
                <div className="inline-flex items-center gap-4 p-1 bg-gray-100 rounded-xl">
                    <Button
                        onClick={() => setBillingCycle('monthly')}
                        variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                        size="sm"
                        className="rounded-lg"
                    >
                        Monthly
                    </Button>
                    <Button
                        onClick={() => setBillingCycle('yearly')}
                        variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                        size="sm"
                        className="rounded-lg"
                    >
                        Yearly
                        <span className="ml-2 px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full">Save 20%</span>
                    </Button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {plans.map((plan, idx) => (
                    <div key={idx} className="relative group">
                        {/* Popular Badge */}
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-lg">
                                    <Star size={14} />
                                    <span className="text-sm font-semibold">Most Popular</span>
                                </div>
                            </div>
                        )}

                        {/* Card */}
                        <Card className={cn(
                            "relative h-full transition-all duration-500",
                            plan.popular
                                ? "md:-mt-4 md:mb-4 border-2 border-amber-200 shadow-xl"
                                : "hover:shadow-lg"
                        )}>
                            {/* Background Gradient */}
                            {plan.popular && (
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-emerald-50 opacity-50 rounded-lg"></div>
                            )}

                            <CardHeader className="relative">
                                <div className="text-center mb-6">
                                    <div className="flex justify-center mb-4">
                                        <div className={cn(
                                            "p-3 rounded-full",
                                            plan.popular ? "bg-amber-100" : "bg-gray-100"
                                        )}>
                                            {plan.icon}
                                        </div>
                                    </div>
                                    <CardTitle className={cn(
                                        "text-2xl font-display font-bold mb-2",
                                        plan.popular ? "text-amber-700" : "text-gray-900"
                                    )}>
                                        {plan.plan}
                                    </CardTitle>
                                    <p className="text-gray-600 mb-6">{plan.description}</p>

                                    {/* Price */}
                                    <div className="mb-4">
                                        <div className="flex items-baseline justify-center gap-2">
                                            <span className="text-5xl font-mono font-bold text-gray-900">
                                                {billingCycle === 'yearly' && plan.price !== '$0'
                                                    ? `$${(parseFloat(plan.price.replace('$', '')) * 0.8).toFixed(2)}`
                                                    : plan.price
                                                }
                                            </span>
                                            <span className="text-xl text-gray-600">{plan.period}</span>
                                        </div>
                                        {plan.savings && billingCycle === 'yearly' && (
                                            <div className="text-sm text-emerald-600 font-medium mt-2">
                                                {plan.savings}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="relative">
                                {/* Features */}
                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            {feature.included ? (
                                                <CheckCircle size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                                            ) : (
                                                <XCircle size={20} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                            )}
                                            <span className={cn(
                                                "text-sm",
                                                feature.included ? "text-gray-900" : "text-gray-500"
                                            )}>
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <Button
                                    className={cn(
                                        "w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group",
                                        plan.popular
                                            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                    )}
                                    onClick={() => alert(`${plan.buttonText} coming soon!`)}
                                >
                                    {plan.buttonText}
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center">
                <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-emerald-50">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={24} className="text-emerald-600" />
                                <div className="text-left">
                                    <div className="font-semibold text-gray-900">30-Day Money Back</div>
                                    <div className="text-sm text-gray-600">No questions asked</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Zap size={24} className="text-emerald-600" />
                                <div className="text-left">
                                    <div className="font-semibold text-gray-900">Cancel Anytime</div>
                                    <div className="text-sm text-gray-600">No long-term contracts</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={24} className="text-emerald-600" />
                                <div className="text-left">
                                    <div className="font-semibold text-gray-900">Bank-Level Security</div>
                                    <div className="text-sm text-gray-600">256-bit encryption</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
} 