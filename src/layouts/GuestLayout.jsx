import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-latar font-barlow">
      <Outlet />
    </div>
  );
}
