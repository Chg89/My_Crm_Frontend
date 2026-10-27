import "../App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OfferingService from "../services/OfferingService";

function ServiceOfferingList() {
  const [serviceOfferings, setServiceOfferings] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const isAdmin = user?.role === "ROLE_ADMIN";

  useEffect(() => {
    OfferingService.getAllServiceOfferings()
      .then((response) => setServiceOfferings(response.data.content))
      .catch((error) =>
        console.error("Error fetching service offerings:", error),
      );
  }, []);

  const handleEdit = (serviceId) => {
    navigate(`/services/${serviceId}/edit`);
  };

  const handleDelete = (serviceId) => {
    OfferingService.deleteServiceOffering(serviceId)
      .then(() =>
        setServiceOfferings(serviceOfferings.filter((s) => s.id !== serviceId)),
      )
      .catch((error) =>
        console.error("Error deleting service offering:", error),
      );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Services</h2>
          {isAdmin && (
            <button
              onClick={() => navigate("/add-service")}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400 text-sm font-medium rounded-lg transition"
            >
              <span className="text-lg leading-none">+</span> Add new service
            </button>
          )}
        </div>

        {serviceOfferings.length === 0 ? (
          <p className="text-gray-500">No services found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceOfferings.map((offering) => (
              <div
                key={offering.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-violet-500/40 transition"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {offering.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  €{offering.price} · {offering.durationMinutes} min
                </p>

                {isAdmin && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(offering.id)}
                      className="px-3 py-1.5 text-sm rounded-md border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(offering.id)}
                      className="px-3 py-1.5 text-sm rounded-md border border-red-500/40 text-red-400 hover:bg-red-500/10 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceOfferingList;
