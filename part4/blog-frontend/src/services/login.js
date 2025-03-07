import axios from "axios";
const baseUrl = 'http://localhost:3001/api/login'

const login = async (credantials) => {
  const request = await axios.post(baseUrl,credantials)
  return request.data
}


export default { login }
