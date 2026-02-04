  export const formatCurrency = (amount: number, currency = "GHS") => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  export const getProgressPercentage = (spent: number, allocated: number) => {
    if (allocated === 0) return 0;
    return Math.min((spent / allocated) * 100, 100);
  };

  export const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "#C76D6D";
    if (percentage >= 70) return "#D4A574";
    return "var(--sage)";
  };

