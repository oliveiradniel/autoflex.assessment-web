export function parseCurrency(value: string) {
  const onlyNumbers = value.replace(/\D/g, '');
  return Number(onlyNumbers) / 100;
}
