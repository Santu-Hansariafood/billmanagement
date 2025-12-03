import axios from 'axios'

export async function login(mobile, password) {
  const { data } = await axios.post('/api/auth/login', { mobile, password })
  return data
}

export async function register(mobile, password) {
  const { data } = await axios.post('/api/auth/register', { mobile, password })
  return data
}

export async function logout() {
  const { data } = await axios.post('/api/auth/logout')
  return data
}
