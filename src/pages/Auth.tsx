import { Box, Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'

const Auth = () => {

  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  return (
    <div>
      <Box
        component="form"
        noValidate
        autoComplete='off'
      >
        <div className='auth__input'>
          <TextField
            error={usernameError}
            id='username'
            label='Username'
          />
        </div>
        <div className='auth__input'>
          <TextField
            error={passwordError}
            id='password'
            label='Password'
            type='password'
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