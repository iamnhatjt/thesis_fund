export function convertDateTime(date) {
  const dateConvert = new Date(date);
  return dateConvert.toLocaleDateString();
}
