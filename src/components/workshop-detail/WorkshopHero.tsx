
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";

interface WorkshopHeroProps {
  title: string;
  description: string;
  onShare: () => void;
}

const WorkshopHero = ({ title, description, onShare }: WorkshopHeroProps) => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/workshops")}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Button
            variant="outline"
            onClick={onShare}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        </div>
        
        <div className="max-w-4xl">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">
            {title}
          </h1>
          <p className="font-inter text-lg md:text-xl opacity-90">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkshopHero;
