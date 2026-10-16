import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import AppointmentService from "../services/AppointmentService";
import "react-big-calendar/lib/css/react-big-calendar.css";
import OfferingService from "../services/OfferingService";
import "../css/AppointmentList.css";

const localizer = momentLocalizer(moment);

function AppointmentList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      OfferingService.getAllServiceOfferings(),
      AppointmentService.getAllAppointments(),
    ])
      .then(([servicesResponse, appointmentsResponse]) => {
        const services = servicesResponse.data;

        const mappedEvents = appointmentsResponse.data.map((appointment) => {
          const service = services.find(
            (s) => s.id === appointment.serviceOfferingId,
          );
          const durationMinutes = service?.durationMinutes || 30;

          const start = new Date(appointment.dateTime);
          const end = new Date(start.getTime() + durationMinutes * 60000);

          return {
            id: appointment.id,
            title: appointment.description || service?.name || "Appointment",
            start,
            end,
            status: appointment.status,
          };
        });

        setEvents(mappedEvents);
      })
      .catch((error) => {
        console.error("Failed to load appointments:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Appointments</h2>
          <button
            onClick={() => navigate("/add-appointment")}
            className="px-5 py-2.5 border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400 text-sm font-medium rounded-lg transition cursor-pointer"
          >
            + Add Appointment
          </button>
        </div>

        <div
          className="bg-gray-900 border border-gray-800 rounded-xl p-4"
          style={{ height: "650px" }}
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            onSelectEvent={(event) =>
              navigate(`/appointments/${event.id}/edit`)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default AppointmentList;
