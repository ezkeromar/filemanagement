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
type ConversionUnit = 'GB' | 'MB' | 'BYTE' | 'TB';

export const convertSize = (value: number, from: ConversionUnit, to: ConversionUnit): number => {
    // Define conversion factors
    const conversionFactors: { [key in ConversionUnit]: { [key in ConversionUnit]: number } } = {
        'GB': {
            'TB': 1 / 1024,
            'GB': 1,
            'MB': 1024,
            'BYTE': 1024 * 1024 * 1024
        },
        'MB': {
            'TB': 1 / (1024 * 1024),
            'GB': 1 / 1024,
            'MB': 1,
            'BYTE': 1024 * 1024
        },
        'BYTE': {
            'TB': 1 / (1024 * 1024 * 1024 * 1024),
            'GB': 1 / (1024 * 1024 * 1024),
            'MB': 1 / (1024 * 1024),
            'BYTE': 1
        },
        'TB': {
            'TB': 1,
            'GB': 1024,
            'MB': 1024 * 1024,
            'BYTE': 1024 * 1024 * 1024
        }
    };

    if (!conversionFactors[from] || !conversionFactors[from][to]) {
        throw new Error('Invalid conversion units');
    }

    return value * conversionFactors[from][to];
}


