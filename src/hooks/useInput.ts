import { useState, useEffect } from "react"

interface IValidations {
  minLength: number;
  isEmpty: boolean
}

const useValidation = (value: any, validations: IValidations) => {

  const [isEmpty, setIsEmpty] = useState(false)
  const [minLengthError, setMinLengthError] = useState(false)


  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
          break
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true)
          break
      }
    }
  }, [value])

  return {
    isEmpty,
    minLengthError,
  }
}

export const useInput = (initialState: any, validations: IValidations) => {
  const [value, setValue] = useState(initialState)
  const [isDirty, setIsDirty] = useState(false)
  const valid = useValidation(value, validations)
  const [errorMessage, setErrorMessage] = useState('')
  const [error, setError] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    setIsDirty(true)
  }

  useEffect(() => {
    if (isDirty && (valid.isEmpty || valid.minLengthError)) {
      setErrorMessage('Error')
      setError(true)
    } else {
      setErrorMessage('')
      setError(false)
    }
  }, [isDirty, valid.isEmpty, valid.minLengthError])

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
    errorMessage,
    error
  }

}