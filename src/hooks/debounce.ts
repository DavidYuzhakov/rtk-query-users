import { useEffect, useState } from "react";

export default function useDebounce (value: number, delay: number = 500): number {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [delay, value])

  return debounced
}