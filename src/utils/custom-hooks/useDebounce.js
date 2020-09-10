import React from 'react';
import debounce from 'lodash/debounce';

export default function useDebounce(fn, time, options) {
  const ref = React.useRef(debounce(fn, time, options));
  return ref.current;
}