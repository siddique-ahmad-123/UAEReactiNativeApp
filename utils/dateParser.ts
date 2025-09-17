
export function parseToDate(dateStr: string): Date | null {
  if (!dateStr) return null;

  // Normalize separators
  const normalized = dateStr.replace(/[-.]/g, "/"); // convert - or . into /

  const parts = normalized.split("/");

  let day: number, month: number, year: number;

  if (parts[0].length === 4) {
    // Format: yyyy/MM/dd
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10) - 1; // JS months are 0-based
    day = parseInt(parts[2], 10);
  } else {
    // Format: dd/MM/yyyy
    day = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10) - 1;
    year = parseInt(parts[2], 10);
  }

  const date = new Date(year, month, day);

  return isNaN(date.getTime()) ? null : date;
}
