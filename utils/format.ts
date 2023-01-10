export const formatValue = (value: number, fractionDigits = 2) => new Intl.NumberFormat('en-US', {
  maximumFractionDigits: fractionDigits,
  notation: 'compact',
  compactDisplay: 'short'
}).format(value)

export const formatDomain = (domain: string) => {
  const cleanedDomain = domain.replace('.stark', '');
  return cleanedDomain;
}