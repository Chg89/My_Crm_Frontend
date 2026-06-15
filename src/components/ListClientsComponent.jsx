import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import ClientService from "../services/ClientService";

function ListClientsComponent() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ClientService.getAllClients()
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  const handleEdit = (clientId) => {
    const client = clients.find((c) => c.id === clientId);
    navigate("/add-client", { state: { client, isEditing: true } });
  };

  const handleDelete = (clientId) => {
    ClientService.deleteClient(clientId)
      .then(() => setClients(clients.filter((c) => c.id !== clientId)))
      .catch((error) => console.error("Error deleting client:", error));
  };

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        List of Clients
      </h2>

      <button
        onClick={() => navigate("/add-client")}
        className="inline-flex items-center gap-2 px-5 py-2.5 mb-4 border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400 text-sm font-medium rounded-lg transition"
      >
        <span className="text-lg leading-none">+</span> Add new client
      </button>

      <div className="overflow-hidden rounded-xl border border-zinc-800 shadow-2xl">
        <table className="w-full text-left border-collapse bg-zinc-900 text-zinc-300">
          <thead className="bg-zinc-800/60 text-zinc-100 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">First Name</th>
              <th className="px-6 py-4">Last Name</th>
              <th className="px-6 py-4">Email Address</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {clients.length > 0 ? (
              clients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-violet-400 text-sm">
                    {client.id}
                  </td>
                  <td className="px-6 py-4">{client.firstName}</td>
                  <td className="px-6 py-4">{client.lastName}</td>
                  <td className="px-6 py-4 text-zinc-400">{client.email}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(client.id)}
                        className="px-3 py-1.5 text-violet-400 border border-violet-500/40 hover:bg-violet-500/10 hover:border-violet-400 text-xs font-medium rounded-md transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="px-3 py-1.5 text-red-400 border border-red-500/30 hover:bg-red-500/10 hover:border-red-400 text-xs font-medium rounded-md transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-zinc-500">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListClientsComponent;
