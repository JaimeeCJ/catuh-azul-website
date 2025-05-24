
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
                  A Casa Assistencial Trabalhadores da Última Hora foi fundada com o propósito de oferecer apoio integral à comunidade de Barretos, especialmente àqueles em situação de vulnerabilidade social.
                </p>
                <p>
                  Ao longo dos anos, nossa organização tem se dedicado a promover a dignidade humana através de programas assistenciais, educacionais e de capacitação profissional, sempre pautados nos valores cristãos de amor, solidariedade e justiça social.
                </p>
                <p>
                  Com o apoio da comunidade local e de parceiros comprometidos com nossa causa, conseguimos expandir nossos serviços e alcançar cada vez mais famílias necessitadas.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light/20 to-primary-dark/20 rounded-lg p-8 h-80 flex items-center justify-center">
              <span className="font-montserrat text-primary-dark text-6xl">📖</span>
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
                Promover o desenvolvimento humano e social através de ações assistenciais, educacionais e de capacitação, contribuindo para uma sociedade mais justa e solidária.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-dark font-bold text-2xl">👁️</span>
              </div>
              <h3 className="font-montserrat font-bold text-xl text-primary-dark mb-4">Visão</h3>
              <p className="font-inter text-gray-700">
                Ser reconhecida como uma organização de referência na promoção do desenvolvimento social e na transformação de vidas na região de Barretos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-dark font-bold text-2xl">⭐</span>
              </div>
              <h3 className="font-montserrat font-bold text-xl text-primary-dark mb-4">Valores</h3>
              <p className="font-inter text-gray-700">
                Amor ao próximo, solidariedade, transparência, respeito à dignidade humana, compromisso social e ética em todas as nossas ações.
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
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gradient-to-br from-primary-light/30 to-primary-dark/30 rounded-lg h-64 flex items-center justify-center">
                <span className="font-montserrat text-primary-dark text-4xl">🏢</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
