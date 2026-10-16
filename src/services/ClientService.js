import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:8080/api/clients";

const getAllClients = () => axiosInstance.get(API_URL);
const getClientById = (id) => axiosInstance.get(`${API_URL}/${id}`);
const createClient = (clientDto) => axiosInstance.post(API_URL, clientDto);
const updateClient = (id, clientDto) =>
  axiosInstance.put(`${API_URL}/${id}`, clientDto);
const deleteClient = (id) => axiosInstance.delete(`${API_URL}/${id}`);

const ClientService = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};

export default ClientService;
