import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const NetWorthCalculator = () => {
    const [assets, setAssets] = useState(1000000);
    const [liabilities, setLiabilities] = useState(200000);
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        setResult(Number(assets) - Number(liabilities));
    };

    return (
        <section className="max-w-xl mx-auto px-4 py-12">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700 mb-2">Net Worth Calculator</CardTitle>
                    <p className="text-gray-600 text-sm">Calculate your total net worth by subtracting liabilities from assets.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCalculate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="nw-assets">Total Assets (₹)</label>
                            <Input
                                id="nw-assets"
                                type="number"
                                min="0"
                                step="1000"
                                value={assets}
                                onChange={e => setAssets(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="nw-liabilities">Total Liabilities (₹)</label>
                            <Input
                                id="nw-liabilities"
                                type="number"
                                min="0"
                                step="1000"
                                value={liabilities}
                                onChange={e => setLiabilities(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Calculate</Button>
                    </form>

                    {result !== null && (
                        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-blue-700 mb-4">Your Net Worth</h3>
                            <div className="text-gray-700 text-xl font-semibold">₹{result.toLocaleString()}</div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default NetWorthCalculator; 