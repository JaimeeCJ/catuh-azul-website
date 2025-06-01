
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Upload, Eye } from "lucide-react";

export default function AdminEditWorkshop() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    TituloTx: "",
    DescricaoDs: "",
    DescricaoDetalhadaDs: "",
    DtPublicacaoDt: "",
    DuracaoHorasNr: "",
    NumeroVagasNr: "",
    PreRequisitosDs: "",
    LocalRealizacaoTx: "",
    DataInicioDt: "",
    DataFimDt: "",
    CronogramaDs: "",
    StatusAtivoFl: true,
  });
  
  const [imagemFile, setImagemFile] = useState(null);
  const [galeriaFiles, setGaleriaFiles] = useState([]);
  const [imagemAtual, setImagemAtual] = useState("");
  const [galeriaAtual, setGaleriaAtual] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Função para obter URL da imagem
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8000/storage/${imagePath}`;
  };

  // Carrega dados da atividade para edição
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`http://localhost:8000/api/atividades/${id}`),
      fetch(`http://localhost:8000/api/atividades/${id}/galeria`).catch(() => ({ json: () => [] }))
    ]).then(async ([atividadeRes, galeriaRes]) => {
      if (!atividadeRes.ok) throw new Error("Atividade não encontrada");
      
      const data = await atividadeRes.json();
      const galeriaData = await galeriaRes.json();
      
      console.log('Galeria data:', galeriaData); // Para debug
      
      setForm({
        TituloTx: data.TituloTx || "",
        DescricaoDs: data.DescricaoDs || "",
        DescricaoDetalhadaDs: data.DescricaoDetalhadaDs || "",
        DtPublicacaoDt: data.DtPublicacaoDt ? data.DtPublicacaoDt.slice(0, 10) : "",
        DuracaoHorasNr: data.DuracaoHorasNr || "40",
        NumeroVagasNr: data.NumeroVagasNr || "15",
        PreRequisitosDs: data.PreRequisitosDs || "Não há pré-requisitos específicos",
        LocalRealizacaoTx: data.LocalRealizacaoTx || "CATUH - Barretos/SP",
        DataInicioDt: data.DataInicioDt ? data.DataInicioDt.slice(0, 10) : "",
        DataFimDt: data.DataFimDt ? data.DataFimDt.slice(0, 10) : "",
        CronogramaDs: data.CronogramaDs || "",
        StatusAtivoFl: data.StatusAtivoFl !== false,
      });
      
      setImagemAtual(data.ImagemBlob || "");
      setGaleriaAtual(Array.isArray(galeriaData) ? galeriaData : []);
      setError("");
    }).catch((err) => {
      setError(err.message || "Erro ao buscar atividade.");
    }).finally(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });
  }

  function handleFileChange(e) {
    console.log(e.target.files[0]); 
    setImagemFile(e.target.files[0]);
  }

  function handleGaleriaChange(e) {
    console.log(e.target.files); 
    setGaleriaFiles(Array.from(e.target.files));
  }

  const handleRemoverImagemPrincipal = () => {
    setImagemAtual("");
    setImagemFile(null);
  };

  const handleRemoverImagemGaleria = async (imagem) => {
    console.log('Removendo imagem:', imagem); // Para debug
    
    // Usar o ID da imagem ou o índice baseado na estrutura dos dados
    const imagemId = imagem.id || imagem.IdGaleria;
    
    if (!imagemId) {
      toast({
        title: "Erro ao remover",
        description: "ID da imagem não encontrado.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/galeria/${imagemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setGaleriaAtual(galeriaAtual.filter(img => 
          (img.id || img.IdGaleria) !== imagemId
        ));
        toast({
          title: "Imagem removida",
          description: "A imagem foi removida da galeria.",
        });
      } else {
        throw new Error("Erro na resposta do servidor");
      }
    } catch (error) {
      console.error('Erro ao remover imagem:', error);
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover a imagem.",
        variant: "destructive",
      });
    }
  };

  const handleGerenciarGaleria = () => {
    navigate(`/admin/workshops/gallery/${id}`);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');

      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });
      
      if (imagemFile) {
        formData.append("ImagemBlob", imagemFile);
      }
      
      galeriaFiles.forEach((file, index) => {
        formData.append(`GaleriaImagens[${index}]`, file);
      });
    
      const res = await fetch(`http://localhost:8000/api/atividades/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao atualizar atividade");

      toast({
        title: "Workshop atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });

      navigate("/admin/workshops");
    } catch (err) {
      setError(err.message || "Erro ao atualizar.");
      toast({
        title: "Erro ao atualizar",
        description: err.message || "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-lg mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button variant="outline" onClick={() => navigate("/admin/workshops")}>
                Voltar aos Workshops
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-montserrat font-bold text-gray-900">
            Editar Workshop
          </h1>
          <p className="text-gray-600 mt-1">{form.TituloTx}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleGerenciarGaleria}
          >
            <Eye className="h-4 w-4 mr-2" />
            Gerenciar Galeria
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/admin/workshops")}
          >
            Voltar
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basicos" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basicos">Dados Básicos</TabsTrigger>
            <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
            <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
            <TabsTrigger value="midia">Imagens</TabsTrigger>
          </TabsList>

          {/* ... keep existing code (basicos, detalhes, cronograma tabs) */}
          <TabsContent value="basicos">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="TituloTx">Título do Workshop</Label>
                    <Input
                      id="TituloTx"
                      name="TituloTx"
                      value={form.TituloTx}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="DtPublicacaoDt">Data de Publicação</Label>
                    <Input
                      id="DtPublicacaoDt"
                      name="DtPublicacaoDt"
                      type="date"
                      value={form.DtPublicacaoDt}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="DescricaoDs">Descrição Resumida</Label>
                  <Textarea
                    id="DescricaoDs"
                    name="DescricaoDs"
                    rows={3}
                    value={form.DescricaoDs}
                    onChange={handleChange}
                    placeholder="Descrição curta para listagem..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="DescricaoDetalhadaDs">Descrição Detalhada</Label>
                  <Textarea
                    id="DescricaoDetalhadaDs"
                    name="DescricaoDetalhadaDs"
                    rows={6}
                    value={form.DescricaoDetalhadaDs}
                    onChange={handleChange}
                    placeholder="Descrição completa do workshop, objetivos, metodologia..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="StatusAtivoFl"
                    name="StatusAtivoFl"
                    checked={form.StatusAtivoFl}
                    onChange={handleChange}
                    className="rounded"
                  />
                  <Label htmlFor="StatusAtivoFl">Workshop ativo (visível no site)</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detalhes">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Workshop</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="DuracaoHorasNr">Duração (horas)</Label>
                    <Input
                      id="DuracaoHorasNr"
                      name="DuracaoHorasNr"
                      type="number"
                      value={form.DuracaoHorasNr}
                      onChange={handleChange}
                      placeholder="40"
                    />
                  </div>
                  <div>
                    <Label htmlFor="NumeroVagasNr">Número de Vagas</Label>
                    <Input
                      id="NumeroVagasNr"
                      name="NumeroVagasNr"
                      type="number"
                      value={form.NumeroVagasNr}
                      onChange={handleChange}
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="LocalRealizacaoTx">Local</Label>
                    <Input
                      id="LocalRealizacaoTx"
                      name="LocalRealizacaoTx"
                      value={form.LocalRealizacaoTx}
                      onChange={handleChange}
                      placeholder="CATUH - Barretos/SP"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="DataInicioDt">Data de Início</Label>
                    <Input
                      id="DataInicioDt"
                      name="DataInicioDt"
                      type="date"
                      value={form.DataInicioDt}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="DataFimDt">Data de Término</Label>
                    <Input
                      id="DataFimDt"
                      name="DataFimDt"
                      type="date"
                      value={form.DataFimDt}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="PreRequisitosDs">Pré-requisitos</Label>
                  <Textarea
                    id="PreRequisitosDs"
                    name="PreRequisitosDs"
                    rows={3}
                    value={form.PreRequisitosDs}
                    onChange={handleChange}
                    placeholder="Descreva os pré-requisitos necessários..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cronograma">
            <Card>
              <CardHeader>
                <CardTitle>Programa do Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="CronogramaDs">Cronograma/Programa</Label>
                  <Textarea
                    id="CronogramaDs"
                    name="CronogramaDs"
                    rows={8}
                    value={form.CronogramaDs}
                    onChange={handleChange}
                    placeholder="Descreva o cronograma do curso, módulos, tópicos abordados..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Dica: Use linhas separadas para cada módulo ou tópico
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="midia">
            <div className="space-y-6">
              {/* Imagem Principal Atual */}
              <Card>
                <CardHeader>
                  <CardTitle>Imagem Principal Atual</CardTitle>
                </CardHeader>
                <CardContent>
                  {imagemAtual ? (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <img
                          src={getImageUrl(imagemAtual)}
                          alt="Imagem principal atual"
                          className="w-full max-w-md h-48 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={handleRemoverImagemPrincipal}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Para alterar, selecione uma nova imagem abaixo
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">Nenhuma imagem principal definida</p>
                  )}
                </CardContent>
              </Card>

              {/* Upload Nova Imagem Principal */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Upload className="h-5 w-5 inline mr-2" />
                    {imagemAtual ? "Alterar Imagem Principal" : "Nova Imagem Principal"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    id="ImagemBlob"
                    name="ImagemBlob"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Imagem que aparecerá como destaque do workshop
                  </p>
                </CardContent>
              </Card>

              {/* Galeria Atual */}
              <Card>
                <CardHeader>
                  <CardTitle>Galeria de Fotos Atual ({galeriaAtual.length} imagens)</CardTitle>
                </CardHeader>
                <CardContent>
                  {galeriaAtual.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {galeriaAtual.map((imagem, index) => (
                        <div key={imagem.id || imagem.IdGaleria || index} className="relative">
                          <img
                            src={getImageUrl(imagem.ImagemBlob || imagem.url)}
                            alt={`Galeria ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1"
                            onClick={() => handleRemoverImagemGaleria(imagem)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Nenhuma imagem na galeria</p>
                  )}
                </CardContent>
              </Card>

              {/* Upload Novas Imagens da Galeria */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Upload className="h-5 w-5 inline mr-2" />
                    Adicionar à Galeria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    id="GaleriaImagens"
                    name="GaleriaImagens"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGaleriaChange}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Selecione múltiplas imagens para adicionar à galeria
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-4 pt-6 border-t">
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/workshops")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
