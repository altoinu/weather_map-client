export function getCurrentMonthInString(date: Date) {
  const month = date.getMonth() + 1;
  return (month < 10 ? 0 : "") + month.toString();
}

export function getDateString(date: Date) {
  return (
    date.getFullYear().toString() +
    "-" +
    getCurrentMonthInString(date) +
    "-" +
    (date.getDate() < 10 ? 0 : "") +
    date.getDate().toString()
  );
}
