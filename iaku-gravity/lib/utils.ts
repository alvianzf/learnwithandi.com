import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters except leading + if we wanted to keep it, but requirement says "without + sign"
  // Actually requirement says: "without the + sign" for login.
  // And for storage/search, plan said: "No +, 08 -> 62"
  
  let cleaned = phone.replace(/\D/g, ''); // Remove all non-digits

  // If starts with 08, replace with 62
  if (cleaned.startsWith('08')) {
    cleaned = '62' + cleaned.slice(2);
  }
  
  // If starts with 62, keep it.
  // If starts with 8..., assume 628... ? No, safe to assume user might type 62...
  
  return cleaned;
}
