import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function calculateTax(income, deductions) {
    let taxable = Math.max(0, income - deductions);
    let tax = 0;
    if (taxable > 1000000) {
        tax += (taxable - 1000000) * 0.3;
        taxable = 1000000;
    }
    if (taxable > 500000) {
        tax += (taxable - 500000) * 0.2;
        taxable = 500000;
    }
    if (taxable > 250000) {
        tax += (taxable - 250000) * 0.05;
    }
    return { taxable, tax };
}

const TaxCalculator = () => {
    const [income, setIncome] = useState(800000);
    const [deductions, setDeductions] = useState(150000);
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const res = calculateTax(Number(income), Number(deductions));
        setResult(res);
    };

    return (
        <section className="max-w-xl mx-auto px-4 py-12">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700 mb-2">Income Tax Calculator</CardTitle>
                    <p className="text-gray-600 text-sm">Estimate your annual tax liability (India, simplified slabs).</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCalculate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="tax-income">Annual Income (₹)</label>
                            <Input
                                id="tax-income"
                                type="number"
                                min="0"
                                step="1000"
                                value={income}
                                onChange={e => setIncome(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="tax-deductions">Deductions (₹)</label>
                            <Input
                                id="tax-deductions"
                                type="number"
                                min="0"
                                step="1000"
                                value={deductions}
                                onChange={e => setDeductions(e.target.value)}
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
                                <div className="text-gray-700 text-base">Taxable Income: <span className="font-semibold text-blue-800">₹{result.taxable.toLocaleString()}</span></div>
                                <div className="text-gray-700 text-base">Estimated Tax: <span className="font-semibold text-red-700">₹{result.tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default TaxCalculator; 