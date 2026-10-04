import { useState, useEffect } from "react";
import Input from "./components/Input";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const [copied, setCopied] = useState(false);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  // Auto-calculate conversion when amount, currency, or rates change
  useEffect(() => {
    if (currencyInfo && currencyInfo[to] !== undefined) {
      if (amount === "" || isNaN(amount)) {
        setConvertedAmount(0);
      } else {
        const result = Number(amount) * currencyInfo[to];
        // Format nicely to up to 4 decimal places
        setConvertedAmount(Number(result.toFixed(4)));
      }
    }
  }, [amount, from, to, currencyInfo]);

  const swap = () => {
    setIsSwapping(true);
    setTimeout(() => setIsSwapping(false), 500);

    const prevFrom = from;
    const prevTo = to;
    const prevAmount = amount;
    const prevConverted = convertedAmount;

    setFrom(prevTo);
    setTo(prevFrom);
    setAmount(prevConverted || 1);
    setConvertedAmount(prevAmount);
  };

  const handleConvert = () => {
    if (currencyInfo && currencyInfo[to]) {
      const result = Number(amount || 0) * currencyInfo[to];
      setConvertedAmount(Number(result.toFixed(4)));
    }
  };

  const handleCopy = () => {
    if (!convertedAmount) return;
    navigator.clipboard.writeText(`${convertedAmount}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickAmounts = [10, 50, 100, 500, 1000];
  const rate = currencyInfo && currencyInfo[to] ? currencyInfo[to] : null;
  const inverseRate = rate ? (1 / rate).toFixed(4) : null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-slate-100 flex flex-col justify-between items-center px-4 py-8 md:py-12">
      {/* Dynamic Background Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl animate-pulse-glow" />

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Header / Brand */}
      <header className="relative z-10 text-center max-w-xl mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 shadow-sm backdrop-blur-md mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Interbank Rates
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
          Valuta Exchange
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-400">
          Fast, accurate conversion across 150+ global currencies.
        </p>
      </header>

      {/* Main Card */}
      <main className="relative z-10 w-full max-w-lg">
        <div className="relative rounded-3xl border border-slate-800/90 bg-slate-900/60 p-6 md:p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleConvert();
            }}
          >
            {/* From Input Box */}
            <div className="space-y-2">
              <Input
                label="You Send"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(curr) => setFrom(curr)}
                selectCurrency={from}
                onAmountChange={(amt) => setAmount(amt)}
              />

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 px-1">
                <span className="text-[11px] font-medium text-slate-400 mr-1">Quick:</span>
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      amount === amt
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "bg-slate-800/80 text-slate-400 hover:bg-slate-700/80 hover:text-slate-200 border border-slate-700/40"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Swap Button Divider */}
            <div className="relative my-3 flex items-center justify-center">
              <div className="w-full border-t border-slate-800/80" />
              <button
                type="button"
                onClick={swap}
                title="Swap Currencies"
                aria-label="Swap currencies"
                className={`absolute rounded-full border border-indigo-500/40 bg-gradient-to-br from-indigo-600 to-indigo-700 p-2.5 text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-110 hover:shadow-indigo-500/50 active:scale-95 ${
                  isSwapping ? "rotate-180" : "rotate-0"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </div>

            {/* To Input Box */}
            <div className="relative">
              <Input
                label="You Get"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(curr) => setTo(curr)}
                selectCurrency={to}
                amountDisable={true}
              />

              {/* Copy Button */}
              {convertedAmount > 0 && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute right-4 bottom-3.5 inline-flex items-center gap-1 rounded-lg bg-slate-800/90 border border-slate-700/60 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                >
                  {copied ? (
                    <>
                      <span className="text-emerald-400 font-bold">✓ Copied</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Live Exchange Rate Info Badge */}
            {rate && (
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/40 p-3 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  <span>
                    1 <span className="font-semibold text-slate-200 uppercase">{from}</span> ={" "}
                    <span className="font-semibold text-indigo-400">
                      {rate.toFixed(4)}
                    </span>{" "}
                    <span className="font-semibold text-slate-200 uppercase">{to}</span>
                  </span>
                </div>
                {inverseRate && (
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    (1 {to.toUpperCase()} ≈ {inverseRate} {from.toUpperCase()})
                  </span>
                )}
              </div>
            )}

            {/* Submit / Action Button */}
            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:shadow-indigo-500/50 hover:brightness-110 active:scale-[0.99]"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-8 text-center text-xs text-slate-400">
        <p>Market rates updated in real-time. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}