import React, { useState } from "react";
import InvestmentComparisonCalculator from "./InvestmentComparisonCalculator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
    BarChart2, CreditCard, Landmark, Shield, Banknote, LineChart, DollarSign, Home, TrendingUp, Users, PiggyBank, Trophy
} from "lucide-react";

const TABS = [
    { label: "Investment", value: "investment", icon: <BarChart2 size={18} /> },
    { label: "Credit Card", value: "credit-card", icon: <CreditCard size={18} /> },
    { label: "Loan", value: "loan", icon: <Landmark size={18} /> },
    { label: "Insurance", value: "insurance", icon: <Shield size={18} /> },
    { label: "Bank Account", value: "bank-account", icon: <Banknote size={18} /> },
    { label: "Mutual Fund", value: "mutual-fund", icon: <LineChart size={18} /> },
    { label: "Currency", value: "currency", icon: <DollarSign size={18} /> },
    { label: "Rent vs Buy", value: "rent-vs-buy", icon: <Home size={18} /> },
    { label: "Net Worth", value: "net-worth", icon: <TrendingUp size={18} /> },
    { label: "Emergency Fund", value: "emergency-fund", icon: <PiggyBank size={18} /> },
    { label: "Community Challenge", value: "community-challenge", icon: <Trophy size={18} /> },
];

const tabPlaceholders = {
    "credit-card": {
        title: "Credit Card Comparison",
        desc: "Compare credit cards by rewards, fees, interest rates, and more. (Interactive UI coming soon!)"
    },
    "loan": {
        title: "Loan Comparison",
        desc: "Compare loans by amount, tenure, interest rate, and EMI. (Interactive UI coming soon!)"
    },
    "insurance": {
        title: "Insurance Comparison",
        desc: "Compare insurance policies by premium, coverage, and claim ratio. (Interactive UI coming soon!)"
    },
    "bank-account": {
        title: "Bank Account Comparison",
        desc: "Compare savings/current accounts by interest, charges, and features. (Interactive UI coming soon!)"
    },
    "mutual-fund": {
        title: "Mutual Fund Comparison",
        desc: "Compare mutual funds by returns, risk, and expense ratio. (Interactive UI coming soon!)"
    },
    "currency": {
        title: "Currency Comparison",
        desc: "Compare currency exchange rates and fees. (Interactive UI coming soon!)"
    },
    "rent-vs-buy": {
        title: "Rent vs Buy Comparison",
        desc: "Compare the financial impact of renting vs buying a home. (Interactive UI coming soon!)"
    },
    "net-worth": {
        title: "Net Worth Comparison",
        desc: "Compare your net worth to peers or community benchmarks. (Interactive UI coming soon!)"
    },
    "emergency-fund": {
        title: "Emergency Fund Comparison",
        desc: "Compare emergency fund needs and options. (Interactive UI coming soon!)"
    },
    "community-challenge": {
        title: "Community Challenge Comparison",
        desc: "Compare your progress in community financial challenges. (Interactive UI coming soon!)"
    },
};

