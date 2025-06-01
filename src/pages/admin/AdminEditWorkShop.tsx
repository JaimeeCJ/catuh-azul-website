
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";
import { useWorkshopData } from "@/hooks/useWorkshopData";
import WorkshopBasicInfo from "@/components/admin/workshop/WorkshopBasicInfo";
import WorkshopDetails from "@/components/admin/workshop/WorkshopDetails";
import WorkshopSchedule from "@/components/admin/workshop/WorkshopSchedule";
import WorkshopImageManager from "@/components/admin/workshop/WorkshopImageManager";

export default function AdminEditWorkshop() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    form,
    imagemFile,
    setImagemFile,
    galeriaFiles,
    setGaleriaFiles,
    imagemAtual,
    setImagemAtual,
    galeriaAtual,
    loading,
    setLoading,
    error,
    setError,
    getImageUrl,
    handleFormChange,
    handleRemoverImagemGaleria,
    toast
  } = useWorkshopData(id || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0]); 
    setImagemFile(e.target.files?.[0] || null);
  };

  const handleGaleriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files); 
    setGaleriaFiles(e.target.files ? Array.from(e.target.files) : []);
  };

  const handleRemoverImagemPrincipal = () => {
    setImagemAtual("");
    setImagemFile(null);
  };

  const handleGerenciarGaleria = () => {
    navigate(`/admin/workshops/gallery/${id}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');

      Object.keys(form).forEach(key => {
        formData.append(key, (form as any)[key]);
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
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar.");
      toast({
        title: "Erro ao atualizar",
        description: err.message || "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

          <TabsContent value="basicos">
            <WorkshopBasicInfo form={form} onChange={handleFormChange} />
          </TabsContent>

          <TabsContent value="detalhes">
            <WorkshopDetails form={form} onChange={handleFormChange} />
          </TabsContent>

          <TabsContent value="cronograma">
            <WorkshopSchedule form={form} onChange={handleFormChange} />
          </TabsContent>

          <TabsContent value="midia">
            <WorkshopImageManager
              imagemAtual={imagemAtual}
              galeriaAtual={galeriaAtual}
              onImagemFileChange={handleFileChange}
              onGaleriaChange={handleGaleriaChange}
              onRemoverImagemPrincipal={handleRemoverImagemPrincipal}
              onRemoverImagemGaleria={handleRemoverImagemGaleria}
              getImageUrl={getImageUrl}
            />
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
