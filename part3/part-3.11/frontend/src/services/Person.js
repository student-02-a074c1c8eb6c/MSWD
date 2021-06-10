import axios from 'axios'
const baseUrl = '/persons'

const getAll = async () => {
    const request = axios.get(baseUrl)
    return request.then(request => request.data)
}

const create = async (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(request => request.data)
    
}

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(request => request.data)
}

const deletePerson = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(request => request.data)
}

export default {
    getAll,
    create,
    update,
    deletePerson
}