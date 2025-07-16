import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function calculateMaturity(principal, rate, years) {
    return principal * Math.pow(1 + rate / 100, years);
}

const InvestmentComparisonCalculator = () => {
    const [p1, setP1] = useState(100000);
    const [r1, setR1] = useState(10);
    const [y1, setY1] = useState(5);
    const [p2, setP2] = useState(100000);
    const [r2, setR2] = useState(8);
    const [y2, setY2] = useState(5);
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const m1 = calculateMaturity(Number(p1), Number(r1), Number(y1));
        const m2 = calculateMaturity(Number(p2), Number(r2), Number(y2));
        setResult({ m1, m2, diff: m1 - m2 });
    };

    return (
        <section className="max-w-2xl mx-auto px-4 py-12">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700 mb-2">Investment Comparison Calculator</CardTitle>
                    <p className="text-gray-600 text-sm">Compare the maturity value of two different investments.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCalculate} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold mb-2 text-blue-600">Investment 1</h4>
                                <label className="block text-sm font-medium mb-1" htmlFor="ic-p1">Principal (₹)</label>
                                <Input id="ic-p1" type="number" min="0" step="1000" value={p1} onChange={e => setP1(e.target.value)} required className="max-w-xs" />
                                <label className="block text-sm font-medium mb-1 mt-2" htmlFor="ic-r1">Rate (%)</label>
                                <Input id="ic-r1" type="number" min="0" max="50" step="0.1" value={r1} onChange={e => setR1(e.target.value)} required className="max-w-xs" />
                                <label className="block text-sm font-medium mb-1 mt-2" htmlFor="ic-y1">Years</label>
                                <Input id="ic-y1" type="number" min="1" max="50" step="1" value={y1} onChange={e => setY1(e.target.value)} required className="max-w-xs" />
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 text-indigo-600">Investment 2</h4>
                                <label className="block text-sm font-medium mb-1" htmlFor="ic-p2">Principal (₹)</label>
                                <Input id="ic-p2" type="number" min="0" step="1000" value={p2} onChange={e => setP2(e.target.value)} required className="max-w-xs" />
                                <label className="block text-sm font-medium mb-1 mt-2" htmlFor="ic-r2">Rate (%)</label>
                                <Input id="ic-r2" type="number" min="0" max="50" step="0.1" value={r2} onChange={e => setR2(e.target.value)} required className="max-w-xs" />
                                <label className="block text-sm font-medium mb-1 mt-2" htmlFor="ic-y2">Years</label>
                                <Input id="ic-y2" type="number" min="1" max="50" step="1" value={y2} onChange={e => setY2(e.target.value)} required className="max-w-xs" />
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Compare</Button>
                    </form>

                    {result && (
                        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-blue-700 mb-4">Results</h3>
                            <div className="flex flex-col gap-3 items-center">
                                <div className="text-gray-700 text-base">Investment 1 Maturity: <span className="font-semibold text-blue-800">₹{result.m1.toLocaleString()}</span></div>
                                <div className="text-gray-700 text-base">Investment 2 Maturity: <span className="font-semibold text-indigo-800">₹{result.m2.toLocaleString()}</span></div>
                                <div className="text-gray-700 text-base">Difference: <span className="font-semibold text-green-700">₹{result.diff.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default InvestmentComparisonCalculator; 