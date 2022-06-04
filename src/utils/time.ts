export const сoncatTimeToNumber = (
  values: string,
  pos: number[],
  isNumber?: boolean,
) => {
  const finalString = pos.reduce((sum, el) => {
    return sum + values[el];
  }, '');
  if (isNumber) return +finalString;
  return finalString;
};
