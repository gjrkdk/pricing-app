import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import type { PriceApiResponse } from '../types';

interface UsePriceFetchOptions {
  apiUrl: string;
  apiKey: string;
  productId: string;
}

interface UsePriceFetchReturn {
  width: string;
  height: string;
  setWidth: (v: string) => void;
  setHeight: (v: string) => void;
  price: number | null;
  total: number | null;
  loading: boolean;
  error: string | null;
  currency: string | null;
  unit: string | null;
  dimensionRange: PriceApiResponse['dimensionRange'] | null;
}

/**
 * Manages debounced price fetching lifecycle.
 *
 * - Debounces width/height at 400ms
 * - Fetches price from REST API with X-API-Key header
 * - Returns price, loading, error, currency, dimensionRange, unit
 * - On first successful fetch, stores dimensionRange and currency (these don't change for a product)
 * - Only fetches when both debounced width and height are non-empty and numeric
 * - Uses AbortController to cancel in-flight requests when inputs change
 * - Handles RFC 7807 error responses
 */
export function usePriceFetch(
  options: UsePriceFetchOptions,
  quantity: number = 1
): UsePriceFetchReturn {
  const { apiUrl, apiKey, productId } = options;

  // Raw input state
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  // Debounced values (400ms)
  const [debouncedWidth] = useDebounce(width, 400);
  const [debouncedHeight] = useDebounce(height, 400);

  // Price state
  const [price, setPrice] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Metadata (fetched once on first successful response)
  const [currency, setCurrency] = useState<string | null>(null);
  const [unit, setUnit] = useState<string | null>(null);
  const [dimensionRange, setDimensionRange] = useState<PriceApiResponse['dimensionRange'] | null>(null);

  // Fetch price when debounced dimensions change
  useEffect(() => {
    // Only fetch when both dimensions are non-empty and numeric
    const w = parseFloat(debouncedWidth);
    const h = parseFloat(debouncedHeight);

    if (!debouncedWidth || !debouncedHeight || isNaN(w) || isNaN(h)) {
      // Reset price when dimensions are invalid
      setPrice(null);
      setTotal(null);
      setError(null);
      setLoading(false);
      return;
    }

    // Setup AbortController for request cancellation
    const abortController = new AbortController();

    const fetchPrice = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = new URL(`${apiUrl}/api/v1/products/${productId}/price`);
        url.searchParams.set('width', debouncedWidth);
        url.searchParams.set('height', debouncedHeight);
        url.searchParams.set('quantity', String(quantity));

        const response = await fetch(url.toString(), {
          headers: {
            'X-API-Key': apiKey,
          },
          signal: abortController.signal,
        });

        if (!response.ok) {
          // Handle RFC 7807 error response
          if (response.status === 401) {
            setError('Authentication failed');
          } else {
            const errorData = await response.json();
            setError(errorData.detail || 'Failed to fetch price');
          }
          setPrice(null);
          setTotal(null);
          setLoading(false);
          return;
        }

        const data: PriceApiResponse = await response.json();

        // Update price state
        setPrice(data.price);
        setTotal(data.total);
        setError(null);

        // Store metadata on first successful fetch (these don't change for a product)
        if (currency === null) {
          setCurrency(data.currency);
        }
        if (unit === null) {
          setUnit(data.dimensions.unit);
        }
        if (dimensionRange === null) {
          setDimensionRange(data.dimensionRange);
        }

        setLoading(false);
      } catch (err) {
        // Ignore AbortError (happens when request is cancelled)
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        setError('Network error');
        setPrice(null);
        setTotal(null);
        setLoading(false);
      }
    };

    fetchPrice();

    // Cleanup: abort in-flight request on unmount or dependency change
    return () => {
      abortController.abort();
    };
  }, [debouncedWidth, debouncedHeight, quantity, apiUrl, apiKey, productId, currency, unit, dimensionRange]);

  return {
    width,
    height,
    setWidth,
    setHeight,
    price,
    total,
    loading,
    error,
    currency,
    unit,
    dimensionRange,
  };
}
