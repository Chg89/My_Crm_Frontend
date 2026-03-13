import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ClientForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the state we passed through navigate()
  // We use optional chaining (?.) and default values to prevent crashes
  const isEditing = location.state?.isEditing || false;
  const clientData = location.state?.client || null;
  console.log("Location state:", location.state);

  // Initialize form with client data if editing, otherwise empty strings
  const [formData, setFormData] = useState({
    firstName: clientData?.firstName || "",
    lastName: clientData?.lastName || "",
    email: clientData?.email || "",
  });
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";

    // 1. Convert to string and handle null/undefined/numbers
    const cleanValue = String(value || "").trim();

    // 2. Check if the cleaned string is empty
    if (cleanValue.length === 0) {
      error = "This field is required";
    }
    // 3. Email specific validation
    else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanValue)) {
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

    // 1. Validate all fields at once
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    // 2. If there are any errors, update state and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Don't submit!
    }

    // 3. If no errors, proceed with API call
    if (isEditing) {
      // Call your API
      fetch(`http://localhost:8080/api/clients/${clientData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Client changed:", data);
          // Add your success handling or navigation here
          navigate("/clients");
        })
        .catch((error) => {
          console.error("Error saving client:", error);
        });
    } else {
      // Call your API
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
          navigate("/clients");
        })
        .catch((error) => {
          console.error("Error saving client:", error);
        });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold text-white mb-6">
        {isEditing ? "Edit Client" : "Add New Client"}
      </h1>

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
          onClick={handleSubmit}
          type="submit"
          className="w-full mt-4 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg
           shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          /* Optional: Disable button if there are errors */
          disabled={Object.values(errors).some((error) => error !== "")}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
