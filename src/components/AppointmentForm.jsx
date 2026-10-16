import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppointmentService from "../services/AppointmentService";
import ClientService from "../services/ClientService";
import OfferingService from "../services/OfferingService";

function AppointmentForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Τα πεδία της φόρμας
  const [clientId, setClientId] = useState("");
  const [serviceOfferingId, setServiceOfferingId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [status, setStatus] = useState("SCHEDULED");
  const [description, setDescription] = useState("");

  // Τα δεδομένα για τα dropdowns
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // 1. Φόρτωσε τη λίστα clients (για το dropdown/autocomplete)
    ClientService.getAllClients()
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error fetching clients:", error));
    // 2. Φόρτωσε τη λίστα services (για το dropdown)
    OfferingService.getAllServiceOfferings()
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services:", error));
    // 3. Αν id υπάρχει (edit mode), φόρτωσε το υπάρχον appointment
    if (id) {
      AppointmentService.getAppointmentById(id)
        .then((response) => {
          const { clientId, serviceOfferingId, dateTime, status, description } =
            response.data;
          setClientId(clientId);
          setServiceOfferingId(serviceOfferingId);
          setDateTime(dateTime);
          setStatus(status);
          setDescription(description);
        })
        .catch((error) => console.error("Error fetching appointment:", error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    // Ίδιο pattern με ServiceOfferingForm
    e.preventDefault();
    const dto = { clientId, serviceOfferingId, dateTime, status, description };
    const request = id
      ? AppointmentService.updateAppointment(id, dto)
      : AppointmentService.createAppointment(dto);
    request
      .then(() => navigate("/appointments"))
      .catch((error) => console.error("Error submitting appointment:", error));
    // dto = { clientId, serviceOfferingId, dateTime, status, description }
    // id ? update : create
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 px-6 py-10">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8">
          {id ? "Edit Appointment" : "Book New Appointment"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Client</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition"
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Service</label>
            <select
              value={serviceOfferingId}
              onChange={(e) => setServiceOfferingId(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} — €{service.price} · {service.durationMinutes}{" "}
                  min
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition"
            >
              <option value="SCHEDULED">Scheduled</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="NO_SHOW">No Show</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Notes</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition resize-none"
              placeholder="Optional notes..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition"
            >
              {id ? "Update" : "Book"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/appointments")}
              className="px-6 py-2.5 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 text-sm font-medium rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
