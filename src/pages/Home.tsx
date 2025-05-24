
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6">
            Transformando Vidas em Barretos
          </h1>
          <p className="font-inter text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Casa Assistencial Trabalhadores da Última Hora - Uma organização dedicada ao desenvolvimento social e educacional da nossa comunidade.
          </p>
          <Button size="lg" className="bg-white text-primary-dark hover:bg-gray-100 font-montserrat font-semibold">
            Conheça Nosso Trabalho
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-primary-dark mb-4">
              Nossa Missão
            </h2>
            <p className="font-inter text-lg text-gray-700 max-w-3xl mx-auto">
              Promover o desenvolvimento humano e social através de programas assistenciais, educacionais e de capacitação profissional, contribuindo para a construção de uma sociedade mais justa e solidária.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-dark font-bold text-2xl">💚</span>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-3">Assistência Social</h3>
              <p className="font-inter text-gray-600">
                Apoio direto às famílias em situação de vulnerabilidade social através de programas específicos.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-dark font-bold text-2xl">📚</span>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-3">Educação</h3>
              <p className="font-inter text-gray-600">
                Cursos de capacitação, alfabetização de adultos e workshops para desenvolvimento pessoal e profissional.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-dark font-bold text-2xl">🤝</span>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-3">Comunidade</h3>
              <p className="font-inter text-gray-600">
                Fortalecimento dos laços comunitários através de projetos colaborativos e ações de cidadania.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
            Faça Parte da Nossa Missão
          </h2>
          <p className="font-inter text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a nós nesta jornada de transformação social. Seja através de doações, voluntariado ou participação em nossos programas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-montserrat font-semibold">
              Seja Voluntário
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-dark font-montserrat font-semibold">
              Entre em Contato
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
