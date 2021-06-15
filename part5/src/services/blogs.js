import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setto = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  const res = await axios.get(baseUrl, config)
  return res.data
}

const create = async newObject => {
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const upd = async objectToupd => {
  const res = await axios.put(`${baseUrl}/${objectToupd.id}`, objectToupd, config)
  return res.data
}

const rem = async id => {
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}


export default { getAll, create, upd, setto, rem }
