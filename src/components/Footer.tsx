
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-light to-white rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/logo_catuh.jpg"
                  alt="Logo CATUH"
                  className="w-8 h-8 object-cover scale-150"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-montserrat font-bold text-white text-lg">CATUH</span>
                <span className="font-inter text-sm text-primary-light">Casa Assistencial Trabalhadores da Última Hora</span>
              </div>
            </div>
            <p className="font-inter text-gray-300 mb-4 max-w-md">
              Organização sem fins lucrativos dedicada ao apoio e desenvolvimento da comunidade de Barretos através de programas assistenciais e educacionais.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="font-inter text-gray-300 hover:text-primary-light transition-colors">Início</a></li>
              <li><a href="/about" className="font-inter text-gray-300 hover:text-primary-light transition-colors">Sobre</a></li>
              <li><a href="/transparency" className="font-inter text-gray-300 hover:text-primary-light transition-colors">Transparência</a></li>
              <li><a href="/workshops" className="font-inter text-gray-300 hover:text-primary-light transition-colors">Workshops</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Contato</h3>
            <div className="space-y-2 font-inter text-gray-300">
              <p>Barretos, São Paulo</p>
              <p>trabalhadoresultimahora@hotmail.com</p>
              <p>(17) 98145-0283</p>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
            <a 
              href="https://www.instagram.com/casa_assistencialstc/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-300 hover:text-primary-light transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          </div>
        </div>

        <hr className="border-gray-600 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="font-inter text-gray-400 text-sm">
            © 2025 CATUH - Casa Assistencial Trabalhadores da Última Hora. Todos os direitos reservados.
          </p>
          <p className="font-inter text-gray-400 text-sm mt-2 md:mt-0">
            CNPJ: 04.259.387/0001-56
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
