import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from 'crypto-js';



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num.toString();
  }
}

export function generateString(n: number): string {
  const letters1 = "abcdefghijklmnopqrstuvwxyz";
  const letters2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const charset = letters1 + letters2 + numbers;
  const charsetLength = charset.length;
  let result = "";
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    result += charset.charAt(randomIndex);
  }
  return result;
}
export function formatDate(date: Date | null | string, type: "fr" | "en"): string {
  if (!date) return '--/--/----'; 

  const parsedDate = typeof date === 'string' ? new Date(date) : date; 

  const options: Intl.DateTimeFormatOptions = type === "fr"
    ? { year: "numeric", month: "long", day: "numeric" }
    : { year: "numeric", month: "numeric", day: "numeric" };
  
  return parsedDate.toLocaleDateString(type, options);
}

type Data = string | number;

// Function to encrypt data
export const encryptData = (data: Data): string | null => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  if (!secretKey) {
    console.error("Secret key is not provided in environment variable NEXT_PUBLIC_SECRET_KEY");
    return null;
  }
  return CryptoJS.AES.encrypt(data.toString(), secretKey).toString();
};

// Function to decrypt data
export const decryptData = (encryptedData: string): Data | null => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  if (!secretKey) {
    console.error("Secret key is not provided in environment variable NEXT_PUBLIC_SECRET_KEY");
    return null;
  }
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  // Parse the decrypted data to number if it's a valid number
  const numberValue = parseFloat(decryptedData);
  if (!isNaN(numberValue)) {
    return numberValue;
  }
  return decryptedData;
};

export const calculatePaginationArray =  (page: number, totalPages: number) : number[] => {
  const paginationArray = [];
  let startPage = Math.max(1, page - 4);
  let endPage = Math.min(totalPages, startPage + 9);

  for (let i = startPage; i <= endPage; i++) {
      paginationArray.push(i);
  }

  if (totalPages > 10) {
      paginationArray.push(totalPages - 2, totalPages - 1, totalPages);
  }

  return paginationArray;
}




