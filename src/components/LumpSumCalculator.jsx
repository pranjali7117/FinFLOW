import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function calculateLumpSum(principal, rate, years) {
    const maturity = principal * Math.pow(1 + rate / 100, years);
    const invested = principal;
    const returns = maturity - invested;
    return { invested, returns, maturity };
}

const LumpSumCalculator = () => {
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(10);
    const [years, setYears] = useState(5);
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const res = calculateLumpSum(Number(principal), Number(rate), Number(years));
        setResult(res);
    };

    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-transparent">
            <Card className="w-full max-w-lg mx-auto p-0 rounded-xl shadow-xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold text-blue-700 mb-1 text-left">Lump Sum Investment Calculator</CardTitle>
                    <p className="text-gray-600 text-sm text-left">See how a one-time investment grows over time with compound interest.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCalculate} className="space-y-5 pt-2">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-left" htmlFor="lump-principal">Principal Amount (₹)</label>
                            <Input
                                id="lump-principal"
                                type="number"
                                min="0"
                                step="1000"
                                value={principal}
                                onChange={e => setPrincipal(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-left" htmlFor="lump-rate">Expected Annual Return Rate (%)</label>
                            <Input
                                id="lump-rate"
                                type="number"
                                min="0"
                                max="50"
                                step="0.1"
                                value={rate}
                                onChange={e => setRate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-left" htmlFor="lump-years">Investment Period (Years)</label>
                            <Input
                                id="lump-years"
                                type="number"
                                min="1"
                                max="50"
                                step="1"
                                value={years}
                                onChange={e => setYears(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">Calculate</Button>
                    </form>

                    {result && (
                        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-blue-700 mb-4">Results</h3>
                            <div className="flex flex-col gap-3 items-center">
                                <div className="text-gray-700 text-base">Invested Amount: <span className="font-semibold text-blue-800">₹{result.invested.toLocaleString()}</span></div>
                                <div className="text-gray-700 text-base">Estimated Returns: <span className="font-semibold text-green-700">₹{result.returns.toLocaleString()}</span></div>
                                <div className="text-gray-700 text-base">Maturity Amount: <span className="font-semibold text-emerald-700">₹{result.maturity.toLocaleString()}</span></div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default LumpSumCalculator; 