import React, { useEffect } from 'react';
import useTimeout from './useTimeout';

// useDebounce hook: https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/fd1c0d7f95550bc1db8830539edd5e3ff867574a/src/3-useDebounce/useDebounce.js

export default function useDebounce(callback: React.EffectCallback, delay: number, deps: React.DependencyList) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...deps, reset]);
  useEffect(clear, []);
}