import axios from 'axios'

export async function getBills() {
  const { data } = await axios.get('/api/bills')
  return data
}

export async function addBill(bill) {
  const { data } = await axios.post('/api/bills', bill)
  return data
}

export async function updateBill(id, patch) {
  const { data } = await axios.patch(`/api/bills/${id}`, patch)
  return data
}

export async function deleteBill(id) {
  await axios.delete(`/api/bills/${id}`)
}
