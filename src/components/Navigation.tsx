import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Controle para mostrar/ocultar a aba de contato
  const showContactTab = false; // Altere para true se quiser mostrar novamente

  const navItems = [
    { name: "Início", path: "/" },
    { name: "Sobre", path: "/about" },
    { name: "Transparência", path: "/transparency" },
    { name: "Workshops", path: "/workshops" },
    ...(showContactTab ? [{ name: "Contato", path: "/contact" }] : []),
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">           
            <div className="w-10 h-10 bg-gradient-to-br from-primary-light to-white rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/logo_catuh.jpg"
                  alt="Logo CATUH"
                  className="w-8 h-8 object-cover scale-150"
                />
              </div>
            <div className="flex flex-col">
              <span className="font-montserrat font-bold text-primary-dark text-lg">CATUH</span>
              <span className="font-inter text-xs text-gray-600 hidden sm:block">Casa Assistencial Trabalhadores</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-inter font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-primary-dark border-b-2 border-primary-light"
                    : "text-gray-700 hover:text-primary-dark"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-inter font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-primary-dark"
                      : "text-gray-700 hover:text-primary-dark"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
