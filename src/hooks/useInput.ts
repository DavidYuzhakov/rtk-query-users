import { useState } from "react"

export default function useInput() {
  const [value, setValue] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  const clearInput = () => {
    setValue('');
  };

  return {
    value, 
    onChange,
    clearInput,
  }
}