import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => {
    return response.data;
  });
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const del = (person) => {
  return axios.delete(`${baseUrl}/${person.id}`);
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

export default {
  getAll,
  create,
  del,
  update,
};
