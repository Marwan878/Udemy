import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function specialRound(number: number) {
  const integerPart = Math.floor(number);
  // Did not use difference directly to avoid unexpected decimal arithmetic operations output
  const decimalPart = Number((number - integerPart).toFixed(1));

  if (decimalPart < 0.3) {
    return integerPart;
  } else if (decimalPart < 0.8) {
    return integerPart + 0.5;
  } else {
    return integerPart + 1;
  }
}

export function isInteger(number: number) {
  return Math.floor(number) === number;
}

export function localStorageKeyExists(key: string) {
  return window.localStorage.getItem(key) !== null;
}

export function localStorageEntryIsNotCorrupted(key: string) {
  const parsedValue = JSON.parse(window.localStorage.getItem(key) || "null");

  return (
    Array.isArray(parsedValue) &&
    parsedValue.every((item) => typeof item === "string")
  );
}

export function parseSeconds(seconds: number) {
  if (seconds < 60) return `${seconds} secs`;
  else if (seconds < 60 * 60) return `${Math.round(seconds / 60)} mins`;
  else {
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.round((seconds - hours * 60 * 60) / 60);
    return `${hours} hrs ${minutes} mins`;
  }
}

export function unixToMonthYear(unixMs: number) {
  const date = new Date(unixMs);
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

export function secondsToHours(seconds: number) {
  return Math.round(seconds / 60 / 60);
}

export function formatVideoTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export async function fileFromImageUrl(
  url: string,
  filename: string
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}
