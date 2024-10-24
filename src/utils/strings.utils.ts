/**
 * Checks if a string is empty or null or undefined.
 *
 * @param value - The string to check.
 * @returns True if the string is empty or null or undefined, false otherwise.
 */
export function isEmpty(value: string | null | undefined) {
  return value === null || value === undefined || value === '';
}

/**
 * Converts a string value to a boolean.
 *
 * @param value - The string value to convert.
 * @returns The boolean representation of the string value.
 */
export function toBoolean(value: string | null | undefined) {
  if (isEmpty(value)) return false;

  value = (value || '').toLowerCase();
  return value === 'true' || value === 'yes' || value === '1';
}
