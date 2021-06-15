import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChan = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    reset,
    onChan
  }
}
