export function stringToArray(
  input: string | undefined,
  defaultValue?: string,
  separator = ';',
): string[] {
  return (input ?? defaultValue ?? '')
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean)
}
