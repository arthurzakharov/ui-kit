import type { RefObject } from 'react';

export const getChoiceId = (id: string, value: string, index: number) => {
  return [id, index, value.replace(/\s+/g, '-')].join('-');
};

export const containsHtml = (str?: string) => {
  return /<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>|<([a-z][a-z0-9]*)\b[^>]*\/?>/i.test(str || '');
};

export const clickHasNode = (event: MouseEvent | TouchEvent | FocusEvent, element: RefObject<HTMLElement>): boolean => {
  return Boolean(element.current && element.current.contains(event.target as Node));
};

export const findEndIndex = (inputString: string): number => {
  let endIndex = -1;
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];
    if (/\d|\//.test(char)) {
      endIndex = i;
    } else {
      break;
    }
  }
  return endIndex;
};
