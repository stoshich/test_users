import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFilter } from '../hooks/useFilter'
import { getUsers } from '../HTTP/getUsers'
import { IUser } from '../types/IUser'


const Users = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [sort, setSort] = useState(false)
  const [filterValue, setFilterValue] = useState('')
  const sortedAndFiltered = useFilter(users, filterValue, sort)

  const filterUsername = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFilterValue(e.target.value)
  }

  const sortById = () => {
    setSort(!sort)
  }

  // const sortByUsername = () => {
  //   if (sortType === 'asc') {
  //     const sorted = users.sort((user1, user2) => user1.username.localeCompare(user2.username))
  //     setUsers([...sorted])
  //     setSortType('desc')
  //   } else {
  //     const sorted = users.sort((user1, user2) => user2.username.localeCompare(user1.username))
  //     setUsers([...sorted])
  //     setSortType('asc')
  //   }
  // }

  useEffect(() => {
    const token = localStorage.getItem('token')
    getUsers(token || '')
      .then(res => {
        setUsers(res)
      })
      .catch(console.error)
  }, [])
  return (
    <div>
      Фильтрация <TextField
        label='Username'
        value={filterValue}
        onChange={e => filterUsername(e)}
      />
      <TableContainer component={Paper} sx={{ maxWidth: 1440, margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow className='table__head'>
              <TableCell onClick={sortById} >ID</TableCell>
              <TableCell onClick={() => { }}>Username</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAndFiltered.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  )
}

export default Users