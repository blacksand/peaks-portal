export function toCapitalize(value: string) {
  return value && `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}
