import { useCallback, useEffect, useRef } from 'react';

// useTimeout hook: https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/fd1c0d7f95550bc1db8830539edd5e3ff867574a/src/2-useTimeout/useTimeout.js

export default function useTimeout(callback: React.EffectCallback, delay: number) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}