export function formatCurrency(currency) {
  return new Intl.NumberFormat('de-DE').format(currency);
}

export function formatNumberToSocialStyle(value) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase();
}