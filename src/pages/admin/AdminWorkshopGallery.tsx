
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Upload, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from '@/utils/api';

interface GaleriaItem {
  id: number;
  url: string;
  legenda?: string;
  ordem: number;
}

export default function AdminWorkshopGallery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [workshop, setWorkshop] = useState(null);
  const [galeria, setGaleria] = useState<GaleriaItem[]>([]);
  const [novasImagens, setNovasImagens] = useState<File[]>([]);
  const [editandoLegenda, setEditandoLegenda] = useState<number | null>(null);
  const [legendaTemp, setLegendaTemp] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    // Carregar dados do workshop
    Promise.all([
      fetch(`${API_BASE_URL}/atividades/${id}`).then(res => res.json()),
      fetch(`${API_BASE_URL}/atividades/${id}/galeria`).then(res => res.json()).catch(() => [])
    ]).then(([workshopData, galeriaData]) => {
      setWorkshop(workshopData);
      setGaleria(galeriaData);
    }).finally(() => setLoading(false));
  }, [id]);

  const handleUploadImagens = async () => {
    if (novasImagens.length === 0) return;

    const formData = new FormData();
    novasImagens.forEach((file, index) => {
      formData.append(`imagens[${index}]`, file);
    });

    try {
      const res = await fetch(`${API_BASE_URL}/atividades/${id}/galeria`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const novasImagensData = await res.json();
        setGaleria([...galeria, ...novasImagensData]);
        setNovasImagens([]);
        toast({
          title: "Imagens adicionadas",
          description: "As imagens foram adicionadas à galeria com sucesso.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao fazer upload",
        description: "Não foi possível adicionar as imagens.",
        variant: "destructive",
      });
    }
  };

  const handleRemoverImagem = async (imagemId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/galeria/${imagemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setGaleria(galeria.filter(item => item.id !== imagemId));
        toast({
          title: "Imagem removida",
          description: "A imagem foi removida da galeria.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover a imagem.",
        variant: "destructive",
      });
    }
  };

  const handleSalvarLegenda = async (imagemId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/galeria/${imagemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ legenda: legendaTemp }),
      });

      if (res.ok) {
        setGaleria(galeria.map(item => 
          item.id === imagemId ? { ...item, legenda: legendaTemp } : item
        ));
        setEditandoLegenda(null);
        setLegendaTemp("");
        toast({
          title: "Legenda salva",
          description: "A legenda foi atualizada com sucesso.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a legenda.",
        variant: "destructive",
      });
    }
  };

  const handleReordenar = async (fromIndex: number, toIndex: number) => {
    const novaGaleria = [...galeria];
    const [removed] = novaGaleria.splice(fromIndex, 1);
    novaGaleria.splice(toIndex, 0, removed);
    
    // Atualizar ordem local
    const galeriaComNovaOrdem = novaGaleria.map((item, index) => ({
      ...item,
      ordem: index + 1
    }));
    
    setGaleria(galeriaComNovaOrdem);

    // Salvar nova ordem na API
    try {
      await fetch(`${API_BASE_URL}/atividades/${id}/galeria/reordenar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ordens: galeriaComNovaOrdem.map(item => ({ id: item.id, ordem: item.ordem }))
        }),
      });
    } catch (error) {
      console.error("Erro ao salvar nova ordem:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p>Carregando galeria...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-montserrat font-bold text-gray-900">
            Galeria de Fotos
          </h1>
          <p className="text-gray-600 mt-1">{workshop?.TituloTx}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/workshops/edit/${id}`)}
        >
          Voltar à Edição
        </Button>
      </div>

      {/* Upload de novas imagens */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Adicionar Novas Imagens</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setNovasImagens(Array.from(e.target.files || []))}
          />
          {novasImagens.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">
                {novasImagens.length} arquivo(s) selecionado(s)
              </p>
              <Button onClick={handleUploadImagens}>
                Fazer Upload
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Galeria atual */}
      <Card>
        <CardHeader>
          <CardTitle>Galeria Atual ({galeria.length} imagens)</CardTitle>
        </CardHeader>
        <CardContent>
          {galeria.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhuma imagem na galeria. Adicione algumas imagens acima.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galeria.map((item, index) => (
                <div key={item.id} className="relative group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.legenda || `Imagem ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    
                    <div className="p-4">
                      {editandoLegenda === item.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={legendaTemp}
                            onChange={(e) => setLegendaTemp(e.target.value)}
                            placeholder="Digite a legenda..."
                            rows={2}
                          />
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleSalvarLegenda(item.id)}
                            >
                              Salvar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setEditandoLegenda(null);
                                setLegendaTemp("");
                              }}
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-700 mb-2">
                            {item.legenda || "Sem legenda"}
                          </p>
                          <div className="flex justify-between items-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditandoLegenda(item.id);
                                setLegendaTemp(item.legenda || "");
                              }}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoverImagem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Controles de reordenação */}
                  <div className="absolute top-2 left-2 bg-black/50 text-white rounded px-2 py-1 text-xs">
                    #{index + 1}
                  </div>
                  
                  <div className="absolute top-2 right-2 space-x-1">
                    {index > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/90"
                        onClick={() => handleReordenar(index, index - 1)}
                      >
                        ↑
                      </Button>
                    )}
                    {index < galeria.length - 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/90"
                        onClick={() => handleReordenar(index, index + 1)}
                      >
                        ↓
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
