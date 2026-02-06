import React, { useMemo } from 'react';

interface PriceDisplayProps {
  price: number | null;
  currency: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * Price display with loading skeleton and error states.
 *
 * - When price === null && !loading && !error: render nothing (empty initial state)
 * - When loading: render CSS shimmer skeleton
 * - When error: render error message
 * - When price + currency: format with Intl.NumberFormat
 *
 * Uses custom CSS shimmer animation (NOT react-loading-skeleton) for Shadow DOM compatibility.
 */
export function PriceDisplay(props: PriceDisplayProps) {
  const { price, currency, loading, error } = props;

  // Cache NumberFormat instance
  const formatter = useMemo(() => {
    if (!currency) return null;
    return new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency,
    });
  }, [currency]);

  // Empty initial state
  if (price === null && !loading && !error) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <div className="pm-price-display">
        <div className="pm-skeleton"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="pm-price-display">
        <div className="pm-price-error">{error}</div>
      </div>
    );
  }

  // Price state
  if (price !== null && formatter) {
    return (
      <div className="pm-price-display">
        <div className="pm-price-value">{formatter.format(price)}</div>
      </div>
    );
  }

  // Fallback (shouldn't happen)
  return null;
}
