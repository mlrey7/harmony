import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToInitials(title: string) {
  return title
    .split(" ")
    .map((word) => word.substring(0, 1))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
