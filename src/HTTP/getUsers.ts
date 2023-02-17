import axios from 'axios'

export const getUsers = async (token: string) => {
  const url = 'https://test-assignment.emphasoft.com/api/v1/users/'
  const response = await axios.get(url, {
    headers: {
      Authorization: token
    }
  })
  return response.data
}