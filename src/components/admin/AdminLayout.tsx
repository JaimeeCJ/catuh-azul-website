import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const adminToken = localStorage.getItem("admin_token");
    setIsAuthenticated(!!adminToken);
    setIsLoading(false);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-light border-t-primary-dark rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se estiver autenticado e na login, redireciona
  if (isAuthenticated && location.pathname === "/admin/login") {
    return <Navigate to="/admin" replace />;
  }

  // Se não autenticado e não estiver na login, redireciona pra login
  if (!isAuthenticated && location.pathname !== "/admin/login") {
    return <Navigate to="/admin/login" replace />;
  }

  // Aqui é só pra rota de login
  if (!isAuthenticated && location.pathname === "/admin/login") {
    return <Outlet />;
  }

  // Aqui é pra qualquer rota autenticada
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
