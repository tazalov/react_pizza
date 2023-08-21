import axios from 'axios'

const pizzasAPI = axios.create({
  baseURL: 'https://64d38ae867b2662bf3dc6592.mockapi.io/api/',
})

export default pizzasAPI
