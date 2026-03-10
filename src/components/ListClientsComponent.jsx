import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function ListClientsComponent() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/clients")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        List of Clients
      </h2>

      <button
        onClick={() => navigate("/add-client")}
        /* Added 2 units to px-3 and py-1 to increase total size by 1rem */
        className="px-5 py-3 mb-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded transition"
      >
        Add new client
      </button>

      <div className="overflow-hidden rounded-xl border border-slate-700 shadow-2xl">
        <table className="w-full text-left border-collapse bg-slate-800 text-slate-300">
          <thead className="bg-slate-700/50 text-slate-100 uppercase text-sm font-semibold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">First Name</th>
              <th className="px-6 py-4">Last Name</th>
              <th className="px-6 py-4">Email Address</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {clients.length > 0 ? (
              clients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-cyan-400">
                    {client.id}
                  </td>
                  <td className="px-6 py-4">{client.firstName}</td>
                  <td className="px-6 py-4">{client.lastName}</td>
                  <td className="px-6 py-4 text-slate-400">{client.email}</td>
                  {/* Action Buttons */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(client)}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-10 text-center text-slate-500"
                >
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
