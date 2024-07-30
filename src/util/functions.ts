export const formatCurrency = (sum: number): string => {
  return "$" + sum.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
