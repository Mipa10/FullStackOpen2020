import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then(response => {
    return response.data;
  });
};

const create = (newObject) => {
    return axios.post(baseUrl,newObject).then(response => response.data)
}

const del = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  del
};
