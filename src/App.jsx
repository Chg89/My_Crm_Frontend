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
