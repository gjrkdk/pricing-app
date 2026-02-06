import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

/**
 * Quantity selector with +/- buttons.
 *
 * - "-" button disabled when quantity <= 1
 * - "+" button always enabled (no upper bound for v1)
 */
export function QuantitySelector(props: QuantitySelectorProps) {
  const { quantity, onChange } = props;

  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onChange(quantity + 1);
  };

  return (
    <div className="pm-quantity">
      <label className="pm-quantity-label">Quantity</label>
      <div className="pm-quantity-controls">
        <button
          type="button"
          className="pm-quantity-btn"
          onClick={handleDecrement}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="pm-quantity-value">{quantity}</span>
        <button
          type="button"
          className="pm-quantity-btn"
          onClick={handleIncrement}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
