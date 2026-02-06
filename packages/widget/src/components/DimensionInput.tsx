import React from 'react';

interface DimensionInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string | null;
  min: number | null;
  max: number | null;
  error: string | null;
}

/**
 * Text input for dimension (width or height) with validation.
 *
 * - Shows unit as suffix (e.g., "cm")
 * - Shows dimension range as placeholder/helper text
 * - Shows inline validation error below input
 * - Uses inputMode="decimal" for mobile numeric keyboard
 */
export function DimensionInput(props: DimensionInputProps) {
  const { label, value, onChange, unit, min, max, error } = props;

  // Build placeholder text from range
  const placeholder = min !== null && max !== null
    ? `${min} - ${max}`
    : '';

  // Build helper text
  const helperText = min !== null && max !== null && unit
    ? `${min} - ${max} ${unit}`
    : '';

  return (
    <div className="pm-dimension-input">
      <label className="pm-dimension-label">{label}</label>
      <div className="pm-dimension-field-wrapper">
        <input
          type="text"
          inputMode="decimal"
          className="pm-dimension-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        {unit && <span className="pm-dimension-unit">{unit}</span>}
      </div>
      {helperText && !error && (
        <div className="pm-dimension-helper">{helperText}</div>
      )}
      {error && (
        <div className="pm-dimension-error">{error}</div>
      )}
    </div>
  );
}
