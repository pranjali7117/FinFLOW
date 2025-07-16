import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function calculateBuy(homePrice, downPayment, loanRate, years) {
    const principal = homePrice - downPayment;
    const n = years * 12;
    const r = loanRate / 12 / 100;
    const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n + downPayment;
    return { emi, totalPayment };
}

function calculateRent(rent, increase, years) {
    let total = 0;
    let currentRent = rent;
    for (let i = 0; i < years; i++) {
        total += currentRent * 12;
        currentRent *= 1 + increase / 100;
    }
    return total;
}

const RentVsBuyCalculator = () => {
    const [homePrice, setHomePrice] = useState(5000000);
    const [downPayment, setDownPayment] = useState(1000000);
    const [loanRate, setLoanRate] = useState(8);
    const [years, setYears] = useState(20);
    const [rent, setRent] = useState(20000);
    const [increase, setIncrease] = useState(5);
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const buy = calculateBuy(Number(homePrice), Number(downPayment), Number(loanRate), Number(years));
        const rentTotal = calculateRent(Number(rent), Number(increase), Number(years));
        setResult({ ...buy, rentTotal });
    };

    return (
        <section className="max-w-2xl mx-auto px-4 py-12">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700 mb-2">Rent vs Buy Calculator</CardTitle>
                    <p className="text-gray-600 text-sm">Compare the total cost of renting vs buying a home.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCalculate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="rvb-home">Home Price (₹)</label>
                                <Input id="rvb-home" type="number" min="0" step="100000" value={homePrice} onChange={e => setHomePrice(e.target.value)} required className="max-w-xs" />
                                <label className="block text-sm font-medium mb-1 mt-2" htmlFor="rvb-down">Down Payment (₹)</label>
                                <Input id="rvb-down" type="number" min="0" step="100000" value={downPayment} onChange={e => setDownPayment(e.target.value)} required className="max-w-xs" />
                                <label className="block text-sm font-medium mb-1 mt-2" htmlFor="rvb-loan">Loan Rate (%)</label>
                                <Input id="rvb-loan" type="number" min="0" max="20" step="0.1" value={loanRate} onChange={e => setLoanRate(e.target.value)} required className="max-w-xs" />
                                <label className="block text-sm font-medium mb-1 mt-2" htmlFor="rvb-years">Loan Tenure (Years)</label>
                                <Input id="rvb-years" type="number" min="1" max="40" step="1" value={years} onChange={e => setYears(e.target.value)} required className="max-w-xs" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="rvb-rent">Monthly Rent (₹)</label>
                                <Input id="rvb-rent" type="number" min="0" step="1000" value={rent} onChange={e => setRent(e.target.value)} required className="max-w-xs" />
                                <label className="block text-sm font-medium mb-1 mt-2" htmlFor="rvb-increase">Annual Rent Increase (%)</label>
                                <Input id="rvb-increase" type="number" min="0" max="20" step="0.1" value={increase} onChange={e => setIncrease(e.target.value)} required className="max-w-xs" />
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4">Compare</Button>
                    </form>

                    {result && (
                        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-blue-700 mb-4">Results</h3>
                            <div className="flex flex-col gap-3 items-center">
                                <div className="text-gray-700 text-base">Total Cost of Buying: <span className="font-semibold text-blue-800">₹{result.totalPayment.toLocaleString()}</span></div>
                                <div className="text-gray-700 text-base">Total Cost of Renting: <span className="font-semibold text-green-700">₹{result.rentTotal.toLocaleString()}</span></div>
                                <div className="text-gray-700 text-base">Monthly EMI (Buy): <span className="font-semibold text-emerald-700">₹{result.emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default RentVsBuyCalculator; 