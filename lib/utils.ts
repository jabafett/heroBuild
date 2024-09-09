import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Hero, Item } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateOffensiveStats = (selectedItems: Item[]) => {
  const attack = selectedItems.reduce((sum, item) => item?.stat === 'Attack' ? sum + item.value : sum, 0);
  const magic = selectedItems.reduce((sum, item) => item?.stat === 'Magic' ? sum + item.value : sum, 0);
  return { attack, magic };
};