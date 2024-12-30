export function getPluralOfCompoundName(compoundName: string): string {
  const [name, ...rest] = compoundName.split(" ");
  const pluralName = getPluralOfName(name);
  return [pluralName, ...rest].join(" ");
}

export function getPluralOfName(name: string): string {
  if (name.endsWith("ão")) {
    return name.slice(0, -2) + "ões";
  }
  if (name.endsWith("r")) {
    return name + "es";
  }
  return name + "s";
}
