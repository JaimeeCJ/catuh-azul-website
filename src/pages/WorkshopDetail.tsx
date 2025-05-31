
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WorkshopBreadcrumb from "@/components/workshop-detail/WorkshopBreadcrumb";
import WorkshopHero from "@/components/workshop-detail/WorkshopHero";
import WorkshopImage from "@/components/workshop-detail/WorkshopImage";
import WorkshopDescription from "@/components/workshop-detail/WorkshopDescription";
import WorkshopProgram from "@/components/workshop-detail/WorkshopProgram";
import WorkshopGallery from "@/components/workshop-detail/WorkshopGallery";
import WorkshopInfo from "@/components/workshop-detail/WorkshopInfo";
import WorkshopCTA from "@/components/workshop-detail/WorkshopCTA";
import WorkshopRequirements from "@/components/workshop-detail/WorkshopRequirements";

const WorkshopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    fetch(`http://localhost:8000/api/atividades/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Workshop não encontrado");
        return res.json();
      })
      .then(data => {
        setWorkshop(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Erro ao carregar workshop.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: workshop?.TituloTx,
        text: workshop?.DescricaoDs,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "Link do workshop copiado para a área de transferência.",
      });
    }
  };

  // Função para obter URL completa da imagem
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return `http://localhost:8000/storage/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando workshop...</p>
        </div>
      </div>
    );
  }

  if (error || !workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Workshop não encontrado</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate("/workshops")} className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar aos Workshops</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in min-h-screen bg-gray-50">
      <WorkshopBreadcrumb workshopTitle={workshop.TituloTx} />
      
      <WorkshopHero 
        title={workshop.TituloTx}
        description={workshop.DescricaoDs}
        onShare={handleShare}
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <WorkshopImage 
                imagePath={workshop.ImagemBlob}
                title={workshop.TituloTx}
                getImageUrl={getImageUrl}
              />

              <WorkshopDescription 
                description={workshop.DescricaoDs}
                detailedDescription={workshop.DescricaoDetalhadaDs}
              />

              {workshop.CronogramaDs && (
                <WorkshopProgram cronograma={workshop.CronogramaDs} />
              )}

              <WorkshopGallery 
                galeria={workshop.galeria}
                getImageUrl={getImageUrl}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <WorkshopInfo 
                dataInicio={workshop.DataInicioDt}
                dataFim={workshop.DataFimDt}
                duracaoHoras={workshop.DuracaoHorasNr}
                numeroVagas={workshop.NumeroVagasNr}
                localRealizacao={workshop.LocalRealizacaoTx}
              />

              <WorkshopCTA workshopTitle={workshop.TituloTx} />

              {workshop.PreRequisitosDs && (
                <WorkshopRequirements preRequisitos={workshop.PreRequisitosDs} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopDetail;
