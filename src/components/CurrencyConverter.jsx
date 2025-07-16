import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const rates = {
    USD: { USD: 1, EUR: 0.92, INR: 83, GBP: 0.79 },
    EUR: { USD: 1.09, EUR: 1, INR: 90, GBP: 0.86 },
    INR: { USD: 0.012, EUR: 0.011, INR: 1, GBP: 0.0095 },
    GBP: { USD: 1.27, EUR: 1.16, INR: 105, GBP: 1 },
};
const currencies = Object.keys(rates);

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(100);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [result, setResult] = useState(null);

    const handleConvert = (e) => {
        e.preventDefault();
        const rate = rates[from][to];
        setResult(amount * rate);
    };

    return (
        <section className="max-w-xl mx-auto px-4 py-12">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700 mb-2">Currency Converter</CardTitle>
                    <p className="text-gray-600 text-sm">Convert between major currencies (demo rates).</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleConvert} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="cc-amount">Amount</label>
                            <Input id="cc-amount" type="number" min="0" step="1" value={amount} onChange={e => setAmount(e.target.value)} required className="max-w-xs" />
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="cc-from">From</label>
                                <select id="cc-from" value={from} onChange={e => setFrom(e.target.value)} className="max-w-xs border rounded px-2 py-1">
                                    {currencies.map(cur => <option key={cur} value={cur}>{cur}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="cc-to">To</label>
                                <select id="cc-to" value={to} onChange={e => setTo(e.target.value)} className="max-w-xs border rounded px-2 py-1">
                                    {currencies.map(cur => <option key={cur} value={cur}>{cur}</option>)}
                                </select>
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Convert</Button>
                    </form>

                    {result !== null && (
                        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-blue-700 mb-4">Converted Amount</h3>
                            <div className="text-gray-700 text-xl font-semibold">{result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}</div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default CurrencyConverter; 