
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de login (substituir por autenticação real)
    if (email === "admin@catuh.org" && password === "catuh2024") {
      localStorage.setItem('admin_token', 'mock_token_' + Date.now());
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo!",
      });
      navigate('/admin');
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-primary-dark rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold font-montserrat text-2xl">C</span>
          </div>
          <CardTitle className="text-2xl font-montserrat font-bold text-primary-dark">
            CATUH - Administração
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@catuh.org"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          
          <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
            <strong>Credenciais de teste:</strong><br />
            Email: admin@catuh.org<br />
            Senha: catuh2024
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
