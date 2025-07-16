import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function calculateMonthlySaving(goal, rate, years) {
    const n = years * 12;
    const r = rate / 12 / 100;
    // Rearranged SIP formula to solve for monthly investment
    const monthly = goal / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    return monthly;
}

const SavingsGoalCalculator = () => {
    const [goal, setGoal] = useState(1000000);
    const [rate, setRate] = useState(10);
    const [years, setYears] = useState(5);
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const monthly = calculateMonthlySaving(Number(goal), Number(rate), Number(years));
        setResult(monthly);
    };

    return (
        <section className="max-w-xl mx-auto px-4 py-12">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700 mb-2">Savings Goal Calculator</CardTitle>
                    <p className="text-gray-600 text-sm">Plan how much you need to save each month to reach your goal.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCalculate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="sg-goal">Goal Amount (₹)</label>
                            <Input
                                id="sg-goal"
                                type="number"
                                min="0"
                                step="1000"
                                value={goal}
                                onChange={e => setGoal(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="sg-rate">Expected Annual Return Rate (%)</label>
                            <Input
                                id="sg-rate"
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
                            <label className="block text-sm font-medium mb-1" htmlFor="sg-years">Years to Goal</label>
                            <Input
                                id="sg-years"
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

                    {result !== null && (
                        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-blue-700 mb-4">Required Monthly Savings</h3>
                            <div className="text-gray-700 text-xl font-semibold">₹{result.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default SavingsGoalCalculator; 