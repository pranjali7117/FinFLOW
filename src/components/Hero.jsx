import React, { useState, useEffect } from "react";
import {
    DollarSign,
    Users,
    TrendingUp,
    ArrowRight,
    Play,
    CheckCircle,
    Star,
    Shield,
    Zap
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";

const metrics = [
    { label: "Total Assets", value: "$2.1B", icon: DollarSign, color: "text-blue-600" },
    { label: "Active Users", value: "50K+", icon: Users, color: "text-emerald-600" },
    { label: "Portfolio Growth", value: "23.4%", icon: TrendingUp, color: "text-amber-600" },
];

const features = [
    { icon: Shield, text: "Bank-level security" },
    { icon: Zap, text: "Real-time updates" },
    { icon: CheckCircle, text: "No hidden fees" },
];

export default function Hero() {
    const [currentMetric, setCurrentMetric] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentMetric((prev) => (prev + 1) % metrics.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-amber-100 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-100 to-blue-100 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-100 to-emerald-100 rounded-full opacity-10 blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-20">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full border border-blue-200 mb-10">
                        <Star size={16} className="text-blue-600" />
                        <span className="text-sm font-medium">Trusted by 50K+ users worldwide</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className={cn(
                        "text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-10 leading-tight",
                        "transition-all duration-1000 ease-out",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        Master Your
                        <span className="block bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                            Financial Future
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className={cn(
                        "text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed",
                        "transition-all duration-1000 ease-out delay-200",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        The all-in-one platform that helps you track, analyze, and grow your wealth with AI-powered insights and personalized recommendations.
                    </p>

                    {/* CTA Buttons */}
                    <div className={cn(
                        "flex flex-col sm:flex-row gap-6 justify-center items-center mb-16",
                        "transition-all duration-1000 ease-out delay-400",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            Start Free Trial
                            <ArrowRight size={20} className="ml-2" />
                        </Button>
                        <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                            <Play size={20} className="mr-2" />
                            Watch Demo
                        </Button>
                    </div>

                    {/* Features */}
                    <div className={cn(
                        "flex flex-wrap justify-center gap-6 mb-12",
                        "transition-all duration-1000 ease-out delay-600",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-gray-600">
                                <feature.icon size={16} className="text-emerald-600" />
                                <span className="text-sm font-medium">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {metrics.map((metric, idx) => (
                        <Card key={idx} className={cn(
                            "text-center p-6 transition-all duration-500 cursor-pointer group hover:shadow-lg",
                            currentMetric === idx ? 'bg-blue-50 border-blue-200' : 'bg-white'
                        )} onClick={() => setCurrentMetric(idx)}>
                            <CardContent className="p-0">
                                <div className="flex justify-center mb-4">
                                    <div className={cn(
                                        "p-3 rounded-full transition-all duration-300",
                                        currentMetric === idx ? 'bg-blue-100' : 'bg-gray-100'
                                    )}>
                                        <metric.icon size={24} className={metric.color} />
                                    </div>
                                </div>
                                <div className="text-3xl font-mono font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform">
                                    {metric.value}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    {metric.label}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Interactive Preview */}
                <div className="max-w-4xl mx-auto">
                    <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                                {/* Left: Chart Preview */}
                                <div className="space-y-6">
                                    <div className="h-32 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-lg flex items-center justify-center">
                                        <div className="text-center">
                                            <TrendingUp size={32} className="text-blue-600 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">Interactive Charts</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-display font-bold text-gray-900">
                                            Real-time Portfolio Tracking
                                        </h3>
                                        <p className="text-gray-600">
                                            Monitor your investments with advanced analytics, AI-powered insights, and personalized recommendations.
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <CheckCircle size={16} className="text-emerald-600" />
                                            <span>Live market data</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <CheckCircle size={16} className="text-emerald-600" />
                                            <span>AI-powered insights</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Stats Preview */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-100 rounded-lg p-4 text-center">
                                            <div className="text-2xl font-mono font-bold text-gray-900">$12,450</div>
                                            <div className="text-xs text-gray-600">Total Value</div>
                                        </div>
                                        <div className="bg-gray-100 rounded-lg p-4 text-center">
                                            <div className="text-2xl font-mono font-bold text-emerald-600">+8.2%</div>
                                            <div className="text-xs text-gray-600">This Month</div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-900">Risk Score</span>
                                            <span className="text-sm text-gray-600">Low</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                                        Explore Dashboard
                                        <ArrowRight size={16} className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
} 