import { Box, Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useInput } from '../hooks/useInput'
import { loginPost } from '../HTTP/login'

const Auth = () => {

  const username = useInput('', { isEmpty: true, isUsername: true })
  const password = useInput('', { isEmpty: true, isPassword: true })
  const navigate = useNavigate()

  const onEnterHandler = async () => {
    try {
      const response = await loginPost(username.value, password.value)
      localStorage.setItem('token', 'Token ' + response.token)
      navigate('/users')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='auth'>
      <Box
        component="form"
        noValidate
        autoComplete='off'
      >
        <div className='auth__input'>
          <TextField
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
            disabled={password.error || username.error}
            variant='contained'
            onClick={onEnterHandler}
          >
            Войти
          </Button>
        </div>
      </Box>
    </div>
  )
}

export default Auth