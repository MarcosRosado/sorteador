import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Stores the list of items to be drawed
export function getStoredList () {
  const storedList = localStorage.getItem('listSorteio');
  return storedList ? JSON.parse(storedList) : [];
}

// Returns the list of items that were drawed
export function getDrawedItems () {
  const storedItems = localStorage.getItem('drawedItems');
  return storedItems ? JSON.parse(storedItems) : [];
}

// Returns the latest item that was drawed
export function getLatestItem  () {
  const storedItem = localStorage.getItem('latestItem');
  return storedItem ? JSON.parse(storedItem) : null;
}

// Returns the items that are not in the drawed items list
export function getRemainingItems (list: string[], drawedItems: string[]) {
  return list.filter(item => !drawedItems.includes(item));
}