import React, { useId } from 'react';

function Input({
  // Modern prop names with backwards compatibility for legacy props
  label,
  Label,
  amount,
  onCurrencyChange,
  OnCurrencyChange,
  onAmountChange,
  OnAmoutChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  amoutDisable = false,
  currencyDisable = false,
  className = "",
  helperText = "",
}) {
  const amountInputId = useId();

  const activeLabel = label || Label || "Amount";
  const isAmountDisabled = amountDisable || amoutDisable;
  const handleCurrencyChange = onCurrencyChange || OnCurrencyChange;
  const handleAmountChange = onAmountChange || OnAmoutChange;

  return (
    <div
      className={`group relative rounded-2xl bg-slate-900/80 border border-slate-800/80 p-4 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={amountInputId}
          className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-focus-within:text-indigo-400 transition-colors"
        >
          {activeLabel}
        </label>
        <span className="text-xs font-medium text-slate-400">
          Currency
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Number Input Field */}
        <div className="relative flex-1">
          <input
            id={amountInputId}
            type="number"
            min="0"
            step="any"
            className="w-full bg-transparent text-2xl font-bold text-white placeholder-slate-600 outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0.00"
            value={amount}
            disabled={isAmountDisabled}
            onChange={(e) => {
              if (!handleAmountChange) return;
              const val = e.target.value;
              handleAmountChange(val === "" ? "" : Number(val));
            }}
          />
        </div>

        {/* Currency Dropdown Selector */}
        <div className="relative shrink-0">
          <div className="flex items-center gap-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700/60 px-3 py-2 transition-all shadow-inner focus-within:border-indigo-400">
            <span className="text-xs font-bold text-indigo-400 uppercase">
              {selectCurrency?.slice(0, 3)}
            </span>
            <select
              aria-label={`${activeLabel} currency selector`}
              className="bg-transparent text-sm font-semibold uppercase text-slate-100 outline-none cursor-pointer pr-1 disabled:cursor-not-allowed"
              value={selectCurrency}
              onChange={(e) => handleCurrencyChange && handleCurrencyChange(e.target.value)}
              disabled={currencyDisable}
            >
              {currencyOptions.map((curr) => (
                <option
                  key={curr}
                  value={curr}
                  className="bg-slate-900 text-slate-100 font-medium py-1"
                >
                  {curr.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {helperText && (
        <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
          <span>{helperText}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
