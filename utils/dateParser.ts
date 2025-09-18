
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

// 1. Convert DD-MM-YYYY → YYYY-MM-DD
export function parseFromDDMMYYYYWithDash(dateStr: string): string | null {
  if (!dateStr) return null;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;

  const [day, month, year] = parts.map(Number);
  if (!day || !month || !year) return null;

  return `${year.toString().padStart(4, "0")}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

// 2. Convert DD/MM/YYYY → YYYY-MM-DD
export function parseFromDDMMYYYYWithSlash(dateStr: string): string | null {
  if (!dateStr) return null;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;

  const [day, month, year] = parts.map(Number);
  if (!day || !month || !year) return null;

  return `${year.toString().padStart(4, "0")}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

// 3. Convert YYYY/MM/DD → YYYY-MM-DD
export function parseFromYYYYMMDDWithSlash(dateStr: string): string | null {
  if (!dateStr) return null;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;

  const [year, month, day] = parts.map(Number);
  if (!day || !month || !year) return null;

  return `${year.toString().padStart(4, "0")}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

export function getDateDifferenceFromToday(dateStr: string): number | null {
  if (!dateStr) return null;

  const inputDate = new Date(dateStr); // works with YYYY-MM-DD
  if (isNaN(inputDate.getTime())) return null;

  const today = new Date();

  // Strip time components to compare only dates
  const inputUTC = Date.UTC(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );
  const todayUTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diffInMs = inputUTC - todayUTC;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}
