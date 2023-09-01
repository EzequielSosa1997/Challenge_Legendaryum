export const isNotId = (id: number) =>
  !id || typeof id !== "number" || Number.isNaN(id);

