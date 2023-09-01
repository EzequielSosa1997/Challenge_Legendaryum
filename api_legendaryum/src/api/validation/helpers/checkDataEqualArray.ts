export const checkRepeatContentArray = (array: number[] | string[]) =>
  [...new Set([...array]).keys()].length !== array.length

