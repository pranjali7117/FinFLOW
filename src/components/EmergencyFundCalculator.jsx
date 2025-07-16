import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const EmergencyFundCalculator = () => {
    const [expenses, setExpenses] = useState(40000);
    const [months, setMonths] = useState(6);
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        setResult(Number(expenses) * Number(months));
    };

    return (
        <section className="max-w-xl mx-auto px-4 py-12">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700 mb-2">Emergency Fund Calculator</CardTitle>
                    <p className="text-gray-600 text-sm">Find out how much you should set aside for emergencies.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCalculate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="ef-expenses">Monthly Living Expenses (₹)</label>
                            <Input
                                id="ef-expenses"
                                type="number"
                                min="0"
                                step="100"
                                value={expenses}
                                onChange={e => setExpenses(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="ef-months">Months of Coverage</label>
                            <Input
                                id="ef-months"
                                type="number"
                                min="1"
                                max="24"
                                step="1"
                                value={months}
                                onChange={e => setMonths(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Calculate</Button>
                    </form>

                    {result !== null && (
                        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-blue-700 mb-4">Recommended Emergency Fund</h3>
                            <div className="text-gray-700 text-xl font-semibold">₹{result.toLocaleString()}</div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default EmergencyFundCalculator; 