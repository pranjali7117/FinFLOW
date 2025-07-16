import React, { useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
const Hero = lazy(() => import("./components/Hero"));
const Features = lazy(() => import("./components/Features"));
const Pricing = lazy(() => import("./components/Pricing"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Footer = lazy(() => import("./components/Footer"));
// Prepare for Calculators page
const Calculators = lazy(() => import("./components/Calculators"));
const LoanEmiCalculator = lazy(() => import("./components/LoanEmiCalculator"));
const SipCalculator = lazy(() => import("./components/SipCalculator"));
const LumpSumCalculator = lazy(() => import("./components/LumpSumCalculator"));
const CompoundInterestCalculator = lazy(() => import("./components/CompoundInterestCalculator"));
const RetirementCalculator = lazy(() => import("./components/RetirementCalculator"));
const EmergencyFundCalculator = lazy(() => import("./components/EmergencyFundCalculator"));
const TaxCalculator = lazy(() => import("./components/TaxCalculator"));
const NetWorthCalculator = lazy(() => import("./components/NetWorthCalculator"));
const InvestmentComparisonCalculator = lazy(() => import("./components/InvestmentComparisonCalculator"));
const SavingsGoalCalculator = lazy(() => import("./components/SavingsGoalCalculator"));
const RentVsBuyCalculator = lazy(() => import("./components/RentVsBuyCalculator"));
const CommunityChallengeCalculator = lazy(() => import("./components/CommunityChallengeCalculator"));
const CurrencyConverter = lazy(() => import("./components/CurrencyConverter"));

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    alert("Login functionality coming soon!");
  };

  const handleSignup = () => {
    alert("Sign up functionality coming soon!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-secondary-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-100 to-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-secondary-100 to-accent-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogin={handleLogin}
        onSignup={handleSignup}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content with Routing */}
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <Features />
                <Pricing />
                <Testimonials />
                <Footer />
              </main>
            }
          />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/emi" element={<LoanEmiCalculator />} />
          <Route path="/calculators/sip" element={<SipCalculator />} />
          <Route path="/calculators/lumpsum" element={<LumpSumCalculator />} />
          <Route path="/calculators/compound-interest" element={<CompoundInterestCalculator />} />
          <Route path="/calculators/retirement" element={<RetirementCalculator />} />
          <Route path="/calculators/emergency-fund" element={<EmergencyFundCalculator />} />
          <Route path="/calculators/tax" element={<TaxCalculator />} />
          <Route path="/calculators/net-worth" element={<NetWorthCalculator />} />
          <Route path="/calculators/investment-comparison" element={<InvestmentComparisonCalculator />} />
          <Route path="/calculators/savings-goal" element={<SavingsGoalCalculator />} />
          <Route path="/calculators/rent-vs-buy" element={<RentVsBuyCalculator />} />
          <Route path="/calculators/community-challenge" element={<CommunityChallengeCalculator />} />
          <Route path="/calculators/currency-converter" element={<CurrencyConverter />} />
        </Routes>
      </Suspense>
    </div>
  );
}
