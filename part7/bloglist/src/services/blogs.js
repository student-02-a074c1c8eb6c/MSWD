import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const set = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

const getal = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const upd = async (objectToupd) => {
  const response = await axios.put(
    `${baseUrl}/${objectToupd.id}`,
    objectToupd,
    config
  )
  return response.data
}

const rem = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getal, create, upd, set, rem }
