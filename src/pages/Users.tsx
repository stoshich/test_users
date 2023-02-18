import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Filter from '../components/Filter'
import UserTable from '../components/UserTable'
import { useFilter } from '../hooks/useFilter'
import { getUsers } from '../HTTP/getUsers'
import { IUser } from '../types/IUser'


const Users = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [sort, setSort] = useState(false)
  const [filterValue, setFilterValue] = useState('')
  const sortedAndFiltered = useFilter(users, filterValue, sort)
  const navigate = useNavigate()

  const sortById = () => {
    setSort(!sort)
  }

  const logOutHandler = () => {
    navigate('/')
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    getUsers(token || '')
      .then(res => {
        setUsers(res)
      })
      .catch(console.error)
  }, [])

  return (
    <div className='users'>
      <div className='users__header'>
        <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
        <Button
          variant='contained'
          color='error'
          onClick={logOutHandler}
        >
          Выйти
        </Button>
      </div>
      <UserTable sortById={sortById} sortedAndFiltered={sortedAndFiltered} />
    </div>

  )
}

export default Users