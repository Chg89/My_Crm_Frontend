import "./App.css"; // Ensure this file has @import "tailwindcss"; inside it
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import ListClientsComponent from "./components/ListClientsComponent";
import ClientForm from "./components/ClientForm";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ServiceOfferingList from "./components/ServiceOfferingList";
import ServiceOfferingForm from "./components/ServiceOfferingForm";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="min-h-screen flex gap-8 items-center justify-center bg-zinc-950">
          <Routes>
            {/* http://localhost:8080/ */}
            <Route path="/" element={<HomePage />} />
            {/* http://localhost:8080/api/clients */}
            <Route path="/clients" element={<ListClientsComponent />} />
            {/* http://localhost:8080/api/services */}
            <Route path="/services" element={<ServiceOfferingList />} />
            <Route path="/add-service" element={<ServiceOfferingForm />} />
            <Route
              path="/services/:id/edit"
              element={<ServiceOfferingForm />}
            />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route
              path="/appointments/:id/edit"
              element={<AppointmentForm />}
            />
            <Route path="/add-appointment" element={<AppointmentForm />} />
            {/* http://localhost:8080/api/clients/add-client */}
            <Route path="/add-client" element={<ClientForm />} />
            {/* http://localhost:8080/register */}
            <Route path="/register" element={<Register />} />
            {/* http://localhost:8080/login */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
