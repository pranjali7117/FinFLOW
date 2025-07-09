import React from "react";

export default function Footer({ navigate }) {
    return (
        <footer className="bg-gray-900 text-white py-10 px-6 md:px-10 mt-12 rounded-t-lg">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div>
                    <h3 className="text-xl font-bold mb-4 text-indigo-400">FinFlow</h3>
                    <p className="text-gray-400 text-sm">Empowering your financial journey with knowledge, tools, and community.</p>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300"><img src="https://placehold.co/24x24/FFFFFF/000000?text=FB" alt="Facebook" className="rounded-full" /></a>
                        <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300"><img src="https://placehold.co/24x24/FFFFFF/000000?text=TW" alt="Twitter" className="rounded-full" /></a>
                        <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300"><img src="https://placehold.co/24x24/FFFFFF/000000?text=LI" alt="LinkedIn" className="rounded-full" /></a>
                    </div>
                </div>
                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><button onClick={() => navigate('about')} className="text-gray-400 hover:text-indigo-400 cursor-pointer text-sm transition duration-300 bg-transparent border-none">About Us</button></li>
                        <li><button onClick={() => navigate('education')} className="text-gray-400 hover:text-indigo-400 cursor-pointer text-sm transition duration-300 bg-transparent border-none">Education</button></li>
                        <li><button onClick={() => navigate('planning')} className="text-gray-400 hover:text-indigo-400 cursor-pointer text-sm transition duration-300 bg-transparent border-none">Planning Tools</button></li>
                        <li><button onClick={() => navigate('community')} className="text-gray-400 hover:text-indigo-400 cursor-pointer text-sm transition duration-300 bg-transparent border-none">Community Forum</button></li>
                    </ul>
                </div>
                {/* Legal */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Legal</h3>
                    <ul className="space-y-2">
                        <li><button onClick={() => navigate('terms')} className="text-gray-400 hover:text-indigo-400 cursor-pointer text-sm transition duration-300 bg-transparent border-none">Terms of Service</button></li>
                        <li><button onClick={() => navigate('privacy')} className="text-gray-400 hover:text-indigo-400 cursor-pointer text-sm transition duration-300 bg-transparent border-none">Privacy Policy</button></li>
                    </ul>
                </div>
                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Contact Us</h3>
                    <p className="text-gray-400 text-sm">123 Financial St, Wealth City, FN 12345</p>
                    <p className="text-gray-400 text-sm">Email: info@finflow.com</p>
                    <p className="text-gray-400 text-sm">Phone: (123) 456-7890</p>
                </div>
            </div>
            <div className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} FinFlow. All rights reserved.
            </div>
        </footer>
    );
} 