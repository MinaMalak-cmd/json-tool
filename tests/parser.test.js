'use strict';

const { validate, format, minify, getKeys } = require('../src/parser');

describe('validate', () => {
  test('returns valid for a valid JSON object', () => {
    expect(validate('{"key":"value"}')).toEqual({ valid: true, error: null });
  });

  test('returns valid for a valid JSON array', () => {
    expect(validate('[1,2,3]')).toEqual({ valid: true, error: null });
  });

  test('returns valid for a JSON string', () => {
    expect(validate('"hello"')).toEqual({ valid: true, error: null });
  });

  test('returns valid for a JSON number', () => {
    expect(validate('42')).toEqual({ valid: true, error: null });
  });

  test('returns valid for null', () => {
    expect(validate('null')).toEqual({ valid: true, error: null });
  });

  test('returns invalid for malformed JSON', () => {
    const result = validate('{key: "value"}');
    expect(result.valid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  test('returns invalid for an empty string', () => {
    const result = validate('');
    expect(result.valid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  test('returns invalid when input is not a string', () => {
    const result = validate(123);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Input must be a string');
  });
});

describe('format', () => {
  test('prettifies compact JSON with default indentation', () => {
    const result = format('{"a":1,"b":2}');
    expect(result.error).toBeNull();
    expect(result.result).toBe('{\n  "a": 1,\n  "b": 2\n}');
  });

  test('respects custom indentation', () => {
    const result = format('{"a":1}', 4);
    expect(result.error).toBeNull();
    expect(result.result).toBe('{\n    "a": 1\n}');
  });

  test('formats a JSON array', () => {
    const result = format('[1,2,3]');
    expect(result.error).toBeNull();
    expect(result.result).toBe('[\n  1,\n  2,\n  3\n]');
  });

  test('returns error for invalid JSON', () => {
    const result = format('{bad json}');
    expect(result.result).toBeNull();
    expect(result.error).toBeTruthy();
  });
});

describe('minify', () => {
  test('removes whitespace from formatted JSON', () => {
    const input = '{\n  "a": 1,\n  "b": 2\n}';
    const result = minify(input);
    expect(result.error).toBeNull();
    expect(result.result).toBe('{"a":1,"b":2}');
  });

  test('leaves already-minified JSON unchanged', () => {
    const result = minify('{"a":1}');
    expect(result.error).toBeNull();
    expect(result.result).toBe('{"a":1}');
  });

  test('returns error for invalid JSON', () => {
    const result = minify('{bad}');
    expect(result.result).toBeNull();
    expect(result.error).toBeTruthy();
  });
});

describe('getKeys', () => {
  test('returns keys for a JSON object', () => {
    const result = getKeys('{"a":1,"b":2}');
    expect(result.error).toBeNull();
    expect(result.result).toEqual(['a', 'b']);
  });

  test('returns array length for a JSON array', () => {
    const result = getKeys('[1,2,3]');
    expect(result.error).toBeNull();
    expect(result.result).toBe(3);
  });

  test('returns error for non-object primitives', () => {
    const result = getKeys('"hello"');
    expect(result.result).toBeNull();
    expect(result.error).toBeTruthy();
  });

  test('returns error for invalid JSON', () => {
    const result = getKeys('{bad}');
    expect(result.result).toBeNull();
    expect(result.error).toBeTruthy();
  });
});
