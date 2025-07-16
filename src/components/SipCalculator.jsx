import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function calculateSIP(monthly, rate, years) {
    const n = years * 12;
    const r = rate / 12 / 100;
    const maturity = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = monthly * n;
    const returns = maturity - invested;
    return { invested, returns, maturity };
}

const SipCalculator = () => {
    const [monthly, setMonthly] = useState(10000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const res = calculateSIP(Number(monthly), Number(rate), Number(years));
        setResult(res);
    };

    return (
        <section className="max-w-xl mx-auto px-4 py-12">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700 mb-2">SIP Calculator</CardTitle>
                    <p className="text-gray-600 text-sm">Estimate the future value of your monthly investments in a Systematic Investment Plan (SIP).</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCalculate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="sip-monthly">Monthly Investment (₹)</label>
                            <Input
                                id="sip-monthly"
                                type="number"
                                min="0"
                                step="100"
                                value={monthly}
                                onChange={e => setMonthly(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="sip-rate">Expected Annual Return Rate (%)</label>
                            <Input
                                id="sip-rate"
                                type="number"
                                min="0"
                                max="50"
                                step="0.1"
                                value={rate}
                                onChange={e => setRate(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="sip-years">Investment Period (Years)</label>
                            <Input
                                id="sip-years"
                                type="number"
                                min="1"
                                max="50"
                                step="1"
                                value={years}
                                onChange={e => setYears(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Calculate</Button>
                    </form>

                    {result && (
                        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-blue-700 mb-4">Results</h3>
                            <div className="flex flex-col gap-3 items-center">
                                <div className="text-gray-700 text-base">Total Invested: <span className="font-semibold text-blue-800">₹{result.invested.toLocaleString()}</span></div>
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

export default SipCalculator; 