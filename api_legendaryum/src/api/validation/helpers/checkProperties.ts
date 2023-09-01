export const isNotProperties = (object: object, keys: string[]) => {
  const keysObject = Object.keys(object ?? []);
  if (!keysObject[0]) return true;
  const keysSet = new Set(keys);
  const keysObjectSet = new Set(keysObject);
  for (const key of keysSet) if (!keysObjectSet.has(key)) return true;
  return false;
};
