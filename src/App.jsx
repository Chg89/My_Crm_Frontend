import "./App.css"; // Ensure this file has @import "tailwindcss"; inside it
import Footer from "./components/Footer";
import Header from "./components/Header";
import ListClientsComponent from "./components/ListClientsComponent";
import ClientForm from "./components/ClientForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="h-screen  flex gap-8 items-center justify-center bg-slate-900">
        <Routes>
          {/* http://localhost:8080 */}
          <Route path="/" element={<ListClientsComponent />} />
          {/* http://localhost:8080/api/clients */}
          <Route path="/clients" element={<ListClientsComponent />} />
          {/* http://localhost:8080/api/clients/add-client */}
          <Route path="/add-client" element={<ClientForm />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
