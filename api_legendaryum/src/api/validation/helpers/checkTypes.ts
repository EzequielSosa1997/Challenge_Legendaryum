type param = Record<string, any>;
type funtionIsType = <U extends param, T extends param>(
  object: U,
  template: T
) => boolean;

export const isNotType: funtionIsType = (object, template) => {
  for (let key in template) {
    if (typeof object[key] !== typeof template[key]) {
      return true;
    }
  }
  return false;
};
