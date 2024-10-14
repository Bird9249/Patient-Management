export function isAtLeast18YearsOld(dateOfBirth: string): boolean {
  const currentDate = new Date(); // Current date
  const dob = new Date(dateOfBirth); // Date of birth

  // Calculate the difference in years
  const age = currentDate.getFullYear() - dob.getFullYear();

  // Check if the person has already had their birthday this year
  const monthDifference = currentDate.getMonth() - dob.getMonth();
  const dayDifference = currentDate.getDate() - dob.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    return age - 1 >= 18;
  } else {
    return age >= 18;
  }
}