function CreditCardComparison() {
    const [card1, setCard1] = React.useState({ name: "Card 1", rewards: 1.5, fee: 500, interest: 36 });
    const [card2, setCard2] = React.useState({ name: "Card 2", rewards: 2, fee: 1000, interest: 40 });
    const [spend, setSpend] = React.useState(120000);
    const [result, setResult] = React.useState(null);

    function calculateScore(card, spend) {
        // Simple score: rewards value - fee - interest cost (annualized)
        const rewardsValue = (spend * card.rewards) / 100;
        const interestCost = (spend * card.interest) / 100;
        return rewardsValue - card.fee - interestCost;
    }

    function handleCompare(e) {
        e.preventDefault();
        const score1 = calculateScore(card1, spend);
        const score2 = calculateScore(card2, spend);
        setResult({ score1, score2 });
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600 mb-2">Credit Card Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCompare} className="space-y-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="spend">Estimated Annual Spend (₹)</label>
                        <Input id="spend" type="number" min="0" value={spend} onChange={e => setSpend(Number(e.target.value))} required className="max-w-xs" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-600">Card 1</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="cc1-name">Name</label>
                            <Input id="cc1-name" value={card1.name} onChange={e => setCard1({ ...card1, name: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="cc1-rewards">Rewards Rate (%)</label>
                            <Input id="cc1-rewards" type="number" min="0" step="0.1" value={card1.rewards} onChange={e => setCard1({ ...card1, rewards: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="cc1-fee">Annual Fee (₹)</label>
                            <Input id="cc1-fee" type="number" min="0" value={card1.fee} onChange={e => setCard1({ ...card1, fee: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="cc1-interest">Interest Rate (% p.a.)</label>
                            <Input id="cc1-interest" type="number" min="0" step="0.1" value={card1.interest} onChange={e => setCard1({ ...card1, interest: Number(e.target.value) })} className="max-w-xs" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-indigo-600">Card 2</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="cc2-name">Name</label>
                            <Input id="cc2-name" value={card2.name} onChange={e => setCard2({ ...card2, name: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="cc2-rewards">Rewards Rate (%)</label>
                            <Input id="cc2-rewards" type="number" min="0" step="0.1" value={card2.rewards} onChange={e => setCard2({ ...card2, rewards: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="cc2-fee">Annual Fee (₹)</label>
                            <Input id="cc2-fee" type="number" min="0" value={card2.fee} onChange={e => setCard2({ ...card2, fee: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="cc2-interest">Interest Rate (% p.a.)</label>
                            <Input id="cc2-interest" type="number" min="0" step="0.1" value={card2.interest} onChange={e => setCard2({ ...card2, interest: Number(e.target.value) })} className="max-w-xs" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Compare</Button>
                </form>
                {result && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[card1, card2].map((card, idx) => (
                            <Card key={idx} className={`p-4 border-2 ${(result.score1 > result.score2 && idx === 0) || (result.score2 > result.score1 && idx === 1)
                                ? "border-green-500 shadow-lg" : "border-gray-200"
                                }`}>
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-blue-700">{card.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-gray-700 text-base mb-2">Rewards Rate: <span className="font-semibold">{card.rewards}%</span></div>
                                    <div className="text-gray-700 text-base mb-2">Annual Fee: <span className="font-semibold">₹{card.fee}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Interest Rate: <span className="font-semibold">{card.interest}%</span></div>
                                    <div className="text-gray-700 text-base mb-2">Estimated Score: <span className="font-semibold text-blue-800">₹{(idx === 0 ? result.score1 : result.score2).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                                    {(result.score1 > result.score2 && idx === 0) || (result.score2 > result.score1 && idx === 1) ? (
                                        <div className="mt-2 text-green-700 font-semibold">Best Value</div>
                                    ) : null}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function LoanComparison() {
    const [loan1, setLoan1] = React.useState({ name: "Loan 1", principal: 500000, rate: 9, years: 5 });
    const [loan2, setLoan2] = React.useState({ name: "Loan 2", principal: 500000, rate: 10, years: 5 });
    const [result, setResult] = React.useState(null);

    function calculateEMI(P, R, N) {
        const r = R / 12 / 100;
        const n = N * 12;
        return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    function handleCompare(e) {
        e.preventDefault();
        const emi1 = calculateEMI(loan1.principal, loan1.rate, loan1.years);
        const total1 = emi1 * loan1.years * 12;
        const interest1 = total1 - loan1.principal;
        const emi2 = calculateEMI(loan2.principal, loan2.rate, loan2.years);
        const total2 = emi2 * loan2.years * 12;
        const interest2 = total2 - loan2.principal;
        setResult({ emi1, total1, interest1, emi2, total2, interest2 });
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600 mb-2">Loan Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCompare} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-600">Loan 1</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="loan1-name">Name</label>
                            <Input id="loan1-name" value={loan1.name} onChange={e => setLoan1({ ...loan1, name: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="loan1-principal">Principal (₹)</label>
                            <Input id="loan1-principal" type="number" min="0" step="1000" value={loan1.principal} onChange={e => setLoan1({ ...loan1, principal: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="loan1-rate">Interest Rate (%)</label>
                            <Input id="loan1-rate" type="number" min="0" max="50" step="0.1" value={loan1.rate} onChange={e => setLoan1({ ...loan1, rate: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="loan1-years">Tenure (years)</label>
                            <Input id="loan1-years" type="number" min="1" max="50" step="1" value={loan1.years} onChange={e => setLoan1({ ...loan1, years: Number(e.target.value) })} className="max-w-xs" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-indigo-600">Loan 2</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="loan2-name">Name</label>
                            <Input id="loan2-name" value={loan2.name} onChange={e => setLoan2({ ...loan2, name: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="loan2-principal">Principal (₹)</label>
                            <Input id="loan2-principal" type="number" min="0" step="1000" value={loan2.principal} onChange={e => setLoan2({ ...loan2, principal: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="loan2-rate">Interest Rate (%)</label>
                            <Input id="loan2-rate" type="number" min="0" max="50" step="0.1" value={loan2.rate} onChange={e => setLoan2({ ...loan2, rate: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="loan2-years">Tenure (years)</label>
                            <Input id="loan2-years" type="number" min="1" max="50" step="1" value={loan2.years} onChange={e => setLoan2({ ...loan2, years: Number(e.target.value) })} className="max-w-xs" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Compare</Button>
                </form>
                {result && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[loan1, loan2].map((loan, idx) => (
                            <Card key={idx} className={`p-4 border-2 ${(result.total1 < result.total2 && idx === 0) || (result.total2 < result.total1 && idx === 1)
                                ? "border-green-500 shadow-lg" : "border-gray-200"
                                }`}>
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-blue-700">{loan.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-gray-700 text-base mb-2">Principal: <span className="font-semibold">₹{loan.principal.toLocaleString()}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Interest Rate: <span className="font-semibold">{loan.rate}%</span></div>
                                    <div className="text-gray-700 text-base mb-2">Tenure: <span className="font-semibold">{loan.years} years</span></div>
                                    <div className="text-gray-700 text-base mb-2">EMI: <span className="font-semibold text-blue-800">₹{(idx === 0 ? result.emi1 : result.emi2).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Total Interest: <span className="font-semibold">₹{(idx === 0 ? result.interest1 : result.interest2).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Total Payment: <span className="font-semibold">₹{(idx === 0 ? result.total1 : result.total2).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                                    {(result.total1 < result.total2 && idx === 0) || (result.total2 < result.total1 && idx === 1) ? (
                                        <div className="mt-2 text-green-700 font-semibold">Better Deal</div>
                                    ) : null}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function InsuranceComparison() {
    const [policy1, setPolicy1] = React.useState({ name: "Policy 1", sum: 1000000, premium: 12000, years: 20, claim: 98 });
    const [policy2, setPolicy2] = React.useState({ name: "Policy 2", sum: 1000000, premium: 15000, years: 20, claim: 95 });
    const [result, setResult] = React.useState(null);

    function handleCompare(e) {
        e.preventDefault();
        const total1 = policy1.premium * policy1.years;
        const total2 = policy2.premium * policy2.years;
        setResult({ total1, total2 });
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600 mb-2">Insurance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCompare} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-600">Policy 1</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="policy1-name">Name</label>
                            <Input id="policy1-name" value={policy1.name} onChange={e => setPolicy1({ ...policy1, name: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="policy1-sum">Sum Assured (₹)</label>
                            <Input id="policy1-sum" type="number" min="0" step="10000" value={policy1.sum} onChange={e => setPolicy1({ ...policy1, sum: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="policy1-premium">Annual Premium (₹)</label>
                            <Input id="policy1-premium" type="number" min="0" step="100" value={policy1.premium} onChange={e => setPolicy1({ ...policy1, premium: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="policy1-years">Policy Term (years)</label>
                            <Input id="policy1-years" type="number" min="1" max="50" step="1" value={policy1.years} onChange={e => setPolicy1({ ...policy1, years: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="policy1-claim">Claim Settlement Ratio (%)</label>
                            <Input id="policy1-claim" type="number" min="0" max="100" step="0.1" value={policy1.claim} onChange={e => setPolicy1({ ...policy1, claim: Number(e.target.value) })} className="max-w-xs" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-indigo-600">Policy 2</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="policy2-name">Name</label>
                            <Input id="policy2-name" value={policy2.name} onChange={e => setPolicy2({ ...policy2, name: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="policy2-sum">Sum Assured (₹)</label>
                            <Input id="policy2-sum" type="number" min="0" step="10000" value={policy2.sum} onChange={e => setPolicy2({ ...policy2, sum: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="policy2-premium">Annual Premium (₹)</label>
                            <Input id="policy2-premium" type="number" min="0" step="100" value={policy2.premium} onChange={e => setPolicy2({ ...policy2, premium: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="policy2-years">Policy Term (years)</label>
                            <Input id="policy2-years" type="number" min="1" max="50" step="1" value={policy2.years} onChange={e => setPolicy2({ ...policy2, years: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="policy2-claim">Claim Settlement Ratio (%)</label>
                            <Input id="policy2-claim" type="number" min="0" max="100" step="0.1" value={policy2.claim} onChange={e => setPolicy2({ ...policy2, claim: Number(e.target.value) })} className="max-w-xs" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Compare</Button>
                </form>
                {result && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[policy1, policy2].map((policy, idx) => (
                            <Card key={idx} className={`p-4 border-2 ${(policy.claim > (idx === 0 ? policy2.claim : policy1.claim) && policy.premium * policy.years < (idx === 0 ? policy2.premium * policy2.years : policy1.premium * policy1.years))
                                ? "border-green-500 shadow-lg" : "border-gray-200"
                                }`}>
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-blue-700">{policy.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-gray-700 text-base mb-2">Sum Assured: <span className="font-semibold">₹{policy.sum.toLocaleString()}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Annual Premium: <span className="font-semibold">₹{policy.premium.toLocaleString()}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Policy Term: <span className="font-semibold">{policy.years} years</span></div>
                                    <div className="text-gray-700 text-base mb-2">Total Premium Paid: <span className="font-semibold">₹{(policy.premium * policy.years).toLocaleString()}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Claim Settlement Ratio: <span className="font-semibold">{policy.claim}%</span></div>
                                    {(policy.claim > (idx === 0 ? policy2.claim : policy1.claim) && policy.premium * policy.years < (idx === 0 ? policy2.premium * policy2.years : policy1.premium * policy1.years)) ? (
                                        <div className="mt-2 text-green-700 font-semibold">Best Value</div>
                                    ) : null}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function BankAccountComparison() {
    const [acc1, setAcc1] = React.useState({ name: "Account 1", interest: 3.5, minBalance: 10000, charges: 500, atmLimit: 50000 });
    const [acc2, setAcc2] = React.useState({ name: "Account 2", interest: 4, minBalance: 5000, charges: 250, atmLimit: 40000 });
    const [result, setResult] = React.useState(null);

    function calculateScore(acc) {
        // Simple score: interest rate - annual charges
        return acc.interest - acc.charges / 1000;
    }

    function handleCompare(e) {
        e.preventDefault();
        const score1 = calculateScore(acc1);
        const score2 = calculateScore(acc2);
        setResult({ score1, score2 });
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600 mb-2">Bank Account Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCompare} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-600">Account 1</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="acc1-name">Name</label>
                            <Input id="acc1-name" value={acc1.name} onChange={e => setAcc1({ ...acc1, name: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="acc1-interest">Interest Rate (%)</label>
                            <Input id="acc1-interest" type="number" min="0" step="0.1" value={acc1.interest} onChange={e => setAcc1({ ...acc1, interest: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="acc1-min">Minimum Balance (₹)</label>
                            <Input id="acc1-min" type="number" min="0" step="100" value={acc1.minBalance} onChange={e => setAcc1({ ...acc1, minBalance: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="acc1-charges">Annual Charges (₹)</label>
                            <Input id="acc1-charges" type="number" min="0" step="10" value={acc1.charges} onChange={e => setAcc1({ ...acc1, charges: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="acc1-atm">ATM Withdrawal Limit (₹/month)</label>
                            <Input id="acc1-atm" type="number" min="0" step="1000" value={acc1.atmLimit} onChange={e => setAcc1({ ...acc1, atmLimit: Number(e.target.value) })} className="max-w-xs" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-indigo-600">Account 2</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="acc2-name">Name</label>
                            <Input id="acc2-name" value={acc2.name} onChange={e => setAcc2({ ...acc2, name: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="acc2-interest">Interest Rate (%)</label>
                            <Input id="acc2-interest" type="number" min="0" step="0.1" value={acc2.interest} onChange={e => setAcc2({ ...acc2, interest: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="acc2-min">Minimum Balance (₹)</label>
                            <Input id="acc2-min" type="number" min="0" step="100" value={acc2.minBalance} onChange={e => setAcc2({ ...acc2, minBalance: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="acc2-charges">Annual Charges (₹)</label>
                            <Input id="acc2-charges" type="number" min="0" step="10" value={acc2.charges} onChange={e => setAcc2({ ...acc2, charges: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="acc2-atm">ATM Withdrawal Limit (₹/month)</label>
                            <Input id="acc2-atm" type="number" min="0" step="1000" value={acc2.atmLimit} onChange={e => setAcc2({ ...acc2, atmLimit: Number(e.target.value) })} className="max-w-xs" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Compare</Button>
                </form>
                {result && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[acc1, acc2].map((acc, idx) => (
                            <Card key={idx} className={`p-4 border-2 ${(result.score1 > result.score2 && idx === 0) || (result.score2 > result.score1 && idx === 1)
                                ? "border-green-500 shadow-lg" : "border-gray-200"
                                }`}>
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-blue-700">{acc.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-gray-700 text-base mb-2">Interest Rate: <span className="font-semibold">{acc.interest}%</span></div>
                                    <div className="text-gray-700 text-base mb-2">Minimum Balance: <span className="font-semibold">₹{acc.minBalance.toLocaleString()}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Annual Charges: <span className="font-semibold">₹{acc.charges.toLocaleString()}</span></div>
                                    <div className="text-gray-700 text-base mb-2">ATM Withdrawal Limit: <span className="font-semibold">₹{acc.atmLimit.toLocaleString()}</span> / month</div>
                                    <div className="text-gray-700 text-base mb-2">Score: <span className="font-semibold text-blue-800">{(idx === 0 ? result.score1 : result.score2).toFixed(2)}</span></div>
                                    {(result.score1 > result.score2 && idx === 0) || (result.score2 > result.score1 && idx === 1) ? (
                                        <div className="mt-2 text-green-700 font-semibold">Best Value</div>
                                    ) : null}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function MutualFundComparison() {
    const [fund1, setFund1] = React.useState({ name: "Fund 1", r1: 12, r3: 15, r5: 18, expense: 1, risk: 3 });
    const [fund2, setFund2] = React.useState({ name: "Fund 2", r1: 10, r3: 14, r5: 17, expense: 1.2, risk: 4 });
    const [result, setResult] = React.useState(null);

    function calculateScore(fund) {
        // Weighted score: 1yr(20%) + 3yr(30%) + 5yr(40%) - expense*2 - risk*2
        return fund.r1 * 0.2 + fund.r3 * 0.3 + fund.r5 * 0.4 - fund.expense * 2 - fund.risk * 2;
    }

    function handleCompare(e) {
        e.preventDefault();
        const score1 = calculateScore(fund1);
        const score2 = calculateScore(fund2);
        setResult({ score1, score2 });
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600 mb-2">Mutual Fund Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCompare} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-600">Fund 1</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="fund1-name">Name</label>
                            <Input id="fund1-name" value={fund1.name} onChange={e => setFund1({ ...fund1, name: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="fund1-r1">1-Year Return (%)</label>
                            <Input id="fund1-r1" type="number" min="-100" max="100" step="0.1" value={fund1.r1} onChange={e => setFund1({ ...fund1, r1: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="fund1-r3">3-Year Return (%)</label>
                            <Input id="fund1-r3" type="number" min="-100" max="100" step="0.1" value={fund1.r3} onChange={e => setFund1({ ...fund1, r3: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="fund1-r5">5-Year Return (%)</label>
                            <Input id="fund1-r5" type="number" min="-100" max="100" step="0.1" value={fund1.r5} onChange={e => setFund1({ ...fund1, r5: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="fund1-expense">Expense Ratio (%)</label>
                            <Input id="fund1-expense" type="number" min="0" max="10" step="0.01" value={fund1.expense} onChange={e => setFund1({ ...fund1, expense: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="fund1-risk">Risk Level (1-5)</label>
                            <Input id="fund1-risk" type="number" min="1" max="5" step="1" value={fund1.risk} onChange={e => setFund1({ ...fund1, risk: Number(e.target.value) })} className="max-w-xs" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-indigo-600">Fund 2</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="fund2-name">Name</label>
                            <Input id="fund2-name" value={fund2.name} onChange={e => setFund2({ ...fund2, name: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="fund2-r1">1-Year Return (%)</label>
                            <Input id="fund2-r1" type="number" min="-100" max="100" step="0.1" value={fund2.r1} onChange={e => setFund2({ ...fund2, r1: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="fund2-r3">3-Year Return (%)</label>
                            <Input id="fund2-r3" type="number" min="-100" max="100" step="0.1" value={fund2.r3} onChange={e => setFund2({ ...fund2, r3: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="fund2-r5">5-Year Return (%)</label>
                            <Input id="fund2-r5" type="number" min="-100" max="100" step="0.1" value={fund2.r5} onChange={e => setFund2({ ...fund2, r5: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="fund2-expense">Expense Ratio (%)</label>
                            <Input id="fund2-expense" type="number" min="0" max="10" step="0.01" value={fund2.expense} onChange={e => setFund2({ ...fund2, expense: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="fund2-risk">Risk Level (1-5)</label>
                            <Input id="fund2-risk" type="number" min="1" max="5" step="1" value={fund2.risk} onChange={e => setFund2({ ...fund2, risk: Number(e.target.value) })} className="max-w-xs" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Compare</Button>
                </form>
                {result && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[fund1, fund2].map((fund, idx) => (
                            <Card key={idx} className={`p-4 border-2 ${(result.score1 > result.score2 && idx === 0) || (result.score2 > result.score1 && idx === 1)
                                ? "border-green-500 shadow-lg" : "border-gray-200"
                                }`}>
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-blue-700">{fund.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-gray-700 text-base mb-2">1-Year Return: <span className="font-semibold">{fund.r1}%</span></div>
                                    <div className="text-gray-700 text-base mb-2">3-Year Return: <span className="font-semibold">{fund.r3}%</span></div>
                                    <div className="text-gray-700 text-base mb-2">5-Year Return: <span className="font-semibold">{fund.r5}%</span></div>
                                    <div className="text-gray-700 text-base mb-2">Expense Ratio: <span className="font-semibold">{fund.expense}%</span></div>
                                    <div className="text-gray-700 text-base mb-2">Risk Level: <span className="font-semibold">{fund.risk}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Score: <span className="font-semibold text-blue-800">{(idx === 0 ? result.score1 : result.score2).toFixed(2)}</span></div>
                                    {(result.score1 > result.score2 && idx === 0) || (result.score2 > result.score1 && idx === 1) ? (
                                        <div className="mt-2 text-green-700 font-semibold">Best Value</div>
                                    ) : null}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function CurrencyComparison() {
    const [option1, setOption1] = React.useState({ name: "Provider 1", from: "USD", to: "INR", amount: 1000, rate: 83, fee: 5 });
    const [option2, setOption2] = React.useState({ name: "Provider 2", from: "USD", to: "INR", amount: 1000, rate: 82.5, fee: 2 });
    const [result, setResult] = React.useState(null);

    function calculateReceived(opt) {
        // Total received = (amount - fee) * rate
        return (opt.amount - opt.fee) * opt.rate;
    }

    function calculateEffectiveRate(opt) {
        // Effective rate = total received / amount
        return calculateReceived(opt) / opt.amount;
    }

    function handleCompare(e) {
        e.preventDefault();
        const received1 = calculateReceived(option1);
        const received2 = calculateReceived(option2);
        const effRate1 = calculateEffectiveRate(option1);
        const effRate2 = calculateEffectiveRate(option2);
        setResult({ received1, received2, effRate1, effRate2 });
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600 mb-2">Currency Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCompare} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-600">Option 1</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="opt1-name">Provider Name</label>
                            <Input id="opt1-name" value={option1.name} onChange={e => setOption1({ ...option1, name: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="opt1-from">From Currency</label>
                            <Input id="opt1-from" value={option1.from} onChange={e => setOption1({ ...option1, from: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="opt1-to">To Currency</label>
                            <Input id="opt1-to" value={option1.to} onChange={e => setOption1({ ...option1, to: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="opt1-amount">Amount</label>
                            <Input id="opt1-amount" type="number" min="0" value={option1.amount} onChange={e => setOption1({ ...option1, amount: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="opt1-rate">Exchange Rate</label>
                            <Input id="opt1-rate" type="number" min="0" step="0.0001" value={option1.rate} onChange={e => setOption1({ ...option1, rate: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="opt1-fee">Fee</label>
                            <Input id="opt1-fee" type="number" min="0" step="0.01" value={option1.fee} onChange={e => setOption1({ ...option1, fee: Number(e.target.value) })} className="max-w-xs" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-indigo-600">Option 2</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="opt2-name">Provider Name</label>
                            <Input id="opt2-name" value={option2.name} onChange={e => setOption2({ ...option2, name: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="opt2-from">From Currency</label>
                            <Input id="opt2-from" value={option2.from} onChange={e => setOption2({ ...option2, from: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="opt2-to">To Currency</label>
                            <Input id="opt2-to" value={option2.to} onChange={e => setOption2({ ...option2, to: e.target.value })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="opt2-amount">Amount</label>
                            <Input id="opt2-amount" type="number" min="0" value={option2.amount} onChange={e => setOption2({ ...option2, amount: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="opt2-rate">Exchange Rate</label>
                            <Input id="opt2-rate" type="number" min="0" step="0.0001" value={option2.rate} onChange={e => setOption2({ ...option2, rate: Number(e.target.value) })} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="opt2-fee">Fee</label>
                            <Input id="opt2-fee" type="number" min="0" step="0.01" value={option2.fee} onChange={e => setOption2({ ...option2, fee: Number(e.target.value) })} className="max-w-xs" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Compare</Button>
                </form>
                {result && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[option1, option2].map((opt, idx) => (
                            <Card key={idx} className={`p-4 border-2 ${(result.received1 > result.received2 && idx === 0) || (result.received2 > result.received1 && idx === 1)
                                ? "border-green-500 shadow-lg" : "border-gray-200"
                                }`}>
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-blue-700">{opt.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-gray-700 text-base mb-2">From: <span className="font-semibold">{opt.from}</span></div>
                                    <div className="text-gray-700 text-base mb-2">To: <span className="font-semibold">{opt.to}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Amount: <span className="font-semibold">{opt.amount}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Exchange Rate: <span className="font-semibold">{opt.rate}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Fee: <span className="font-semibold">{opt.fee}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Total Received: <span className="font-semibold text-blue-800">{(idx === 0 ? result.received1 : result.received2).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                                    <div className="text-gray-700 text-base mb-2">Effective Rate: <span className="font-semibold">{(idx === 0 ? result.effRate1 : result.effRate2).toFixed(4)}</span></div>
                                    {(result.received1 > result.received2 && idx === 0) || (result.received2 > result.received1 && idx === 1) ? (
                                        <div className="mt-2 text-green-700 font-semibold">Best Value</div>
                                    ) : null}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function RentVsBuyComparison() {
    const [inputs, setInputs] = React.useState({
        rent: 20000,
        rentInc: 5,
        years: 10,
        homePrice: 8000000,
        down: 1600000,
        rate: 8,
        tenure: 20,
        tax: 1,
        maint: 1,
        appr: 4
    });
    const [result, setResult] = React.useState(null);

    function calcEMI(P, R, N) {
        const r = R / 12 / 100;
        const n = N * 12;
        return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    function handleChange(e) {
        setInputs({ ...inputs, [e.target.name]: Number(e.target.value) });
    }

    function handleCompare(e) {
        e.preventDefault();
        // Rent total
        let totalRent = 0, currRent = inputs.rent;
        for (let i = 0; i < inputs.years; i++) {
            totalRent += currRent * 12;
            currRent *= 1 + inputs.rentInc / 100;
        }
        // Buy total
        const loanAmt = inputs.homePrice - inputs.down;
        const emi = calcEMI(loanAmt, inputs.rate, inputs.tenure);
        let totalEMI = 0;
        for (let i = 0; i < Math.min(inputs.years, inputs.tenure); i++) {
            totalEMI += emi * 12;
        }
        const totalTax = inputs.homePrice * (inputs.tax / 100) * inputs.years;
        const totalMaint = inputs.homePrice * (inputs.maint / 100) * inputs.years;
        const homeValue = inputs.homePrice * Math.pow(1 + inputs.appr / 100, inputs.years);
        const totalBuy = inputs.down + totalEMI + totalTax + totalMaint - (homeValue - inputs.homePrice);
        setResult({ totalRent, totalBuy });
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600 mb-2">Rent vs Buy Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCompare} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-600">Renting</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="rent">Monthly Rent (₹)</label>
                            <Input id="rent" name="rent" type="number" min="0" value={inputs.rent} onChange={handleChange} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="rentInc">Annual Rent Increase (%)</label>
                            <Input id="rentInc" name="rentInc" type="number" min="0" max="20" step="0.1" value={inputs.rentInc} onChange={handleChange} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="years">Years</label>
                            <Input id="years" name="years" type="number" min="1" max="40" value={inputs.years} onChange={handleChange} className="max-w-xs" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-indigo-600">Buying</h4>
                            <label className="block text-sm font-medium mb-1" htmlFor="homePrice">Home Price (₹)</label>
                            <Input id="homePrice" name="homePrice" type="number" min="0" value={inputs.homePrice} onChange={handleChange} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="down">Down Payment (₹)</label>
                            <Input id="down" name="down" type="number" min="0" value={inputs.down} onChange={handleChange} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="rate">Loan Rate (%)</label>
                            <Input id="rate" name="rate" type="number" min="0" max="20" step="0.1" value={inputs.rate} onChange={handleChange} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="tenure">Loan Tenure (years)</label>
                            <Input id="tenure" name="tenure" type="number" min="1" max="40" value={inputs.tenure} onChange={handleChange} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="tax">Property Tax (%/yr)</label>
                            <Input id="tax" name="tax" type="number" min="0" max="10" step="0.1" value={inputs.tax} onChange={handleChange} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="maint">Maintenance (%/yr)</label>
                            <Input id="maint" name="maint" type="number" min="0" max="10" step="0.1" value={inputs.maint} onChange={handleChange} className="max-w-xs" />
                            <label className="block text-sm font-medium mb-1 mt-2" htmlFor="appr">Appreciation (%/yr)</label>
                            <Input id="appr" name="appr" type="number" min="0" max="20" step="0.1" value={inputs.appr} onChange={handleChange} className="max-w-xs" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Compare</Button>
                </form>
                {result && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[{ label: "Renting", value: result.totalRent }, { label: "Buying", value: result.totalBuy }].map((opt, idx) => (
                            <Card key={idx} className={`p-4 border-2 ${(result.totalRent < result.totalBuy && idx === 0) || (result.totalBuy < result.totalRent && idx === 1)
                                ? "border-green-500 shadow-lg" : "border-gray-200"
                                }`}>
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-blue-700">{opt.label}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-gray-700 text-base mb-2">Total Cost after {inputs.years} years: <span className="font-semibold text-blue-800">₹{opt.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                                    {((result.totalRent < result.totalBuy && idx === 0) || (result.totalBuy < result.totalRent && idx === 1)) && (
                                        <div className="mt-2 text-green-700 font-semibold">Better Option</div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function NetWorthComparison() {
    // Example benchmarks (could be dynamic in future)
    const benchmarks = [
        { label: "Top 10%", value: 15000000, color: "bg-emerald-100 text-emerald-700" },
        { label: "Average", value: 6500000, color: "bg-blue-100 text-blue-700" },
        { label: "Median", value: 3500000, color: "bg-indigo-100 text-indigo-700" },
        { label: "Bottom 10%", value: 500000, color: "bg-rose-100 text-rose-700" },
    ];
    const [userNetWorth, setUserNetWorth] = React.useState(2000000);
    const [result, setResult] = React.useState(null);

    function handleCompare(e) {
        e.preventDefault();
        // Find where user stands
        let standing = "Below Median";
        if (userNetWorth >= benchmarks[0].value) standing = "Top 10%";
        else if (userNetWorth >= benchmarks[1].value) standing = "Above Average";
        else if (userNetWorth >= benchmarks[2].value) standing = "Above Median";
        else if (userNetWorth >= benchmarks[3].value) standing = "Above Bottom 10%";
        setResult({ standing });
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600 mb-2">Net Worth Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCompare} className="space-y-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="networth">Your Net Worth (₹)</label>
                        <Input id="networth" type="number" min="0" value={userNetWorth} onChange={e => setUserNetWorth(Number(e.target.value))} required className="max-w-xs" />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Compare</Button>
                </form>
                <div className="mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {benchmarks.map((bm, idx) => (
                            <div key={bm.label} className={`rounded-xl p-4 text-center font-semibold ${bm.color} ${userNetWorth >= bm.value && idx === 0 ? 'ring-2 ring-emerald-400' : ''}`}>
                                <div className="text-xs uppercase tracking-wide mb-1">{bm.label}</div>
                                <div className="text-lg font-mono">₹{bm.value.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <div className="w-full max-w-md">
                            <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                                {/* Bar visualization */}
                                <div
                                    className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500"
                                    style={{ width: `${Math.min(100, (userNetWorth / benchmarks[0].value) * 100)}%` }}
                                ></div>
                                <div className="absolute left-0 top-0 h-full flex items-center pl-2 text-xs font-semibold text-white">
                                    ₹{userNetWorth.toLocaleString()}
                                </div>
                            </div>
                        </div>
                        {result && (
                            <div className="mt-6 text-lg font-bold text-blue-700 text-center">
                                You are in: <span className="text-emerald-600">{result.standing}</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function EmergencyFundComparison() {
    const [monthly, setMonthly] = React.useState(40000);
    const [months, setMonths] = React.useState(6);
    const [current, setCurrent] = React.useState(100000);
    const [result, setResult] = React.useState(null);
    const recommendations = [3, 6, 12];

    function handleCompare(e) {
        e.preventDefault();
        const recs = recommendations.map(m => ({ months: m, amount: m * monthly }));
        let status = "Below Recommended";
        if (current >= recs[2].amount) status = "Excellent (12+ months covered)";
        else if (current >= recs[1].amount) status = "Good (6+ months covered)";
        else if (current >= recs[0].amount) status = "Fair (3+ months covered)";
        setResult({ recs, status });
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600 mb-2">Emergency Fund Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCompare} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="monthly">Monthly Expenses (₹)</label>
                            <Input id="monthly" type="number" min="0" value={monthly} onChange={e => setMonthly(Number(e.target.value))} required className="max-w-xs" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="months">Months of Coverage</label>
                            <Input id="months" type="number" min="1" max="24" value={months} onChange={e => setMonths(Number(e.target.value))} required className="max-w-xs" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="current">Current Emergency Fund (₹)</label>
                            <Input id="current" type="number" min="0" value={current} onChange={e => setCurrent(Number(e.target.value))} required className="max-w-xs" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Compare</Button>
                </form>
                <div className="mt-8">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {recommendations.map((m, idx) => (
                            <div key={m} className={`rounded-xl p-4 text-center font-semibold ${months === m ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                <div className="text-xs uppercase tracking-wide mb-1">{m} Months</div>
                                <div className="text-lg font-mono">₹{(m * monthly).toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <div className="w-full max-w-md">
                            <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden mb-2">
                                {/* Bar visualization */}
                                <div
                                    className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500"
                                    style={{ width: `${Math.min(100, (current / (months * monthly)) * 100)}%` }}
                                ></div>
                                <div className="absolute left-0 top-0 h-full flex items-center pl-2 text-xs font-semibold text-white">
                                    ₹{current.toLocaleString()}
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 text-center">Current Fund vs. Your Target ({months} months: ₹{(months * monthly).toLocaleString()})</div>
                        </div>
                        {result && (
                            <div className="mt-6 text-lg font-bold text-blue-700 text-center">
                                Status: <span className="text-emerald-600">{result.status}</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function CommunityChallengeComparison() {
    // Example community stats (could be dynamic in future)
    const stats = [
        { label: "Top Performer", value: 100000, color: "bg-emerald-100 text-emerald-700" },
        { label: "Goal", value: 50000, color: "bg-blue-100 text-blue-700" },
        { label: "Average", value: 30000, color: "bg-indigo-100 text-indigo-700" },
        { label: "Median", value: 20000, color: "bg-rose-100 text-rose-700" },
    ];
    const [progress, setProgress] = React.useState(15000);
    const [result, setResult] = React.useState(null);

    function handleCompare(e) {
        e.preventDefault();
        let standing = "Behind Community";
        if (progress >= stats[0].value) standing = "Top Performer!";
        else if (progress >= stats[1].value) standing = "Goal Achieved!";
        else if (progress >= stats[2].value) standing = "Above Average";
        else if (progress >= stats[3].value) standing = "Above Median";
        setResult({ standing });
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600 mb-2">Community Challenge Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCompare} className="space-y-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="progress">Your Progress (₹)</label>
                        <Input id="progress" type="number" min="0" value={progress} onChange={e => setProgress(Number(e.target.value))} required className="max-w-xs" />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Compare</Button>
                </form>
                <div className="mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {stats.map((s, idx) => (
                            <div key={s.label} className={`rounded-xl p-4 text-center font-semibold ${s.color} ${progress >= s.value && idx === 0 ? 'ring-2 ring-emerald-400' : ''}`}>
                                <div className="text-xs uppercase tracking-wide mb-1">{s.label}</div>
                                <div className="text-lg font-mono">₹{s.value.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <div className="w-full max-w-md">
                            <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                                {/* Bar visualization */}
                                <div
                                    className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500"
                                    style={{ width: `${Math.min(100, (progress / stats[0].value) * 100)}%` }}
                                ></div>
                                <div className="absolute left-0 top-0 h-full flex items-center pl-2 text-xs font-semibold text-white">
                                    ₹{progress.toLocaleString()}
                                </div>
                            </div>
                        </div>
                        {result && (
                            <div className="mt-6 text-lg font-bold text-blue-700 text-center">
                                You are: <span className="text-emerald-600">{result.standing}</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Comparison() {
    const [activeTab, setActiveTab] = useState("investment");

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Comparison Tools</h1>
            <div
                className="flex flex-wrap gap-3 md:gap-4 justify-center mb-8 px-2 md:px-0"
                role="tablist"
                aria-label="Comparison Tools Tabs"
            >
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.value;
                    return (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`group flex items-center gap-3 px-6 py-2 md:px-7 md:py-2.5 rounded-full font-medium transition-all duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                                shadow-sm border border-transparent
                                whitespace-nowrap
                                ${isActive
                                    ? "bg-blue-600 text-white shadow-lg scale-105 z-10"
                                    : "bg-white text-blue-700 hover:bg-blue-50 hover:shadow-md hover:scale-103 hover:ring-2 hover:ring-blue-100"
                                }
                            `}
                            aria-selected={isActive}
                            aria-controls={`tabpanel-${tab.value}`}
                            role="tab"
                            tabIndex={isActive ? 0 : -1}
                            style={{ minWidth: 'max-content', marginBottom: '6px' }}
                        >
                            <span className={`transition-colors duration-300 ${isActive ? "text-white" : "text-blue-500 group-hover:text-blue-700"}`}>{tab.icon}</span>
                            <span className="ml-1 md:ml-2">{tab.label}</span>
                            {isActive && (
                                <span className="ml-2 w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
                            )}
                        </button>
                    );
                })}
            </div>
            <div className="bg-white rounded-xl shadow p-6 min-h-[300px]">
                {activeTab === "investment" && <InvestmentComparisonCalculator />}
                {activeTab === "credit-card" && <CreditCardComparison />}
                {activeTab === "loan" && <LoanComparison />}
                {activeTab === "insurance" && <InsuranceComparison />}
                {activeTab === "bank-account" && <BankAccountComparison />}
                {activeTab === "mutual-fund" && <MutualFundComparison />}
                {activeTab === "currency" && <CurrencyComparison />}
                {activeTab === "rent-vs-buy" && <RentVsBuyComparison />}
                {activeTab === "net-worth" && <NetWorthComparison />}
                {activeTab === "emergency-fund" && <EmergencyFundComparison />}
                {activeTab === "community-challenge" && <CommunityChallengeComparison />}
                {activeTab !== "investment" && activeTab !== "credit-card" && activeTab !== "loan" && activeTab !== "insurance" && activeTab !== "bank-account" && activeTab !== "mutual-fund" && activeTab !== "currency" && activeTab !== "rent-vs-buy" && activeTab !== "net-worth" && activeTab !== "emergency-fund" && activeTab !== "community-challenge" && (
                    <div className="flex flex-col items-center justify-center h-full">
                        <Card className="w-full max-w-lg mx-auto">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-blue-600 mb-2">
                                    {tabPlaceholders[activeTab]?.title || "Coming Soon"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-500 text-center mb-2">
                                    {tabPlaceholders[activeTab]?.desc || "This comparison tool will be available soon."}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
} 