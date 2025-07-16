import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function calculateRetirement({ currentAge, retirementAge, currentSavings, monthlyInvestment, rate, postRetirementYears }) {
    const yearsToRetire = retirementAge - currentAge;
    const n = yearsToRetire * 12;
    const r = rate / 12 / 100;
    // Future value of current savings
    const fvCurrent = currentSavings * Math.pow(1 + r, n);
    // Future value of SIP
    const fvSIP = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const corpus = fvCurrent + fvSIP;
    // Estimate monthly income post-retirement (simple annuity, not inflation adjusted)
    const postRetirementMonths = postRetirementYears * 12;
    const postRetirementRate = r; // Assume same rate
    const monthlyIncome = corpus * postRetirementRate / (1 - Math.pow(1 + postRetirementRate, -postRetirementMonths));
    return { corpus, monthlyIncome };
}

const RetirementCalculator = () => {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [currentSavings, setCurrentSavings] = useState(500000);
    const [monthlyInvestment, setMonthlyInvestment] = useState(20000);
    const [rate, setRate] = useState(10);
    const [postRetirementYears, setPostRetirementYears] = useState(20);
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const res = calculateRetirement({
            currentAge: Number(currentAge),
            retirementAge: Number(retirementAge),
            currentSavings: Number(currentSavings),
            monthlyInvestment: Number(monthlyInvestment),
            rate: Number(rate),
            postRetirementYears: Number(postRetirementYears),
        });
        setResult(res);
    };

    return (
        <section className="max-w-xl mx-auto px-4 py-12">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700 mb-2">Retirement Calculator</CardTitle>
                    <p className="text-gray-600 text-sm">Plan your retirement savings and estimate your post-retirement income.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCalculate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="ret-current-age">Current Age</label>
                                <Input id="ret-current-age" type="number" min="18" max="70" value={currentAge} onChange={e => setCurrentAge(e.target.value)} required className="max-w-xs" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="ret-retirement-age">Retirement Age</label>
                                <Input id="ret-retirement-age" type="number" min="30" max="80" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} required className="max-w-xs" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="ret-current-savings">Current Savings (₹)</label>
                                <Input id="ret-current-savings" type="number" min="0" step="1000" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} required className="max-w-xs" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="ret-monthly-investment">Monthly Investment (₹)</label>
                                <Input id="ret-monthly-investment" type="number" min="0" step="100" value={monthlyInvestment} onChange={e => setMonthlyInvestment(e.target.value)} required className="max-w-xs" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="ret-rate">Expected Annual Return Rate (%)</label>
                                <Input id="ret-rate" type="number" min="0" max="50" step="0.1" value={rate} onChange={e => setRate(e.target.value)} required className="max-w-xs" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="ret-post-years">Years After Retirement</label>
                                <Input id="ret-post-years" type="number" min="1" max="40" value={postRetirementYears} onChange={e => setPostRetirementYears(e.target.value)} required className="max-w-xs" />
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4">Calculate</Button>
                    </form>

                    {result && (
                        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-blue-700 mb-4">Results</h3>
                            <div className="flex flex-col gap-3 items-center">
                                <div className="text-gray-700 text-base">Corpus at Retirement: <span className="font-semibold text-blue-800">₹{result.corpus.toLocaleString()}</span></div>
                                <div className="text-gray-700 text-base">Estimated Monthly Income (post-retirement): <span className="font-semibold text-green-700">₹{result.monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default RetirementCalculator; 