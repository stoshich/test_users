import { useState, useMemo } from 'react'
import { IUser } from '../types/IUser'

const useSortedById = (users: IUser[], sort: boolean) => {
  const [sortType, setSortType] = useState('asc')

  const sortedUsers = useMemo(() => {
    if (sortType === 'asc') {
      setSortType('desc')
      return [...users].sort((user1, user2) => user1.id - user2.id)
    } else {
      setSortType('asc')
      return [...users].sort((user1, user2) => user2.id - user1.id)
    }
  }, [users, sort])

  return sortedUsers
}

export const useFilter = (users: IUser[], query: string, sort: boolean) => {
  const sortedUsers = useSortedById(users, sort)
  const sortedAndFiltered = useMemo(() => {
    return sortedUsers.filter(user => user.username.toLowerCase().includes(query))
  }, [sortedUsers, query])
  return sortedAndFiltered
}