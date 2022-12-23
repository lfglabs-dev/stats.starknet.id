export const formatValue = (value: number, fractionDigits = 2) => new Intl.NumberFormat('en-US', {
  maximumFractionDigits: fractionDigits,
  notation: 'compact',
  compactDisplay: 'short'
}).format(value)