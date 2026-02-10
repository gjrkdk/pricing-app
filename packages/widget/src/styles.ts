/**
 * CSS for Shadow DOM injection.
 *
 * Exported as a string constant to be injected via <style> tag.
 * Uses .ts file (not .css) to avoid CSS import issues in Vite library mode.
 *
 * All classes use pm- prefix to avoid collisions.
 * All colors/sizes use CSS custom properties for theming.
 */
export const widgetStyles = `
  /* CSS custom property defaults */
  :host {
    --pm-primary-color: #5c6ac4;
    --pm-text-color: #202223;
    --pm-border-color: #c9cccf;
    --pm-border-radius: 8px;
    --pm-font-size: 14px;
    --pm-error-color: #d72c0d;
  }

  /* Widget container */
  .pm-widget {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: var(--pm-font-size);
    color: var(--pm-text-color);
    max-width: 400px;
    box-sizing: border-box;
  }

  .pm-widget *,
  .pm-widget *::before,
  .pm-widget *::after {
    box-sizing: border-box;
  }

  /* Dimension input wrapper */
  .pm-dimension-input {
    margin-bottom: 16px;
  }

  .pm-dimension-label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
    font-size: var(--pm-font-size);
    color: var(--pm-text-color);
  }

  .pm-dimension-field-wrapper {
    position: relative;
  }

  .pm-dimension-field {
    width: 100%;
    padding: 10px 40px 10px 12px;
    border: 1px solid var(--pm-border-color);
    border-radius: var(--pm-border-radius);
    font-size: var(--pm-font-size);
    font-family: inherit;
    color: var(--pm-text-color);
    transition: border-color 0.15s ease;
  }

  .pm-dimension-field:focus {
    outline: none;
    border-color: var(--pm-primary-color);
    box-shadow: 0 0 0 1px var(--pm-primary-color);
  }

  .pm-dimension-field--error {
    border-color: var(--pm-error-color);
  }

  .pm-dimension-field--error:focus {
    border-color: var(--pm-error-color);
    box-shadow: 0 0 0 1px var(--pm-error-color);
  }

  .pm-dimension-unit {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #637381;
    font-size: var(--pm-font-size);
    pointer-events: none;
  }

  .pm-dimension-helper {
    margin-top: 4px;
    font-size: 12px;
    color: #637381;
  }

  .pm-dimension-error {
    margin-top: 4px;
    font-size: 12px;
    color: var(--pm-error-color);
    font-weight: 500;
  }

  /* Price display */
  .pm-price-display {
    margin: 20px 0;
    min-height: 36px;
  }

  .pm-price-value {
    font-size: 24px;
    font-weight: bold;
    color: var(--pm-text-color);
  }

  .pm-price-error {
    color: var(--pm-error-color);
    font-size: var(--pm-font-size);
  }

  /* Loading skeleton */
  .pm-skeleton {
    width: 120px;
    height: 32px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: pm-shimmer 1.5s infinite;
    border-radius: 4px;
  }

  @keyframes pm-shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* Quantity selector */
  .pm-quantity {
    margin-bottom: 16px;
  }

  .pm-quantity-label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
    font-size: var(--pm-font-size);
    color: var(--pm-text-color);
  }

  .pm-quantity-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .pm-quantity-btn {
    width: 32px;
    height: 32px;
    border: 1px solid var(--pm-border-color);
    border-radius: var(--pm-border-radius);
    background: white;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    color: var(--pm-text-color);
    transition: background-color 0.15s ease, opacity 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pm-quantity-btn:hover:not(:disabled) {
    background-color: #f6f6f7;
  }

  .pm-quantity-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .pm-quantity-value {
    min-width: 30px;
    text-align: center;
    font-size: var(--pm-font-size);
    font-weight: 600;
    color: var(--pm-text-color);
  }

  /* Option group selector */
  .pm-option-group {
    margin-bottom: 16px;
  }

  .pm-option-label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
    font-size: var(--pm-font-size);
    color: var(--pm-text-color);
  }

  .pm-option-select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--pm-border-color);
    border-radius: var(--pm-border-radius);
    font-size: var(--pm-font-size);
    font-family: inherit;
    color: var(--pm-text-color);
    background: white;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23637381' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 32px;
  }

  .pm-option-select:focus {
    outline: none;
    border-color: var(--pm-primary-color);
    box-shadow: 0 0 0 1px var(--pm-primary-color);
  }

  /* Add to Cart button */
  .pm-add-to-cart {
    width: 100%;
    padding: 14px 20px;
    background: var(--pm-primary-color);
    color: white;
    font-weight: bold;
    font-size: var(--pm-font-size);
    border: none;
    border-radius: var(--pm-border-radius);
    cursor: pointer;
    transition: background-color 0.15s ease, opacity 0.15s ease;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
  }

  .pm-add-to-cart:hover:not(:disabled) {
    background: color-mix(in srgb, var(--pm-primary-color) 85%, black);
  }

  .pm-add-to-cart:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Loading spinner (CSS only) */
  .pm-add-to-cart-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: pm-spin 0.6s linear infinite;
  }

  @keyframes pm-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
