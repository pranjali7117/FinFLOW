import React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@headlessui/react";

const navLinks = [
    { name: "Home", key: "home" },
    { name: "Education", key: "education" },
    { name: "Dashboard", key: "dashboard" },
    { name: "Planning", key: "planning" },
    { name: "Community", key: "community" },
    { name: "Compare", key: "comparison" },
    { name: "Calculators", key: "calculators" },
];

export default function Navbar({ currentPage, onNavigate, onLogin, onSignup, isMobileMenuOpen, setIsMobileMenuOpen }) {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg shadow-lg font-sans">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 transition-all duration-300">
                <div className="flex items-center gap-3">
                    {/* Modern SVG Logo */}
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-md">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="16" fill="#6366F1" />
                            <path d="M10 18L16 10L22 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <span className="text-3xl font-extrabold text-indigo-600 tracking-tight select-none">FinFlow</span>
                </div>
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map(link => (
                        <button
                            key={link.key}
                            onClick={() => onNavigate(link.key)}
                            className={`font-semibold text-lg px-3 py-1 rounded-full transition-colors duration-200 ${currentPage === link.key ? "text-indigo-700 bg-indigo-100 shadow-sm" : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"}`}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
                <div className="hidden md:flex gap-4 items-center">
                    <Button
                        onClick={onLogin}
                        className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-full font-semibold shadow-sm hover:bg-indigo-50 transition-all duration-200"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={onSignup}
                        className="bg-gradient-to-tr from-indigo-600 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-600 transition-all duration-200"
                    >
                        Sign Up
                    </Button>
                </div>
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </nav>
            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}></div>
            <div className={`fixed top-0 right-0 z-50 w-4/5 max-w-xs h-full bg-white shadow-2xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                <div className="flex flex-col gap-2 p-6 pt-8">
                    <div className="flex justify-end mb-4">
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-indigo-600">
                            <X size={28} />
                        </button>
                    </div>
                    {navLinks.map(link => (
                        <button
                            key={link.key}
                            onClick={() => { onNavigate(link.key); setIsMobileMenuOpen(false); }}
                            className={`w-full text-left px-4 py-3 rounded-full font-semibold text-lg transition-colors duration-200 ${currentPage === link.key ? "text-indigo-700 bg-indigo-100 shadow-sm" : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"}`}
                        >
                            {link.name}
                        </button>
                    ))}
                    <Button
                        onClick={onLogin}
                        className="mt-4 border border-indigo-600 text-indigo-600 px-6 py-2 rounded-full font-semibold shadow-sm hover:bg-indigo-50 transition-all duration-200"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={onSignup}
                        className="mt-2 bg-gradient-to-tr from-indigo-600 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-600 transition-all duration-200"
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        </header>
    );
} 