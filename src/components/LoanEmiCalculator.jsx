import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

function calculateEMI(principal, rate, tenure) {
    const monthlyRate = rate / 12 / 100;
    const n = tenure * 12;
    if (monthlyRate === 0) return principal / n;
    return (
        (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1)
    );
}

export default function LoanEmiCalculator() {
    const [principal, setPrincipal] = useState(500000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const emi = calculateEMI(Number(principal), Number(rate), Number(tenure));
        const n = Number(tenure) * 12;
        const totalPayment = emi * n;
        const totalInterest = totalPayment - Number(principal);
        setResult({
            emi: emi.toFixed(2),
            totalPayment: totalPayment.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
        });
    };

    return (
        <section className="max-w-xl mx-auto px-4 py-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700 mb-2">Loan EMI Calculator</CardTitle>
                    <p className="text-gray-600 text-base font-normal">Calculate your monthly loan payments, total interest, and total payment for any loan.</p>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleCalculate}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Principal Amount (₹)</label>
                            <input
                                type="number"
                                min="1000"
                                step="100"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                                value={principal}
                                onChange={e => setPrincipal(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (% per annum)</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                                value={rate}
                                onChange={e => setRate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (years)</label>
                            <input
                                type="number"
                                min="1"
                                max="40"
                                step="1"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                                value={tenure}
                                onChange={e => setTenure(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md">Calculate EMI</Button>
                    </form>
                    {result && (
                        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center space-y-2">
                            <div className="text-xl font-bold text-blue-700">EMI: ₹{result.emi}</div>
                            <div className="text-base text-gray-700">Total Interest: <span className="font-semibold">₹{result.totalInterest}</span></div>
                            <div className="text-base text-gray-700">Total Payment: <span className="font-semibold">₹{result.totalPayment}</span></div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
} 