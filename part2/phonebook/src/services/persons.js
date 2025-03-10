import axios from "axios";
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data);
}

const create = (newObj) => {
    const request = axios.post(baseUrl,newObj)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(respone => respone.data)
}

const update = (id,newObj) => {
    const request = axios.put(`${baseUrl}/${id}`,newObj);
    return request.then(respone => respone.data)
} 


export default {getAll,create,deletePerson,update}