import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PiggyBank } from "lucide-react";

export default function BudgetPlanner() {
    const [income, setIncome] = useState(50000);
    const [expenses, setExpenses] = useState(20000);
    const [savings, setSavings] = useState(15000);
    const [investments, setInvestments] = useState(15000);
    const [error, setError] = useState("");
    const [showResult, setShowResult] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const total = Number(expenses) + Number(savings) + Number(investments);
        if (total > Number(income)) {
            setError("Total allocation exceeds income. Please adjust your values.");
            setShowResult(false);
        } else {
            setError("");
            setShowResult(true);
        }
    };

    const autoBalance = (field, value) => {
        let e = expenses, s = savings, i = investments;
        if (field === "expenses") e = value;
        if (field === "savings") s = value;
        if (field === "investments") i = value;
        const total = e + s + i;
        if (total > income) {
            const over = total - income;
            if (field !== "expenses" && e > 0) e = Math.max(0, e - over);
            if (field !== "savings" && s > 0) s = Math.max(0, s - over);
            if (field !== "investments" && i > 0) i = Math.max(0, i - over);
        }
        setExpenses(e);
        setSavings(s);
        setInvestments(i);
        setShowResult(false);
        setError("");
    };

    return (
        <section className="max-w-xl mx-auto px-4 py-12">
            <Card className="shadow-xl h-full flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <PiggyBank className="text-blue-600" size={28} />
                        <CardTitle className="text-2xl font-bold text-blue-700">Budget Planner</CardTitle>
                    </div>
                    <p className="text-gray-600 text-sm">Allocate your monthly income to expenses, savings, and investments.</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="bp-income">Total Monthly Income (₹)</label>
                            <Input id="bp-income" type="number" min="0" value={income} onChange={e => { setIncome(Number(e.target.value)); setShowResult(false); setError(""); }} required className="max-w-xs" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="bp-expenses">Expenses (₹)</label>
                            <Input id="bp-expenses" type="number" min="0" value={expenses} onChange={e => { autoBalance("expenses", Number(e.target.value)); }} required className="max-w-xs" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="bp-savings">Savings (₹)</label>
                            <Input id="bp-savings" type="number" min="0" value={savings} onChange={e => { autoBalance("savings", Number(e.target.value)); }} required className="max-w-xs" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="bp-investments">Investments (₹)</label>
                            <Input id="bp-investments" type="number" min="0" value={investments} onChange={e => { autoBalance("investments", Number(e.target.value)); }} required className="max-w-xs" />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Review Allocation</Button>
                    </form>
                    {error && <div className="mt-4 text-red-600 text-sm font-medium">{error}</div>}
                    {showResult && !error && (
                        <div className="mt-6 bg-blue-50 rounded-lg p-4 text-center">
                            <h3 className="text-lg font-bold text-blue-700 mb-2">Allocation Summary</h3>
                            <div className="flex flex-col gap-2 text-gray-700 text-base">
                                <div>Expenses: <span className="font-semibold">₹{expenses.toLocaleString()}</span></div>
                                <div>Savings: <span className="font-semibold">₹{savings.toLocaleString()}</span></div>
                                <div>Investments: <span className="font-semibold">₹{investments.toLocaleString()}</span></div>
                                <div className="font-semibold mt-2">Unallocated: ₹{(income - expenses - savings - investments).toLocaleString()}</div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
} 