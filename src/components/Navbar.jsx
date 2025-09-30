import React, { useState, useEffect } from "react";
import { Menu, X, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Planning", path: "/planning" },
    { name: "Community", path: "/community" },
    { name: "Compare", path: "/comparison" },
    { name: "Calculators", path: "/calculators" },
];

export default function Navbar({ onLogin, onSignup, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
        <header className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300",
            scrolled
                ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200"
                : "bg-white/80 backdrop-blur-lg shadow-sm"
        )}>
            <nav className="mx-auto max-w-7xl h-20 flex items-center justify-between px-4 sm:px-6 py-0">
                <div className="flex items-center gap-2 h-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 h-full">
                        <div className="relative flex items-center h-full">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg flex items-center justify-center">
                                <TrendingUp size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center h-12">
                            <span className="text-2xl font-display font-bold text-blue-600 tracking-tight leading-none">FinFlow</span>
                            <span className="text-xs text-gray-600 font-medium leading-none">Smart Finance</span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-4 items-center h-full">
                    {navLinks.map(link => (
                        <Link key={link.path} to={link.path} className="relative">
                            <Button
                                variant={location.pathname === link.path ? "default" : "ghost"}
                                className="relative font-medium text-base h-10 flex items-center"
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                                )}
                            </Button>
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex gap-2 items-center h-full ml-2">
                    <Button
                        onClick={onLogin}
                        className="font-semibold h-10 flex items-center px-6 bg-blue-600 text-white hover:bg-blue-700 border-none shadow-none"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={onSignup}
                        className="h-10 flex items-center px-6 bg-blue-600 text-white hover:bg-blue-700 border-none shadow-none"
                    >
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2 h-full">
                    <Button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle menu"
                        className="h-10 w-10 flex items-center justify-center text-gray-700"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>
            </nav>
        </header>

        {/* Mobile Menu Overlay */}
        <div
            className={cn(
                "fixed inset-0 z-[60] bg-white transition-opacity duration-300 md:hidden",
                isMobileMenuOpen ? "block" : "hidden"
            )}
        >
            <div className="flex flex-col h-full w-full max-w-full overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                            <TrendingUp size={20} className="text-white" />
                        </div>
                        <span className="text-xl font-display font-bold text-blue-600">FinFlow</span>
                    </div>
                    <Button
                        onClick={() => setIsMobileMenuOpen(false)}
                        variant="ghost"
                        size="icon"
                    >
                        <X size={24} />
                    </Button>
                </div>
                <div className="flex flex-col gap-4 mb-8">
                    {navLinks.map(link => (
                        <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)}>
                            <Button
                                variant={location.pathname === link.path ? "default" : "ghost"}
                                className="w-full justify-start font-medium text-lg py-4"
                            >
                                {link.name}
                            </Button>
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                    <Button
                        onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}
                        className="w-full font-semibold h-12 flex items-center px-6 bg-blue-600 text-white hover:bg-blue-700 border-none shadow-none text-lg"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => { onSignup(); setIsMobileMenuOpen(false); }}
                        className="w-full h-12 flex items-center px-6 bg-blue-600 text-white hover:bg-blue-700 border-none shadow-none text-lg"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
        </>
    );
} 