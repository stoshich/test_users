import axios from "axios"

export const loginPost = async (username: string, password: string) => {
  const url = 'https://test-assignment.emphasoft.com/api/v1/login/'
  const response = await axios.post(url, {
    username: username,
    password: password
  })
  return response.data
}