
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  GraduationCap, 
  Mail, 
  Image, 
  Settings,
  Home
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Páginas", path: "/admin/pages", icon: FileText },
    { name: "Documentos", path: "/admin/documents", icon: FolderOpen },
    { name: "Workshops", path: "/admin/workshops", icon: GraduationCap },
    { name: "Contatos", path: "/admin/contacts", icon: Mail },
    { name: "Mídia", path: "/admin/media", icon: Image },
    { name: "Configurações", path: "/admin/settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-6 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-light to-primary-dark rounded-lg flex items-center justify-center">
            <span className="text-white font-bold font-montserrat text-xl">C</span>
          </div>
          <div className="flex flex-col">
            <span className="font-montserrat font-bold text-primary-dark text-lg">CATUH</span>
            <span className="font-inter text-xs text-gray-600">Administração</span>
          </div>
        </Link>
      </div>

      <nav className="p-4">
        <div className="mb-4">
          <Link
            to="/"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="font-inter">Ver Site</span>
          </Link>
        </div>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-primary-light text-primary-dark font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-inter">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
