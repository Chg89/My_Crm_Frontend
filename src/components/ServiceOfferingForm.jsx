import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OfferingService from "../services/OfferingService";

function ServiceOfferingForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // undefined στο create, "5" στο edit

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");

  useEffect(() => {
    if (id) {
      // φέρε το service από το backend και γέμισε τα states
      OfferingService.getServiceOfferingById(id)
        .then((response) => {
          const service = response.data;
          setName(service.name);
          setPrice(service.price);
          setDurationMinutes(service.durationMinutes);
        })
        .catch((error) =>
          console.error("Error fetching service offering:", error),
        );
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dto = { name, price, durationMinutes };

    const request = id
      ? OfferingService.updateServiceOffering(id, dto)
      : OfferingService.createServiceOffering(dto);

    request
      .then(() => navigate("/services"))
      .catch((error) =>
        console.error("Error submitting service offering:", error),
      );
  };
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 px-6 py-10">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8">
          {id ? "Edit Service" : "Add New Service"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition"
              placeholder="e.g. Haircut"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Price (€)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition"
              placeholder="e.g. 25.00"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              required
              min="1"
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition"
              placeholder="e.g. 30"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition"
            >
              {id ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/services")}
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
export default ServiceOfferingForm;
