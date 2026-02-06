import React from 'react';

interface AddToCartButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

/**
 * Add to Cart button with disabled and loading states.
 *
 * - Button disabled when disabled=true (dimensions invalid or price not loaded)
 * - Shows CSS spinner when loading=true (Draft Order being created)
 * - Uses var(--pm-primary-color) for background
 */
export function AddToCartButton(props: AddToCartButtonProps) {
  const { onClick, disabled, loading } = props;

  return (
    <button
      type="button"
      className="pm-add-to-cart"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="pm-add-to-cart-spinner"></span>
      ) : (
        'Add to Cart'
      )}
    </button>
  );
}
