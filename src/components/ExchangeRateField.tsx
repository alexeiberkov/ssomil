interface ExchangeRateFieldProps {
  value: number;
  onChange: (value: number) => void;
}

export function ExchangeRateField({ value, onChange }: ExchangeRateFieldProps) {
  return (
    <div className="field">
      <label htmlFor="exchange-rate">Exchange rate</label>
      <div className="exchange-rate">
        <span className="exchange-rate__prefix">$1 USD = £</span>
        <input
          id="exchange-rate"
          className="exchange-rate__input"
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (Number.isFinite(next) && next >= 0) {
              onChange(next);
            }
          }}
        />
      </div>
    </div>
  );
}
