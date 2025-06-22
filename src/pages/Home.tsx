
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { EffectFade, Autoplay } from 'swiper/modules';

const Home = () => {
  const images = [
    "/fade/img1.jpg",
    "/fade/img2.jpg",
  ];
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="absolute inset-0 h-full w-full"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <img src={src} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 bg-black/60 z-10"></div>

        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white">
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 drop-shadow-lg">
            Transformando Vidas em Barretos
          </h1>
          <p className="font-inter text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow">
            Casa Assistencial Trabalhadores da Última Hora - Uma organização dedicada ao desenvolvimento social e educacional da nossa comunidade.
          </p>
          <Button size="lg" className="bg-white text-primary-dark hover:bg-gray-100 font-montserrat font-semibold">
            Conheça Nosso Trabalho
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
