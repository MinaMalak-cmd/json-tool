'use strict';

/**
 * Validates whether the given string is valid JSON.
 * @param {string} input - The string to validate.
 * @returns {{ valid: boolean, error: string|null }}
 */
function validate(input) {
  if (typeof input !== 'string') {
    return { valid: false, error: 'Input must be a string' };
  }
  try {
    JSON.parse(input);
    return { valid: true, error: null };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}

/**
 * Formats (prettifies) the given JSON string with the specified indentation.
 * @param {string} input - The JSON string to format.
 * @param {number} [indent=2] - Number of spaces for indentation.
 * @returns {{ result: string|null, error: string|null }}
 */
function format(input, indent = 2) {
  try {
    const parsed = JSON.parse(input);
    return { result: JSON.stringify(parsed, null, indent), error: null };
  } catch (e) {
    return { result: null, error: e.message };
  }
}

/**
 * Minifies the given JSON string by removing unnecessary whitespace.
 * @param {string} input - The JSON string to minify.
 * @returns {{ result: string|null, error: string|null }}
 */
function minify(input) {
  try {
    const parsed = JSON.parse(input);
    return { result: JSON.stringify(parsed), error: null };
  } catch (e) {
    return { result: null, error: e.message };
  }
}

/**
 * Returns the keys of a JSON object or the length of a JSON array.
 * @param {string} input - The JSON string to inspect.
 * @returns {{ result: string[]|number|null, error: string|null }}
 */
function getKeys(input) {
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      return { result: parsed.length, error: null };
    }
    if (parsed !== null && typeof parsed === 'object') {
      return { result: Object.keys(parsed), error: null };
    }
    return { result: null, error: 'Input is not a JSON object or array' };
  } catch (e) {
    return { result: null, error: e.message };
  }
}

module.exports = { validate, format, minify, getKeys };
