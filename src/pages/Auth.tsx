import { Alert, Box, Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useInput } from '../hooks/useInput'
import { loginPost } from '../HTTP/login'

const Auth = () => {

  const username = useInput('', { isEmpty: true, isUsername: true })
  const password = useInput('', { isEmpty: true, isPassword: true })
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')

  const onLoginHandler = async () => {
    try {
      const response = await loginPost(username.value, password.value)
      localStorage.setItem('token', 'Token ' + response.token)
      setLoginError('')
      navigate('/users')
    } catch (error: any) {
      console.log(error)
      setLoginError(error.response.data.non_field_errors[0])
    }
  }

  return (
    <div className='auth'>
      <div className='auth__input'>
        <TextField
          fullWidth
          error={username.error}
          id='username'
          label='Username'
          value={username.value}
          onChange={e => username.onChange(e)}
          onBlur={username.onBlur}
          helperText={username.errorMessage}
        />
      </div>
      <div className='auth__input'>
        <TextField
          fullWidth
          error={password.error}
          id='password'
          label='Password'
          type='password'
          value={password.value}
          onChange={e => password.onChange(e)}
          onBlur={password.onBlur}
          helperText={password.errorMessage}
        />
      </div>
      <div className='auth__btn'>
        <Button
          fullWidth
          disabled={password.disabledBtn || username.disabledBtn}
          variant='contained'
          onClick={onLoginHandler}
        >
          Войти
        </Button>
        {loginError && <Alert severity='error'>{loginError}</Alert>}
      </div>
    </div>
  )
}

export default Auth