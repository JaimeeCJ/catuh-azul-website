
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, BookOpen } from "lucide-react";

const Workshops = () => {
  const workshops = [
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

  const WorkshopCard = ({ workshop }: { workshop: typeof workshops[0] }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-4xl">{workshop.image}</span>
          <span className="bg-primary-light text-primary-dark px-3 py-1 rounded-full text-xs font-montserrat font-medium">
            {workshop.category}
          </span>
        </div>
        <CardTitle className="font-montserrat text-xl">{workshop.title}</CardTitle>
        <CardDescription className="font-inter">{workshop.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span className="font-inter">{workshop.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span className="font-inter">{workshop.participants}</span>
          </div>
        </div>
        <div className="space-y-2">
          <Button className="w-full font-montserrat font-medium">
            Inscrever-se
          </Button>
          <Button variant="outline" className="w-full font-montserrat font-medium">
            Saiba Mais
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-light to-primary-dark text-white py-16">
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
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-primary-dark" />
              </div>
              <h3 className="font-montserrat font-semibold text-lg mb-2">Cursos Gratuitos</h3>
              <p className="font-inter text-gray-600">
                Todos os nossos cursos são oferecidos gratuitamente para a comunidade
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary-dark" />
              </div>
              <h3 className="font-montserrat font-semibold text-lg mb-2">Para Todos</h3>
              <p className="font-inter text-gray-600">
                Nossos programas são abertos a pessoas de todas as idades e níveis
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary-dark" />
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
            <h2 className="font-montserrat font-bold text-3xl text-primary-dark mb-4">
              Nossos Programas
            </h2>
            <p className="font-inter text-lg text-gray-700 max-w-2xl mx-auto">
              Explore nossa variedade de cursos e workshops projetados para desenvolver habilidades e promover o crescimento pessoal e profissional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop, index) => (
              <WorkshopCard key={index} workshop={workshop} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-3xl mb-6">
            Pronto para Começar?
          </h2>
          <p className="font-inter text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato conosco para mais informações sobre inscrições, cronogramas e requisitos dos cursos.
          </p>
          <Button size="lg" variant="secondary" className="font-montserrat font-semibold">
            Fale Conosco
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Workshops;
