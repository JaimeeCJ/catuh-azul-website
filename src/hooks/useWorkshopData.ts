
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/utils/api";

export interface WorkshopForm {
  TituloTx: string;
  DescricaoDs: string;
  DescricaoDetalhadaDs: string;
  DtPublicacaoDt: string;
  DuracaoHorasNr: string;
  NumeroVagasNr: string;
  PreRequisitosDs: string;
  LocalRealizacaoTx: string;
  DataInicioDt: string;
  DataFimDt: string;
  CronogramaDs: string;
  StatusAtivoFl: boolean;
}

export const useWorkshopData = (id: string) => {
  const { toast } = useToast();
  const [form, setForm] = useState<WorkshopForm>({
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
  
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [galeriaFiles, setGaleriaFiles] = useState<File[]>([]);
  const [imagemAtual, setImagemAtual] = useState("");
  const [galeriaAtual, setGaleriaAtual] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8000/storage/${imagePath}`;
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      apiRequest(`/atividades/${id}`),
      apiRequest(`/atividades/${id}/galeria`).catch(() => ({ json: () => [] }))
    ]).then(async ([atividadeRes, galeriaRes]) => {
      if (!atividadeRes.ok) throw new Error("Atividade não encontrada");
      
      const data = await atividadeRes.json();
      const galeriaData = await galeriaRes.json();
      
      console.log('Galeria data:', galeriaData);
      
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleRemoverImagemGaleria = async (imagem: any) => {
    console.log('Removendo imagem:', imagem);
    
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
      const res = await apiRequest(`/galeria/${imagemId}`, {
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

  return {
    form,
    setForm,
    imagemFile,
    setImagemFile,
    galeriaFiles,
    setGaleriaFiles,
    imagemAtual,
    setImagemAtual,
    galeriaAtual,
    setGaleriaAtual,
    loading,
    setLoading,
    error,
    setError,
    getImageUrl,
    handleFormChange,
    handleRemoverImagemGaleria,
    toast
  };
};
