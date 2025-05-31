
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Calendar, MapPin, ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const handleInscricao = () => {
    navigate("/contact", { state: { workshopTitle: workshop?.TituloTx } });
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
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button 
              onClick={() => navigate("/")}
              className="hover:text-blue-600"
            >
              Início
            </button>
            <span>/</span>
            <button 
              onClick={() => navigate("/workshops")}
              className="hover:text-blue-600"
            >
              Workshops
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">{workshop.TituloTx}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
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
              onClick={handleShare}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">
              {workshop.TituloTx}
            </h1>
            <p className="font-inter text-lg md:text-xl opacity-90">
              {workshop.DescricaoDs}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Workshop Image */}
              {workshop.ImagemBlob && (
                <Card>
                  <CardContent className="p-0">
                    <img 
                      src={getImageUrl(workshop.ImagemBlob)} 
                      alt={workshop.TituloTx}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Detailed Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat">Sobre o Workshop</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {workshop.DescricaoDetalhadaDs || workshop.DescricaoDs}
                  </p>
                </CardContent>
              </Card>

              {/* Program/Schedule */}
              {workshop.CronogramaDs && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-montserrat">Programa do Curso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-inter text-gray-700 whitespace-pre-wrap">
                      {workshop.CronogramaDs}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Gallery */}
              {workshop.galeria && workshop.galeria.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-montserrat">Galeria de Fotos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {workshop.galeria.map((foto, index) => (
                        <img
                          key={foto.GaleriaId || index}
                          src={getImageUrl(foto.ImagemBlob)}
                          alt={`Foto ${index + 1} do workshop`}
                          className="w-full h-48 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Workshop Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat">Informações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Data de Início</p>
                      <p className="text-sm text-gray-600">
                        {workshop.DataInicioDt ? 
                          new Date(workshop.DataInicioDt).toLocaleDateString('pt-BR') : 
                          "A definir"
                        }
                      </p>
                    </div>
                  </div>
                  
                  {workshop.DataFimDt && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Data de Término</p>
                        <p className="text-sm text-gray-600">
                          {new Date(workshop.DataFimDt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Duração</p>
                      <p className="text-sm text-gray-600">
                        {workshop.DuracaoHorasNr || 40} horas
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Vagas</p>
                      <p className="text-sm text-gray-600">
                        {workshop.NumeroVagasNr || 15} participantes
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Local</p>
                      <p className="text-sm text-gray-600">
                        {workshop.LocalRealizacaoTx || "CATUH - Barretos/SP"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="font-montserrat text-blue-900">
                    Interessado?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-blue-800">
                    Inscreva-se agora ou entre em contato para mais informações.
                  </p>
                  <div className="space-y-2">
                    <Button 
                      onClick={handleInscricao}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Inscrever-se
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/contact")}
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      Mais Informações
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              {workshop.PreRequisitosDs && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-montserrat">Pré-requisitos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {workshop.PreRequisitosDs}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopDetail;
