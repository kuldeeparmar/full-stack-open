import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
  token =  `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog) => {
  const config = {
    headers : {
      'Authorization' : token
    },
  }

  const response = await axios.post(baseUrl,blog,config)

  return response.data
}

const update = async (id,changedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`,changedBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers : {
      'Authorization' : token
    }
  }
  console.log(token)
  const response = await axios.delete(`${baseUrl}/${id}`,config)

  return response.data
}

export default { getAll, create, setToken,update,deleteBlog }