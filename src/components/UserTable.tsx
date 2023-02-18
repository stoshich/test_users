import React, { FC } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { IUser } from '../types/IUser'

interface UserTableProps {
  sortedAndFiltered: IUser[];
  sortById: () => void
}

const UserTable: FC<UserTableProps> = ({ sortedAndFiltered, sortById }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className='table__id' onClick={sortById} >ID</TableCell>
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
  )
}

export default UserTable