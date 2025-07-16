import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function calculateGroupCorpus(people, monthly, rate, years) {
    const n = years * 12;
    const r = rate / 12 / 100;
    const corpus = people * monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return corpus;
}

const CommunityChallengeCalculator = () => {
    const [people, setPeople] = useState(10);
    const [monthly, setMonthly] = useState(1000);
    const [rate, setRate] = useState(10);
    const [years, setYears] = useState(5);
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const corpus = calculateGroupCorpus(Number(people), Number(monthly), Number(rate), Number(years));
        setResult(corpus);
    };

    return (
        <section className="max-w-xl mx-auto px-4 py-12">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700 mb-2">Community Challenge Calculator</CardTitle>
                    <p className="text-gray-600 text-sm">Calculate the total group corpus for a community savings challenge.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCalculate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="cc-people">Number of People</label>
                                <Input id="cc-people" type="number" min="1" max="1000" value={people} onChange={e => setPeople(e.target.value)} required className="max-w-xs" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="cc-monthly">Monthly Contribution (₹)</label>
                                <Input id="cc-monthly" type="number" min="0" step="100" value={monthly} onChange={e => setMonthly(e.target.value)} required className="max-w-xs" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="cc-rate">Expected Annual Return Rate (%)</label>
                                <Input id="cc-rate" type="number" min="0" max="50" step="0.1" value={rate} onChange={e => setRate(e.target.value)} required className="max-w-xs" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="cc-years">Years</label>
                                <Input id="cc-years" type="number" min="1" max="50" step="1" value={years} onChange={e => setYears(e.target.value)} required className="max-w-xs" />
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4">Calculate</Button>
                    </form>

                    {result !== null && (
                        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-blue-700 mb-4">Total Group Corpus</h3>
                            <div className="text-gray-700 text-xl font-semibold">₹{result.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default CommunityChallengeCalculator; 