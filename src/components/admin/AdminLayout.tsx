
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { getAuthToken, removeAuthToken } from "@/utils/api";

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      const token = getAuthToken();
      
      console.log("Validando token:", token ? "Token encontrado" : "Token não encontrado");
      
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // Verificar se o token é válido fazendo uma requisição de teste
        const response = await fetch("http://localhost:8000/api/user", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        console.log("Resposta da validação:", response.status);

        if (response.ok) {
          setIsAuthenticated(true);
          console.log("Token válido, usuário autenticado");
        } else {
          // Token inválido, remover
          console.log("Token inválido, removendo");
          removeAuthToken();
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erro ao validar token:", error);
        removeAuthToken();
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [location.pathname]);

  console.log("Estado atual - isLoading:", isLoading, "isAuthenticated:", isAuthenticated, "pathname:", location.pathname);

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
    console.log("Usuário autenticado tentando acessar login, redirecionando para dashboard");
    return <Navigate to="/admin" replace />;
  }

  // Se não autenticado e não estiver na login, redireciona pra login
  if (!isAuthenticated && location.pathname !== "/admin/login") {
    console.log("Usuário não autenticado, redirecionando para login");
    return <Navigate to="/admin/login" replace />;
  }

  // Aqui é só pra rota de login
  if (!isAuthenticated && location.pathname === "/admin/login") {
    console.log("Exibindo tela de login");
    return <Outlet />;
  }

  // Aqui é pra qualquer rota autenticada
  console.log("Exibindo layout autenticado");
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
