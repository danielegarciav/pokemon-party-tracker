/** Converts `kebab-case` to `Title Case`. */
export const kebabCaseToTitleCase = (str: string) =>
  str[0].toUpperCase() + str.slice(1).replace(/-([a-z])/g, (_, letter) => ' ' + letter.toUpperCase());
