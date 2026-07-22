const ELLIPSIS = "...";

export function ellipsis(value: string, maxLength: number) {
  if (value.length < maxLength) return value;

  return value.substring(0, maxLength - ELLIPSIS.length) + ELLIPSIS;
}
