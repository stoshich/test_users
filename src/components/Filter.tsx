import React, { FC, SetStateAction } from 'react'
import { TextField, Typography } from '@mui/material'

interface FilterProps {
  filterValue: string;
  setFilterValue: (value: SetStateAction<string>) => void
}

const Filter: FC<FilterProps> = ({ filterValue, setFilterValue }) => {
  return (
    <div className='filter'>
      <Typography display='block' variant='overline'>Фильтрация</Typography>
      <TextField
        size='small'
        label='Username'
        value={filterValue}
        onChange={e => setFilterValue(e.target.value)}
      />
    </div>
  )
}

export default Filter