const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-light to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6">
            Sobre a CATUH
          </h1>
          <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto">
            Conhece nossa história, missão e valores que guiam nosso trabalho há anos na comunidade de Barretos.
          </p>
        </div>
      </section>

      {/* História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-3xl text-primary-dark mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 font-inter text-gray-700">
                <p>
                 Fundada em 10 de outubro de 2000, a Casa Assistencial Trabalhadores da Última Hora (CATUH) nasceu do desejo de acolher e transformar vidas. Com sede em Barretos/SP, nossa instituição é uma associação civil sem fins lucrativos, de caráter filantrópico e apartidário, dedicada a atender crianças, adolescentes, jovens e famílias em situação de vulnerabilidade social. 
                </p>
                <p>
                 Desde o início, atuamos com comprometimento e sensibilidade, oferecendo apoio emergencial e promovendo vínculos familiares e comunitários, sempre buscando a inclusão e o desenvolvimento integral dos assistidos.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light/20 to-primary-dark/20 rounded-lg p-0 h-80 w-full overflow-hidden">
              <img 
                src="frente.jpg" 
                alt="Nossa História" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-dark font-bold text-2xl">🎯</span>
              </div>
              <h3 className="font-montserrat font-bold text-xl text-primary-dark mb-4">Missão</h3>
              <p className="font-inter text-gray-700">
                Promover acolhimento, formação e desenvolvimento para crianças, adolescentes, jovens e famílias em situação de vulnerabilidade social, fortalecendo vínculos, ampliando oportunidades e contribuindo para a construção de uma sociedade mais justa, solidária e humana.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-dark font-bold text-2xl">👁️</span>
              </div>
              <h3 className="font-montserrat font-bold text-xl text-primary-dark mb-4">Visão</h3>
              <p className="font-inter text-gray-700">
                Ser reconhecida como uma instituição de referência em assistência social e formação cidadã, contribuindo ativamente para a transformação social e a emancipação de indivíduos e comunidades em Barretos e região.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-dark font-bold text-2xl">⭐</span>
              </div>
              <h3 className="font-montserrat font-bold text-xl text-primary-dark mb-4">Valores</h3>
              <p className="font-inter text-gray-700">
                Solidariedade, Compromisso Social, Respeito, Educação e Formação, Parceria e Transparência. 
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Gallery Placeholder */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl text-primary-dark text-center mb-12">
            Nossas Instalações
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["aula-1.jpg", "aula-2.jpg", "img1.jpg"].map((nome, index) => (
              <div
                key={index}
                className="rounded-lg h-64 w-full overflow-hidden shadow-lg"
              >
                <img
                  src={`${nome}`}
                  alt={`Instalação ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
