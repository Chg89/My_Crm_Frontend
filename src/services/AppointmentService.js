import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:8080/api/appointments";

const getAllAppointments = () => axiosInstance.get(API_URL);
const getAppointmentById = (id) => axiosInstance.get(`${API_URL}/${id}`);
const getAllAppointmentsByClientId = (clientId) =>
  axiosInstance.get(`${API_URL}/client/${clientId}`);
const createAppointment = (appointmentDto) =>
  axiosInstance.post(API_URL, appointmentDto);
const updateAppointment = (id, appointmentDto) =>
  axiosInstance.put(`${API_URL}/${id}`, appointmentDto);
const deleteAppointment = (id) => axiosInstance.delete(`${API_URL}/${id}`);

const AppointmentService = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAllAppointmentsByClientId,
};

export default AppointmentService;
