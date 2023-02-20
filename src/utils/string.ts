const english_ordinal_rules = new Intl.PluralRules("en", { type: "ordinal" });
const suffixes = {
  zero: "th",
  one: "st",
  two: "nd",
  few: "rd",
  many: "th",
  other: "th",
};
export const ordinalOfNumber = (number: number): string => {
  const category = english_ordinal_rules.select(number);
  const suffix = suffixes[category];
  return number + suffix;
};
