import axios from "axios";

const API_URL = "http://localhost:8080/api/clients";

//adding reqquest interceptor to include the JWT token in the Authorization header for all requests

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const getAllClients = () => axios.get(API_URL);

const getClientById = (id) => axios.get(`${API_URL}/${id}`);

const createClient = (clientDto) => axios.post(API_URL, clientDto);

const updateClient = (id, clientDto) =>
  axios.put(`${API_URL}/${id}`, clientDto);

const deleteClient = (id) => axios.delete(`${API_URL}/${id}`);

const ClientService = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};

export default ClientService;
