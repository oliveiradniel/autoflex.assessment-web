export function truncateString(text: string, number: number) {
  return `${text?.slice(0, number)} ${text?.length > number ? '...' : ''}`;
}
