import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // 1. Validation Logic
  const validate = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = "This field is required";
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Real-time validation: Clear or set error as user types
    setErrors({
      ...errors,
      [e.target.name]: validate(e.target.name, e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Client Data Submitted:", formData);
    // Add your saving logic or navigation here
  };

  function saveClient() {
    fetch("http://localhost:8080/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Client saved:", data);
        // Add your success handling or navigation here
        // For example, you could redirect to the client list page
        navigate("/clients");
      })
      .catch((error) => {
        console.error("Error saving client:", error);
      });
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold text-white mb-6">Add New Client</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Jane"
            value={formData.firstName}
            onChange={handleChange}
            /* Dynamic class: red border if errors.firstName exists, otherwise slate-700 */
            className={`w-full px-4 py-2.5 bg-slate-800 border rounded-lg text-white placeholder-slate-500 
      focus:outline-none focus:ring-2 transition ${
        errors.firstName
          ? "border-red-500 focus:ring-red-500/20"
          : "border-slate-700 focus:ring-indigo-500"
      }`}
          />

          {/* Error Message: Only renders if errors.firstName has a value */}
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500 font-medium animate-pulse">
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 bg-slate-800 border rounded-lg text-white placeholder-slate-500 
      focus:outline-none focus:ring-2 transition ${
        errors.lastName
          ? "border-red-500 focus:ring-red-500/20"
          : "border-slate-700 focus:ring-indigo-500"
      }`}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500 font-medium">
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="jane.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 bg-slate-800 border rounded-lg text-white placeholder-slate-500 
      focus:outline-none focus:ring-2 transition ${
        errors.email
          ? "border-red-500 focus:ring-red-500/20"
          : "border-slate-700 focus:ring-indigo-500"
      }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500 font-medium">
              {errors.email}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={saveClient}
          type="submit"
          className="w-full mt-4 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg
           shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          /* Optional: Disable button if there are errors */
          disabled={Object.values(errors).some((error) => error !== "")}
        >
          Create Client
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
