// Dynamic Rug Pricing calculator and dimension parser helper utilities

export interface ParsedDimensions {
  width: number;
  length: number;
  area: number;
}

/**
 * Extracts the dynamic dimensions (Width and Length in feet) from a size string.
 * Supports "4x6", "4 x 6", "4x6 ft", "4 × 6", "4 × 6 ft", "4X6 ft" etc.
 */
export function parseDimensions(sizeStr: string): ParsedDimensions | null {
  if (!sizeStr) return null;
  // Match standard patterns of digits separated by x, X, ×, or word 'by'
  const regex = /(\d+)\s*(?:x|X|×|by)\s*(\d+)/;
  const match = sizeStr.match(regex);
  if (match) {
    const width = parseInt(match[1], 10);
    const length = parseInt(match[2], 10);
    if (!isNaN(width) && !isNaN(length)) {
      return {
        width,
        length,
        area: width * length,
      };
    }
  }
  return null;
}

/**
 * Calculates dynamic price for a given size and pricing rate per sq ft.
 * Ensures conversion from INR to USD if currency is USD.
 */
export function calculateDynamicPrice(
  sizeStr: string,
  ratePerSqFt: number = 700,
  currency: 'INR' | 'USD' = 'INR'
): number {
  const dims = parseDimensions(sizeStr);
  if (!dims) return 0;
  
  const priceINR = dims.area * ratePerSqFt;
  if (currency === 'INR') {
    return priceINR;
  } else {
    // 1 USD = 80 INR based on database baseline products (88,000 INR = 1,100 USD)
    // Round to keep prices clean
    return Math.round(priceINR / 80);
  }
}
