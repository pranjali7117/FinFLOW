import React from "react";

export default function Hero({ onCTAClick }) {
    return (
        <section className="relative bg-gradient-to-tr from-indigo-600 to-purple-700 text-white py-28 px-6 md:px-10 overflow-hidden rounded-b-3xl shadow-2xl font-sans">
            {/* Decorative SVG background shape */}
            <svg className="absolute left-1/2 top-0 -translate-x-1/2 -z-1 opacity-30" width="900" height="400" viewBox="0 0 900 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="450" cy="200" rx="420" ry="120" fill="url(#paint0_radial)" />
                <defs>
                    <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(450 200) scale(420 120)" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#a5b4fc" />
                        <stop offset="1" stopColor="#c4b5fd" stopOpacity="0.5" />
                    </radialGradient>
                </defs>
            </svg>
            <div className="relative max-w-3xl mx-auto text-center z-10 flex flex-col items-center justify-center">
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-xl tracking-tight">
                    Unlock Your <span className="bg-gradient-to-r from-white/90 to-indigo-200 bg-clip-text text-transparent">Financial Potential</span>
                </h1>
                <p className="text-xl md:text-2xl mb-10 opacity-95 font-medium max-w-2xl mx-auto">
                    Your one-stop platform for <span className="font-semibold text-indigo-100">financial education</span>, personalized tools, and a supportive community to achieve your money goals.
                </p>
                <button
                    onClick={onCTAClick}
                    className="px-10 py-4 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold text-xl rounded-full shadow-xl hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                >
                    Start Your Free Trial
                </button>
            </div>
        </section>
    );
} 