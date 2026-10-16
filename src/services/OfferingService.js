import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:8080/api/services";

const getAllServiceOfferings = () => axiosInstance.get(API_URL);
const getServiceOfferingById = (id) => axiosInstance.get(`${API_URL}/${id}`);
const createServiceOffering = (offeringDto) =>
  axiosInstance.post(API_URL, offeringDto);
const updateServiceOffering = (id, offeringDto) =>
  axiosInstance.put(`${API_URL}/${id}`, offeringDto);
const deleteServiceOffering = (id) => axiosInstance.delete(`${API_URL}/${id}`);

const OfferingService = {
  getAllServiceOfferings,
  getServiceOfferingById,
  createServiceOffering,
  updateServiceOffering,
  deleteServiceOffering,
};

export default OfferingService;
