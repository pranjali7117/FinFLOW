import React from "react";
import {
    TrendingUp,
    Mail,
    Phone,
    MapPin,
    Twitter,
    Linkedin,
    Facebook,
    Instagram,
    ArrowRight,
    Shield,
    Zap,
    Users,
    Heart
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const footerLinks = {
    product: [
        { name: "Dashboard", href: "#" },
        { name: "Portfolio Tracking", href: "#" },
        { name: "Investment Planning", href: "#" },
        { name: "Budgeting Tools", href: "#" },
        { name: "Financial Calculators", href: "#" },
        { name: "Comparison Tools", href: "#" },
    ],
    resources: [
        { name: "Help Center", href: "#" },
        { name: "Educational Content", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "Community Forum", href: "#" },
        { name: "API Documentation", href: "#" },
        { name: "Status Page", href: "#" },
    ],
    company: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press Kit", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Blog", href: "#" },
    ],
    legal: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "GDPR", href: "#" },
        { name: "Security", href: "#" },
        { name: "Compliance", href: "#" },
    ],
};

const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
];

const contactInfo = [
    { icon: Mail, text: "support@finflow.com", href: "mailto:support@finflow.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#" },
];

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg flex items-center justify-center">
                                <TrendingUp size={24} className="text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-display font-bold text-white tracking-tight">FinFlow</span>
                                <span className="text-xs text-gray-300 font-medium">Smart Finance</span>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Empowering individuals to take control of their financial future with intelligent tools,
                            personalized insights, and a supportive community.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            {contactInfo.map((contact, idx) => (
                                <a
                                    key={idx}
                                    href={contact.href}
                                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                                >
                                    <contact.icon size={16} />
                                    <span className="text-sm">{contact.text}</span>
                                </a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
                                    aria-label={social.name}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link, idx) => (
                                <li key={idx}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Resources</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link, idx) => (
                                <li key={idx}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, idx) => (
                                <li key={idx}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, idx) => (
                                <li key={idx}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-gray-700 pt-12 mb-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-display font-bold text-white mb-4">
                            Stay Updated with Financial Insights
                        </h3>
                        <p className="text-gray-300 mb-6">
                            Get the latest financial tips, market updates, and exclusive content delivered to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl">
                                Subscribe
                                <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="border-t border-gray-700 pt-12 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex items-center justify-center gap-3">
                            <Shield size={20} className="text-emerald-400" />
                            <div className="text-left">
                                <div className="font-semibold text-white">Bank-Level Security</div>
                                <div className="text-sm text-gray-300">256-bit encryption</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Zap size={20} className="text-emerald-400" />
                            <div className="text-left">
                                <div className="font-semibold text-white">99.9% Uptime</div>
                                <div className="text-sm text-gray-300">Reliable service</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Users size={20} className="text-emerald-400" />
                            <div className="text-left">
                                <div className="font-semibold text-white">50K+ Users</div>
                                <div className="text-sm text-gray-300">Trusted worldwide</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-300">
                            © 2024 FinFlow. All rights reserved.
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                            <span>Made with</span>
                            <Heart size={14} className="text-red-400 fill-current" />
                            <span>for financial freedom</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 