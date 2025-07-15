import React from "react";
import {
    LayoutDashboard,
    Handshake,
    TrendingUp,
    Shield,
    Zap,
    Users,
    BookOpen,
    Calculator,
    ArrowRight,
    Sparkles,
    CheckCircle,
    Star
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "../lib/utils";
// Add Framer Motion imports
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const features = [
    {
        icon: <LayoutDashboard size={48} className="text-blue-600" />,
        title: "Personalized Dashboard",
        description: "Get a holistic view of all your accounts, track net worth, and analyze spending patterns with AI-powered insights.",
        benefits: ["Real-time portfolio tracking", "Customizable widgets", "Smart notifications"]
    },
    {
        icon: <Handshake size={48} className="text-blue-600" />,
        title: "Comparison Tools",
        description: "Compare credit cards, mortgages, insurance, and investment accounts with detailed analysis and recommendations.",
        benefits: ["Side-by-side comparisons", "Expert recommendations", "Cost analysis"]
    },
    {
        icon: <TrendingUp size={48} className="text-blue-600" />,
        title: "Investment Planning",
        description: "Build and optimize your investment portfolio with advanced analytics, risk assessment, and rebalancing tools.",
        benefits: ["Portfolio optimization", "Risk assessment", "Auto-rebalancing"]
    },
    {
        icon: <Shield size={48} className="text-blue-600" />,
        title: "Security & Privacy",
        description: "Bank-level security with end-to-end encryption, multi-factor authentication, and regular security audits.",
        benefits: ["256-bit encryption", "Multi-factor auth", "Regular audits"]
    },
    {
        icon: <Zap size={48} className="text-blue-600" />,
        title: "AI-Powered Insights",
        description: "Get personalized financial advice, spending analysis, and investment recommendations powered by advanced AI.",
        benefits: ["Smart recommendations", "Predictive analytics", "Behavioral insights"]
    },
    {
        icon: <Users size={48} className="text-blue-600" />,
        title: "Community & Education",
        description: "Join a community of like-minded investors, access educational content, and learn from financial experts.",
        benefits: ["Expert webinars", "Community forums", "Learning paths"]
    }
];

const stats = [
    { value: "50+", label: "Features Available" },
    { value: "24/7", label: "Customer Support" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "4.9★", label: "User Rating" }
];

export default function Features() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* Section Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full border border-blue-200 mb-6">
                    <Sparkles size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Powerful Features</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                    Everything You Need to
                    <span className="block bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                        Master Your Finances
                    </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    From basic budgeting to advanced investment strategies, we provide all the tools and insights you need to achieve your financial goals.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {features.map((feature, idx) => {
                    // Add scroll animation for each card
                    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
                    const controls = useAnimation();
                    React.useEffect(() => {
                        if (inView) {
                            controls.start({
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.7, delay: idx * 0.12, ease: "easeOut" }
                            });
                        }
                    }, [controls, inView, idx]);
                    return (
                        <motion.div
                            key={idx}
                            ref={ref}
                            initial={{ opacity: 0, y: 40 }}
                            animate={controls}
                        >
                            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <div className="flex justify-center mb-4">
                                        <div className="p-4 rounded-2xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <div className="space-y-2 mb-6">
                                        {feature.benefits.map((benefit, benefitIdx) => (
                                            <div key={benefitIdx} className="flex items-center gap-2 text-sm text-gray-600">
                                                <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
                                                <span>{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all duration-300">
                                        <span>Learn more</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Stats Section */}
            <div className="text-center mb-16">
                <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-emerald-50">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-3xl md:text-4xl font-mono font-bold text-blue-600 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom CTA */}
            <div className="text-center">
                <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-emerald-50">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-display font-bold text-gray-900">
                                    Ready to Transform Your Financial Life?
                                </h3>
                                <p className="text-gray-600">
                                    Join thousands of users who have already taken control of their finances with FinFlow.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white"></div>
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <div className="font-semibold">Join 50K+ users</div>
                                        <div>who trust FinFlow</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 justify-center">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl">
                                    Start Free Trial
                                    <ArrowRight size={20} className="ml-2" />
                                </Button>
                                <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                                    Schedule Demo
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
} 