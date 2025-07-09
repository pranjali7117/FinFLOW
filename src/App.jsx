import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  // Placeholder for login/signup actions
  const handleLogin = () => alert("Login functionality coming soon!");
  const handleSignup = () => alert("Sign Up functionality coming soon!");

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        onLogin={handleLogin}
        onSignup={handleSignup}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="pt-20">
        <Hero onCTAClick={() => alert("Start Free Trial functionality coming soon!")} />
        <Features />
        <Pricing />
        <Testimonials />
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

export default App;
