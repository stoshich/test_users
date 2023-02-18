import { useState, useEffect } from "react"

interface IValidations {
  isEmpty: boolean;
  isUsername?: boolean;
  isPassword?: boolean
}

const useValidation = (value: any, validations: IValidations) => {

  const [isEmpty, setIsEmpty] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)



  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true)
          break
        case 'isUsername':
          const reEmail = /^[A-Za-z]\w{7,14}$/
          reEmail.test(String(value)) ? setUsernameError(false) : setUsernameError(true)
          break
        case 'isPassword':
          const rePass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          rePass.test(String(value)) ? setPasswordError(false) : setPasswordError(true)
          break
      }
    }
  }, [value])

  return {
    isEmpty,
    usernameError,
    passwordError
  }
}

export const useInput = (initialState: any, validations: IValidations) => {
  const [value, setValue] = useState(initialState)
  const [isDirty, setIsDirty] = useState(false)
  const valid = useValidation(value, validations)
  const [errorMessage, setErrorMessage] = useState('')
  const [error, setError] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(true)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    setIsDirty(true)
  }

  useEffect(() => {
    if (isDirty && (valid.isEmpty || valid.usernameError || valid.passwordError)) {
      if (validations.isPassword) {
        setErrorMessage('Пароль должен быть больше 7 символов и содержать цифры, строчные и заглавные буквы')
      } else if (validations.isUsername) {
        setErrorMessage('Username должен быть не меньше 8 и не больше 15 символов')
      }
      setError(true)
    } else {
      setErrorMessage('')
      setError(false)
    }
  }, [isDirty, valid.isEmpty, valid.usernameError, valid.passwordError])

  useEffect(() => {
    if (valid.isEmpty || valid.usernameError || valid.passwordError) {
      setDisabledBtn(true)
    } else {
      setDisabledBtn(false)
    }
  }, [valid.isEmpty, valid.usernameError, valid.passwordError])

  return {
    value,
    onChange,
    onBlur,
    errorMessage,
    error,
    disabledBtn
  }

}