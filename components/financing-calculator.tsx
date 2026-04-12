"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { numberWithCommas } from "@/lib/utils";

function calculatePayment(
  askingPrice: number,
  downPayment: number,
  interestRate: number,
  termYears: number,
  frequency: number
): { paymentAmount: number; paymentsCount: number } {
  const PV = downPayment - askingPrice;
  const TERM = termYears * 12;
  const FREQ = TERM / frequency;
  const IYR = interestRate;
  const UIR = IYR / 100 / FREQ;
  const SIR = IYR / FREQ;
  const N = TERM;
  const SPPV = 1 / Math.pow(1 + SIR / 100, N);
  const USPV =
    (Math.pow(1 + UIR, TERM) - 1) / (UIR * Math.pow(1 + UIR, TERM));
  const PMT = Math.abs((PV - 0 * SPPV) / (USPV + 0));
  return {
    paymentAmount: Math.round(PMT * frequency),
    paymentsCount: TERM / frequency,
  };
}

export function FinancingCalculator({
  defaultPrice,
}: {
  defaultPrice?: number;
}) {
  const [price, setPrice] = useState(defaultPrice?.toString() || "");
  const [downPayment, setDownPayment] = useState("0");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [frequency, setFrequency] = useState("1");
  const [result, setResult] = useState<{
    paymentAmount: number;
    paymentsCount: number;
  } | null>(null);

  const handleCalculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(downPayment) || 0;
    const r = parseFloat(rate);
    const t = parseFloat(term);
    const f = parseFloat(frequency);
    if (!p || !r || !t) return;
    setResult(calculatePayment(p, d, r, t, f));
  };

  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
        <Calculator className="h-5 w-5 text-accent" />
        Financing Calculator
      </h3>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-xs">Cost of Vehicle ($)</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25,000"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Down Payment ($)</Label>
          <Input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            placeholder="0"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Annual Interest Rate (%)</Label>
          <Input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="6.99"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Term (Years)</Label>
          <Input
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="5"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Payment Frequency</Label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="1">Monthly</option>
            <option value="0.5">Bi-Weekly</option>
            <option value="0.25">Weekly</option>
          </select>
        </div>
        <Button
          onClick={handleCalculate}
          className="w-full bg-accent hover:bg-accent/90"
        >
          Calculate My Payment
        </Button>

        {result && (
          <div className="mt-4 rounded-xl bg-muted/50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Number of Payments</span>
              <span className="font-bold">{result.paymentsCount}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Amount</span>
              <span className="text-lg font-bold text-accent">
                ${numberWithCommas(result.paymentAmount)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
