
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, BookOpen } from "lucide-react";

const Workshops = () => {
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch workshops from API
  useEffect(() => {
    fetch("http://localhost:8000/api/atividades")
      .then(res => res.json())
      .then(data => {
        // Filtra apenas workshops ativos
        const activeWorkshops = data.filter(workshop => workshop.StatusAtivoFl);
        setWorkshops(activeWorkshops);
      })
      .catch(err => {
        console.error("Erro ao carregar workshops:", err);
        setWorkshops([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getCategoryFromTitle = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('informática') || titleLower.includes('computador')) return 'Tecnologia';
    if (titleLower.includes('alfabetização') || titleLower.includes('leitura')) return 'Educação';
    if (titleLower.includes('profissional') || titleLower.includes('capacitação')) return 'Profissional';
    if (titleLower.includes('artesanato') || titleLower.includes('arte')) return 'Arte';
    if (titleLower.includes('financeira') || titleLower.includes('dinheiro')) return 'Financeiro';
    if (titleLower.includes('culinária') || titleLower.includes('cozinha')) return 'Culinária';
    return 'Workshop';
  };

  const getEmojiFromCategory = (category) => {
    switch (category) {
      case 'Tecnologia': return '💻';
      case 'Educação': return '📚';
      case 'Profissional': return '👔';
      case 'Arte': return '🎨';
      case 'Financeiro': return '💰';
      case 'Culinária': return '👩‍🍳';
      default: return '📋';
    }
  };

  const WorkshopCard = ({ workshop }) => {
    const category = getCategoryFromTitle(workshop.TituloTx);
    const emoji = getEmojiFromCategory(category);
    
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-4xl">{emoji}</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-montserrat font-medium">
              {category}
            </span>
          </div>
          <CardTitle className="font-montserrat text-xl">
            {workshop.TituloTx}
          </CardTitle>
          <CardDescription className="font-inter">
            {workshop.DescricaoDs}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span className="font-inter">
                {workshop.DuracaoHorasNr ? `${workshop.DuracaoHorasNr} horas` : "40 horas"}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span className="font-inter">
                {workshop.NumeroVagasNr ? `${workshop.NumeroVagasNr} vagas` : "15 vagas"}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full font-montserrat font-medium">
              Inscrever-se
            </Button>
            <Button 
              variant="outline" 
              className="w-full font-montserrat font-medium"
              onClick={() => navigate(`/workshops/${workshop.AtividadeId}`)}
            >
              Saiba Mais
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6">
            Workshops & Cursos
          </h1>
          <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto">
            Programas de capacitação e desenvolvimento pessoal e profissional para toda a comunidade.
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-montserrat font-semibold text-lg mb-2">Cursos Gratuitos</h3>
              <p className="font-inter text-gray-600">
                Todos os nossos cursos são oferecidos gratuitamente para a comunidade
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-montserrat font-semibold text-lg mb-2">Para Todos</h3>
              <p className="font-inter text-gray-600">
                Nossos programas são abertos a pessoas de todas as idades e níveis
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-montserrat font-semibold text-lg mb-2">Horários Flexíveis</h3>
              <p className="font-inter text-gray-600">
                Oferecemos horários variados para atender diferentes necessidades
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl text-gray-900 mb-4">
              Nossos Programas
            </h2>
            <p className="font-inter text-lg text-gray-700 max-w-2xl mx-auto">
              Explore nossa variedade de cursos e workshops projetados para desenvolver habilidades e promover o crescimento pessoal e profissional.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando workshops...</p>
            </div>
          ) : workshops.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum workshop disponível</h3>
              <p className="text-gray-500">
                No momento não há workshops ativos. Volte em breve para conferir novos cursos!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshops.map((workshop) => (
                <WorkshopCard 
                  key={workshop.AtividadeId} 
                  workshop={workshop}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-3xl mb-6">
            Pronto para Começar?
          </h2>
          <p className="font-inter text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato conosco para mais informações sobre inscrições, cronogramas e requisitos dos cursos.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="font-montserrat font-semibold"
            onClick={() => navigate("/contact")}
          >
            Fale Conosco
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Workshops;
