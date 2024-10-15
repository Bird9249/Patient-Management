export function isDateValid(dateString: string): boolean {
  // Convert the input string to a Date object
  const inputDate = new Date(dateString);

  // Get the current date
  const today = new Date();

  // Set the time of the current date to 00:00:00 for comparison
  today.setHours(0, 0, 0, 0);

  // Return true if the input date is equal to or after today's date
  return inputDate >= today;
}

// Example usage:
const dateStr = "2024-10-13 13:15:00";
const isValid = isDateValid(dateStr);

console.log(isValid); // true if dateStr is not earlier than today
