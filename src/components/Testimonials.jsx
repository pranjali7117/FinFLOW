import React from "react";

const testimonials = [
    {
        quote: "FinFlow transformed how I manage my money. The budgeting tools are incredibly intuitive, and I finally feel in control!",
        author: "— Sarah L., Small Business Owner",
        avatarUrl: "https://placehold.co/80x80/6366F1/FFFFFF?text=SL",
    },
    {
        quote: "I used to be so confused about investing. FinFlow's educational resources and planning tools made it simple and accessible. Highly recommend!",
        author: "— Mark T., Software Engineer",
        avatarUrl: "https://placehold.co/80x80/6366F1/FFFFFF?text=MT",
    },
    {
        quote: "The community forum is a game-changer. It's inspiring to connect with others on the same financial journey and learn from experts.",
        author: "— Jessica P., Teacher",
        avatarUrl: "https://placehold.co/80x80/6366F1/FFFFFF?text=JP",
    },
    {
        quote: "Thanks to FinFlow's debt payoff calculator, I've created a clear plan and am on track to be debt-free sooner than I ever imagined!",
        author: "— David R., Graphic Designer",
        avatarUrl: "https://placehold.co/80x80/6366F1/FFFFFF?text=DR",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-purple-700 text-white py-16 px-6 md:px-10 rounded-3xl shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                What Our Users Say
            </h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {testimonials.map((t, idx) => (
                    <div key={idx} className="bg-purple-800 p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
                        <img src={t.avatarUrl} alt={t.author} className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-purple-500" />
                        <p className="text-lg italic mb-4">"{t.quote}"</p>
                        <p className="font-semibold text-purple-200">{t.author}</p>
                    </div>
                ))}
            </div>
        </section>
    );
} 