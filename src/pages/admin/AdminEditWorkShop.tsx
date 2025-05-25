import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminEditWorkshop() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    TituloTx: "",
    DescricaoDs: "",
    DtPublicacaoDt: "",
  });
  const [imagemFile, setImagemFile] = useState(null); // Para o arquivo selecionado
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
          DtPublicacaoDt: data.DtPublicacaoDt ? data.DtPublicacaoDt.slice(0, 10) : "",
        });
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Erro ao buscar atividade.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    setImagemFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Use FormData para enviar arquivo!
      const formData = new FormData();
      formData.append("TituloTx", form.TituloTx);
      formData.append("DescricaoDs", form.DescricaoDs);
      formData.append("DtPublicacaoDt", form.DtPublicacaoDt);
      if (imagemFile) {
        formData.append("ImagemBlob", imagemFile); // importante: ImagemBlob para o backend!
      }

      const res = await fetch(`http://localhost:8000/api/atividades/${id}`, {
        method: "POST", // Laravel aceita POST+_method=PUT para upload. Ou use PUT se configurou corretamente CORS (em alguns ambientes FormData só faz POST).
        headers: {
          "Accept": "application/json",
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao atualizar atividade");
      alert("Atividade atualizada com sucesso!");
      navigate("/admin/workshops");
    } catch (err) {
      setError(err.message || "Erro ao atualizar.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="p-8 max-w-lg mx-auto">
        <div className="mb-3 text-red-600">{error}</div>
        <Button variant="outline" onClick={() => navigate("/admin/workshops")}>
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-md mt-10 p-8">
      <h2 className="font-montserrat text-2xl font-bold mb-6 text-primary-dark">
        Editar Atividade/Workshop
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
        <div>
          <label className="block mb-1 text-sm text-gray-700">Título</label>
          <Input
            name="TituloTx"
            value={form.TituloTx}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-700">Descrição</label>
          <Textarea
            name="DescricaoDs"
            rows={3}
            value={form.DescricaoDs}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-700">Imagem (opcional)</label>
          <Input
            type="file"
            name="ImagemBlob"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-700">Data de Publicação</label>
          <Input
            name="DtPublicacaoDt"
            type="date"
            value={form.DtPublicacaoDt}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-4 mt-6">
          <Button type="submit" disabled={loading}>
            Salvar Alterações
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