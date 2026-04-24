import "./assets/tailwind.css";
import Dashboard from "./pages/Dashboard";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import { Route, Routes } from "react-router-dom";
import Order from "./pages/Order";
import Customer from "./pages/Customer";
import NotFound from "./pages/NotFound";

function App() {
  return (
  <div id="app-container" className="bg-gray-100 min-h-screen flex">
    <div id="layout-wrapper" className="flex flex-row flex-1">
      <Sidebar />
      <div id="main-content" className="flex-1 p-4">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  </div>
  )
}

export default App
