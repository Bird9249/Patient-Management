export function convertToCustomFormat(dateStr: string): string {
  // Convert the input string to a Date object
  const date = new Date(dateStr);

  // Extract the day, month, year, and time components
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getUTCFullYear();

  // Format hours and minutes
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  // Determine AM or PM and adjust hour format
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const formattedHours = String(hours).padStart(2, "0");

  // Return the formatted date and time string
  return `${day}/${month}/${year} ${formattedHours}:${minutes}${ampm}`;
}

// Example usage:
// const input = "2024-10-04 07:14:27.127959+00";
// console.log(convertToCustomFormat(input)); // Output: 14/10/2024 10:20AM
