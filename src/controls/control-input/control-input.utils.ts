import type { RefObject } from 'react';

export const isDigit = (char: string) => /\d/.test(char);

export const isSeparator = (char: string, mask: string) => !!char.match(getSeparatorRegExp(mask));

export const getRegExp = (str: string) => new RegExp(`[${[...new Set(str.match(/[A-Za-z]/g))].join('')}]`);

export const getSeparatorRegExp = (mask: string) => {
  const separators = [...new Set(mask.replace(/[A-Z]/g, ''))].join('').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`[${separators}]`);
};

export const getFirstNotEnteredCharIndex = (str: string, mask: string) =>
  str.match(getRegExp(mask))?.index ?? str.length;

export const getPreviousChar = (str: string, position: number) => (position > 1 ? str[position - 2] : '');

export const getNextChar = (str: string, position: number) => (position > 1 ? str[position] : '');

export const applyMask = (str: string, mask: string, index: number) => {
  if (index < 0 || index >= str.length) return str;
  return str.slice(0, index) + mask[index] + str.slice(index + 1);
};

export const replaceCharByIndex = (str: string, index: number, newChar: string) => {
  if (index < 0 || index >= str.length) return str;
  return str.slice(0, index) + newChar + str.slice(index + 1);
};

export const setCursorPosition = (ref: RefObject<HTMLInputElement>, position: number) => {
  setTimeout(() => ref.current?.setSelectionRange(position, position), 10);
};
