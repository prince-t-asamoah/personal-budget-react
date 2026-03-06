export const validatePositiveAmount = (
  value: unknown,
  fieldLabel = "Amount",
) => {
  if (!Number.isFinite(value)) {
    return true;
  }

  return (value as number) > 0 || `${fieldLabel} must be greater than zero`;
};