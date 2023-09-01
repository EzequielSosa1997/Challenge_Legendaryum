
export const isNotNumber = (value: any) =>
  typeof value !== "number" || Number.isNaN(value);
