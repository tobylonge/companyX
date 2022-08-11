export function formatNumber(amount) {
  return `₦${new Intl.NumberFormat().format(amount)}`
}
