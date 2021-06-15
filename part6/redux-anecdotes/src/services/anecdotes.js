import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const geta = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createn = async (content) => {
    const obj = {
        content: content,
        id: (100000 * Math.random()).toFixed(0),
        votes: 0
    }
    const res = await axios.post(baseUrl, obj)
    return res.data
}

const upd = async objToupd => {
    const res = await axios.put(`${baseUrl}/${objToupd.id}`, objToupd)
    return res.data
  }

export default { geta, createn, upd }
