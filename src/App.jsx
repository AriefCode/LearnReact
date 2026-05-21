import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Loading from "./components/Loading";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Order = React.lazy(() => import("./pages/Order"));
const Customer = React.lazy(() => import("./pages/Customer"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));
const Landing = React.lazy(() => import("./pages/Landing"));

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/Register" element={<Register />} />
        </Route>

        <Route element={<GuestLayout />}>
          <Route path="/guest" element={<Landing />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
