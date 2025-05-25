
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
        setWorkshops(data);
      })
      .catch(err => {
        console.error("Erro ao carregar workshops:", err);
        // Fallback para dados estáticos se a API falhar
        setWorkshops([
          {
            AtividadeId: 1,
            TituloTx: "Informática Básica",
            DescricaoDs: "Curso introdutório de informática para iniciantes, abordando conceitos básicos de computação, internet e ferramentas digitais.",
            ImagemUrlTx: "",
            DtPublicacaoDt: new Date().toISOString(),
          },
          {
            AtividadeId: 2,
            TituloTx: "Alfabetização de Adultos",
            DescricaoDs: "Programa de alfabetização voltado para adultos que não tiveram a oportunidade de aprender a ler e escrever na idade apropriada.",
            ImagemUrlTx: "",
            DtPublicacaoDt: new Date().toISOString(),
          }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const staticWorkshopsForDisplay = [
    {
      title: "Informática Básica",
      description: "Curso introdutório de informática para iniciantes, abordando conceitos básicos de computação, internet e ferramentas digitais.",
      duration: "40 horas",
      participants: "15 vagas",
      image: "💻",
      category: "Tecnologia"
    },
    {
      title: "Alfabetização de Adultos",
      description: "Programa de alfabetização voltado para adultos que não tiveram a oportunidade de aprender a ler e escrever na idade apropriada.",
      duration: "60 horas",
      participants: "20 vagas",
      image: "📚",
      category: "Educação"
    },
    {
      title: "Capacitação Profissional",
      description: "Curso de desenvolvimento de habilidades profissionais, incluindo técnicas de entrevista, elaboração de currículo e postura profissional.",
      duration: "30 horas",
      participants: "25 vagas",
      image: "👔",
      category: "Profissional"
    },
    {
      title: "Artesanato e Geração de Renda",
      description: "Oficinas de artesanato com foco na geração de renda, ensinando técnicas de criação e comercialização de produtos artesanais.",
      duration: "50 horas",
      participants: "12 vagas",
      image: "🎨",
      category: "Arte"
    },
    {
      title: "Educação Financeira",
      description: "Curso sobre planejamento financeiro pessoal, controle de gastos, poupança e noções básicas de investimento.",
      duration: "20 horas",
      participants: "30 vagas",
      image: "💰",
      category: "Financeiro"
    },
    {
      title: "Culinária Básica",
      description: "Aulas práticas de culinária com foco em preparo de refeições nutritivas e econômicas para o dia a dia.",
      duration: "35 horas",
      participants: "16 vagas",
      image: "👩‍🍳",
      category: "Culinária"
    }
  ];

  const WorkshopCard = ({ workshop, staticData }: { workshop?: any, staticData?: any }) => {
    const data = workshop || staticData;
    const isFromAPI = !!workshop;
    
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-4xl">{staticData?.image || "📋"}</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-montserrat font-medium">
              {staticData?.category || "Workshop"}
            </span>
          </div>
          <CardTitle className="font-montserrat text-xl">
            {isFromAPI ? data.TituloTx : data.title}
          </CardTitle>
          <CardDescription className="font-inter">
            {isFromAPI ? data.DescricaoDs : data.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span className="font-inter">{staticData?.duration || "40 horas"}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span className="font-inter">{staticData?.participants || "15 vagas"}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full font-montserrat font-medium">
              Inscrever-se
            </Button>
            <Button 
              variant="outline" 
              className="w-full font-montserrat font-medium"
              onClick={() => {
                if (isFromAPI && data.AtividadeId) {
                  navigate(`/workshops/${data.AtividadeId}`);
                } else {
                  // For static workshops, navigate to a placeholder ID
                  const staticId = staticWorkshopsForDisplay.findIndex(w => w.title === data.title) + 100;
                  navigate(`/workshops/${staticId}`);
                }
              }}
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Show API workshops first, then fill with static ones */}
              {workshops.map((workshop, index) => {
                const staticData = staticWorkshopsForDisplay[index] || staticWorkshopsForDisplay[0];
                return (
                  <WorkshopCard 
                    key={workshop.AtividadeId || index} 
                    workshop={workshop}
                    staticData={staticData}
                  />
                );
              })}
              
              {/* Fill remaining with static workshops if needed */}
              {workshops.length < staticWorkshopsForDisplay.length && 
                staticWorkshopsForDisplay.slice(workshops.length).map((staticWorkshop, index) => (
                  <WorkshopCard 
                    key={`static-${index}`} 
                    staticData={staticWorkshop}
                  />
                ))
              }
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
