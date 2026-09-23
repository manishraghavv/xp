import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPhoneNumber(phone: string) {
  return phone.replace(/[^+\d]/g, "");
}
