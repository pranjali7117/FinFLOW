import React, { useState, useEffect } from "react";
import {
    Quote,
    Star,
    ArrowLeft,
    ArrowRight,
    TrendingUp,
    DollarSign,
    Shield,
    Users
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";

const testimonials = [
    {
        author: "Sarah Chen",
        role: "Software Engineer",
        company: "TechCorp",
        content: "FinFlow completely transformed how I manage my finances. The AI insights helped me save 30% more than I was before, and the community support is incredible. I've learned so much about investing!",
        rating: 5,
        category: "Investment",
        avatar: "SC",
        improvement: "+$15,000",
        timeframe: "6 months"
    },
    {
        author: "Michael Rodriguez",
        role: "Small Business Owner",
        company: "Local Cafe",
        content: "As a business owner, I needed better financial tracking. FinFlow's dashboard gives me a clear picture of both personal and business finances. The comparison tools helped me choose the best business credit card.",
        rating: 5,
        category: "Business",
        avatar: "MR",
        improvement: "+$8,500",
        timeframe: "3 months"
    },
    {
        author: "Emily Johnson",
        role: "Marketing Manager",
        company: "Digital Agency",
        content: "The educational content is gold! I went from knowing nothing about investing to confidently managing my portfolio. The step-by-step guides and expert webinars are exactly what I needed.",
        rating: 5,
        category: "Education",
        avatar: "EJ",
        improvement: "+$12,000",
        timeframe: "1 year"
    },
    {
        author: "David Kim",
        role: "Financial Analyst",
        company: "Investment Bank",
        content: "Even as someone who works in finance, I find FinFlow's tools incredibly valuable. The portfolio optimization features and risk assessment tools are professional-grade. Highly recommend!",
        rating: 5,
        category: "Professional",
        avatar: "DK",
        improvement: "+$25,000",
        timeframe: "8 months"
    }
];

const stats = [
    { icon: TrendingUp, value: "4.9★", label: "Average Rating", color: "text-emerald-600" },
    { icon: Users, value: "50K+", label: "Active Users", color: "text-blue-600" },
    { icon: DollarSign, value: "$2.1B", label: "Assets Tracked", color: "text-amber-600" },
    { icon: Shield, value: "99.9%", label: "Uptime", color: "text-emerald-600" }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
    };

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* Section Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full border border-emerald-200 mb-6">
                    <Star size={16} className="text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">Customer Stories</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                    Loved by
                    <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                        Thousands of Users
                    </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    See how FinFlow has helped real people achieve their financial goals and build wealth for their future.
                </p>
            </div>

            {/* Main Testimonial */}
            <div className="max-w-4xl mx-auto mb-16">
                <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm">
                    <CardContent className="p-0">
                        <div className="relative p-8 md:p-12">
                            {/* Quote Icon */}
                            <div className="absolute top-4 right-4 text-blue-200 group-hover:text-blue-300 transition-colors duration-300">
                                <Quote size={24} />
                            </div>

                            {/* Testimonial Content */}
                            <div className="text-center mb-8">
                                <p className="text-lg md:text-xl text-gray-900 leading-relaxed mb-6 italic">
                                    "{testimonials[currentIndex].content}"
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center justify-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-semibold">
                                        {testimonials[currentIndex].avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-lg text-gray-900">{testimonials[currentIndex].author}</div>
                                        <div className="text-gray-600">{testimonials[currentIndex].role}</div>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center justify-center gap-1 mb-4">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} size={16} className="text-amber-500 fill-current" />
                                    ))}
                                </div>

                                {/* Improvement Stats */}
                                <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full border border-emerald-200">
                                    <div className="text-center">
                                        <div className="text-lg font-mono font-bold text-emerald-600">
                                            {testimonials[currentIndex].improvement}
                                        </div>
                                        <div className="text-xs text-gray-600">Portfolio Growth</div>
                                    </div>
                                    <div className="w-px h-8 bg-gray-300"></div>
                                    <div className="text-center">
                                        <div className="text-lg font-mono font-bold text-blue-600">
                                            {testimonials[currentIndex].timeframe}
                                        </div>
                                        <div className="text-xs text-gray-600">Time Period</div>
                                    </div>
                                </div>
                            </div>

                            {/* Category Badge */}
                            <div className="absolute bottom-4 right-4">
                                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                                    {testimonials[currentIndex].category}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mb-16">
                <Button
                    onClick={prevTestimonial}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                >
                    <ArrowLeft size={16} />
                </Button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setCurrentIndex(idx); setIsAutoPlaying(false); }}
                            className={cn(
                                "w-3 h-3 rounded-full transition-all duration-200",
                                idx === currentIndex
                                    ? "bg-blue-600"
                                    : "bg-gray-300 hover:bg-gray-400"
                            )}
                        />
                    ))}
                </div>

                <Button
                    onClick={nextTestimonial}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                >
                    <ArrowRight size={16} />
                </Button>
            </div>

            {/* Stats Section */}
            <div className="text-center">
                <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-emerald-50">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="flex justify-center mb-3">
                                        <div className="p-3 rounded-full bg-gray-100">
                                            <stat.icon size={24} className={stat.color} />
                                        </div>
                                    </div>
                                    <div className="text-2xl md:text-3xl font-mono font-bold text-gray-900 mb-2">
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
        </section>
    );
} 