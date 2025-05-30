import {
  COMPANIES_LOGOS,
  MIN_AUDIENCE_DESCRIPTION_COUNT,
  MIN_LEARNING_OBJECTIVES_COUNT,
  MIN_PREREQUISITES_COUNT,
  UDEMY_BUISNESS_USERS_IMAGES_URLS,
} from "@/constants";
import { TCourse } from "@/types";
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

export function isStringArray(value: unknown) {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
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

export function secondsToHours(seconds: number): number {
  return parseFloat((seconds / 60 / 60).toFixed(2));
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

export function getCompanyNameFromUrl(
  imageUrl:
    | (typeof UDEMY_BUISNESS_USERS_IMAGES_URLS)[number]
    | (typeof COMPANIES_LOGOS)[number]
) {
  return imageUrl.split("/").at(-1)?.split(".").at(0);
}

export function getVideoDuration(file: File) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve(video.duration); // duration in seconds
    };

    video.onerror = () => {
      reject(new Error("Failed to load video metadata."));
    };

    video.src = URL.createObjectURL(file);
  });
}

export function instructorCourseCompletionPercentage(course: TCourse): number {
  const {
    imageUrl,
    title,
    language,
    whoThisCourseIsFor,
    whatYouWillLearn,
    requirements,
  } = course;

  const courseCompletionCriteria = [
    imageUrl,
    title,
    language,
    whoThisCourseIsFor.filter((item) => item.trim() != "").length >=
      MIN_AUDIENCE_DESCRIPTION_COUNT,
    whatYouWillLearn.filter((item) => item.trim() != "").length >=
      MIN_LEARNING_OBJECTIVES_COUNT,
    requirements.filter((item) => item.trim() != "").length >=
      MIN_PREREQUISITES_COUNT,
  ];

  return Math.floor(
    (courseCompletionCriteria.filter(Boolean).length /
      courseCompletionCriteria.length) *
      100
  );
}
