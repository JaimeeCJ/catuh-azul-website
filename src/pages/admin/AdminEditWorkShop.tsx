
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AdminEditWorkshop() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    TituloTx: "",
    DescricaoDs: "",
    DescricaoDetalhada: "",
    DtPublicacaoDt: "",
    DuracaoHoras: "",
    NumeroVagas: "",
    PreRequisitos: "",
    LocalRealizacao: "",
    DataInicio: "",
    DataFim: "",
    Cronograma: "",
    StatusAtivo: true,
  });
  
  const [imagemFile, setImagemFile] = useState(null);
  const [galeriaFiles, setGaleriaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carrega dados da atividade para edição
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/atividades/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Atividade não encontrada");
        return res.json();
      })
      .then(data => {
        setForm({
          TituloTx: data.TituloTx || "",
          DescricaoDs: data.DescricaoDs || "",
          DescricaoDetalhada: data.DescricaoDetalhada || "",
          DtPublicacaoDt: data.DtPublicacaoDt ? data.DtPublicacaoDt.slice(0, 10) : "",
          DuracaoHoras: data.DuracaoHoras || "40",
          NumeroVagas: data.NumeroVagas || "15",
          PreRequisitos: data.PreRequisitos || "Não há pré-requisitos específicos",
          LocalRealizacao: data.LocalRealizacao || "CATUH - Barretos/SP",
          DataInicio: data.DataInicio ? data.DataInicio.slice(0, 10) : "",
          DataFim: data.DataFim ? data.DataFim.slice(0, 10) : "",
          Cronograma: data.Cronograma || "",
          StatusAtivo: data.StatusAtivo !== false,
        });
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Erro ao buscar atividade.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });
  }

  function handleFileChange(e) {
    setImagemFile(e.target.files[0]);
  }

  function handleGaleriaChange(e) {
    setGaleriaFiles(Array.from(e.target.files));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const formData = new FormData();
      
      // Adiciona todos os campos do formulário
      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });
      
      // Adiciona imagem principal se selecionada
      if (imagemFile) {
        formData.append("ImagemBlob", imagemFile);
      }
      
      // Adiciona imagens da galeria se selecionadas
      galeriaFiles.forEach((file, index) => {
        formData.append(`GaleriaImagens[${index}]`, file);
      });

      const res = await fetch(`http://localhost:8000/api/atividades/${id}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
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
        <Button
          variant="outline"
          onClick={() => navigate("/admin/workshops")}
        >
          Voltar
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basicos" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basicos">Dados Básicos</TabsTrigger>
            <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
            <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
            <TabsTrigger value="midia">Imagens</TabsTrigger>
          </TabsList>

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
                  <Label htmlFor="DescricaoDetalhada">Descrição Detalhada</Label>
                  <Textarea
                    id="DescricaoDetalhada"
                    name="DescricaoDetalhada"
                    rows={6}
                    value={form.DescricaoDetalhada}
                    onChange={handleChange}
                    placeholder="Descrição completa do workshop, objetivos, metodologia..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="StatusAtivo"
                    name="StatusAtivo"
                    checked={form.StatusAtivo}
                    onChange={handleChange}
                    className="rounded"
                  />
                  <Label htmlFor="StatusAtivo">Workshop ativo (visível no site)</Label>
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
                    <Label htmlFor="DuracaoHoras">Duração (horas)</Label>
                    <Input
                      id="DuracaoHoras"
                      name="DuracaoHoras"
                      type="number"
                      value={form.DuracaoHoras}
                      onChange={handleChange}
                      placeholder="40"
                    />
                  </div>
                  <div>
                    <Label htmlFor="NumeroVagas">Número de Vagas</Label>
                    <Input
                      id="NumeroVagas"
                      name="NumeroVagas"
                      type="number"
                      value={form.NumeroVagas}
                      onChange={handleChange}
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="LocalRealizacao">Local</Label>
                    <Input
                      id="LocalRealizacao"
                      name="LocalRealizacao"
                      value={form.LocalRealizacao}
                      onChange={handleChange}
                      placeholder="CATUH - Barretos/SP"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="DataInicio">Data de Início</Label>
                    <Input
                      id="DataInicio"
                      name="DataInicio"
                      type="date"
                      value={form.DataInicio}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="DataFim">Data de Término</Label>
                    <Input
                      id="DataFim"
                      name="DataFim"
                      type="date"
                      value={form.DataFim}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="PreRequisitos">Pré-requisitos</Label>
                  <Textarea
                    id="PreRequisitos"
                    name="PreRequisitos"
                    rows={3}
                    value={form.PreRequisitos}
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
                  <Label htmlFor="Cronograma">Cronograma/Programa</Label>
                  <Textarea
                    id="Cronograma"
                    name="Cronograma"
                    rows={8}
                    value={form.Cronograma}
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
            <Card>
              <CardHeader>
                <CardTitle>Imagens do Workshop</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ImagemBlob">Imagem Principal</Label>
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
                </div>

                <div>
                  <Label htmlFor="GaleriaImagens">Galeria de Fotos (múltiplas)</Label>
                  <Input
                    id="GaleriaImagens"
                    name="GaleriaImagens"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGaleriaChange}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Selecione múltiplas imagens para a galeria do workshop
                  </p>
                </div>
              </CardContent>
            </Card>
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
