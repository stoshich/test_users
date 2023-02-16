import { Box, Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { useInput } from '../hooks/useInput'

const Auth = () => {

  const [passwordError, setPasswordError] = useState(false)
  const username = useInput('', { isEmpty: true, minLength: 3 })
  const password = useInput('', { isEmpty: true, minLength: 6 })

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
            error={passwordError}
            id='password'
            label='Password'
            type='password'
            value={password.value}
            onChange={e => password.onChange(e)}
            onBlur={password.onBlur}
          />
        </div>
        <div className='auth__btn'>
          <Button variant='contained'>Войти</Button>
        </div>
      </Box>
    </div>
  )
}

export default Auth