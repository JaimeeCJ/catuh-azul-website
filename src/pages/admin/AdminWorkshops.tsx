
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000/api/atividades";

const AdminWorkshops = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [workshops, setWorkshops] = useState([]);
  const [form, setForm] = useState({
    TituloTx: "",
    DescricaoDs: "",
    DescricaoDetalhadaDs: "",
    DtPublicacaoDt: "",
    DuracaoHorasNr: "40",
    NumeroVagasNr: "15",
    StatusAtivoFl: true,
  });
  const [loading, setLoading] = useState(true);

  // Fetch activities from Laravel API
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setWorkshops(data))
      .finally(() => setLoading(false));
  }, []);

  // Handle input change for the form
  function handleFormChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });
  }

  // Add new activity via API (POST)
  async function handleSaveWorkshop(e) {
    e.preventDefault();
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const novo = await res.json();
      setWorkshops((prev) => [...prev, novo]);
      setForm({
        TituloTx: "",
        DescricaoDs: "",
        DescricaoDetalhadaDs: "",
        DtPublicacaoDt: "",
        DuracaoHorasNr: "40",
        NumeroVagasNr: "15",
        StatusAtivoFl: true,
      });
      setShowForm(false);
      toast({
        title: "Workshop criado",
        description: "O novo workshop foi adicionado com sucesso.",
      });
    } else {
      toast({
        title: "Erro ao criar workshop",
        description: "Verifique os campos e tente novamente.",
        variant: "destructive",
      });
    }
  }

  // Deleta atividade via API
  async function handleDeleteWorkshop(atividadeId) {
    const res = await fetch(`${API_URL}/${atividadeId}`, { method: "DELETE" });
    if (res.ok) {
      setWorkshops(workshops.filter((w) => w.AtividadeId !== atividadeId));
      toast({
        title: "Workshop excluído",
        description: "O workshop foi removido com sucesso.",
      });
    } else {
      toast({
        title: "Erro ao excluir workshop",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-montserrat font-bold text-primary-dark mb-2">
            Gerenciar Workshops
          </h1>
          <p className="text-gray-600 font-inter">
            Administre os cursos e workshops oferecidos pela CATUH
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Workshop</span>
        </Button>
      </div>

      {/* Formulário de Novo Workshop */}
      {showForm && (
        <Card>
          <form onSubmit={handleSaveWorkshop}>
            <CardHeader>
              <CardTitle className="font-montserrat">Novo Workshop</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título do Workshop
                  </label>
                  <Input
                    name="TituloTx"
                    value={form.TituloTx}
                    onChange={handleFormChange}
                    placeholder="Ex: Curso de Culinária"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Publicação
                  </label>
                  <Input
                    name="DtPublicacaoDt"
                    type="date"
                    value={form.DtPublicacaoDt}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duração (horas)
                  </label>
                  <Input
                    name="DuracaoHorasNr"
                    type="number"
                    value={form.DuracaoHorasNr}
                    onChange={handleFormChange}
                    placeholder="40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Vagas
                  </label>
                  <Input
                    name="NumeroVagasNr"
                    type="number"
                    value={form.NumeroVagasNr}
                    onChange={handleFormChange}
                    placeholder="15"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição Resumida
                </label>
                <Textarea
                  name="DescricaoDs"
                  placeholder="Descrição curta para listagem..."
                  rows={3}
                  value={form.DescricaoDs}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição Detalhada
                </label>
                <Textarea
                  name="DescricaoDetalhadaDs"
                  placeholder="Descrição completa do workshop, objetivos, metodologia..."
                  rows={4}
                  value={form.DescricaoDetalhadaDs}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="StatusAtivoFl"
                  name="StatusAtivoFl"
                  checked={form.StatusAtivoFl}
                  onChange={handleFormChange}
                  className="rounded"
                />
                <label htmlFor="StatusAtivoFl" className="text-sm font-medium text-gray-700">
                  Workshop ativo (visível no site)
                </label>
              </div>
              <div className="flex space-x-2">
                <Button type="submit">Salvar Workshop</Button>
                <Button variant="outline" type="button" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      )}

      {/* Lista de Workshops */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 text-center py-8">Carregando...</div>
        ) : (
          workshops.map((workshop) => (
            <Card key={workshop.AtividadeId}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-montserrat text-lg">
                      {workshop.TituloTx}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        workshop.StatusAtivoFl !== false 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {workshop.StatusAtivoFl !== false ? 'Ativo' : 'Inativo'}
                      </span>
                      {workshop.DuracaoHorasNr && (
                        <span className="text-xs text-gray-500">
                          {workshop.DuracaoHorasNr}h
                        </span>
                      )}
                      {workshop.NumeroVagasNr && (
                        <span className="text-xs text-gray-500">
                          {workshop.NumeroVagasNr} vagas
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/workshops/edit/${workshop.AtividadeId}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteWorkshop(workshop.AtividadeId)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm mb-2">{workshop.DescricaoDs}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>
                    Publicação: {workshop.DtPublicacaoDt ? workshop.DtPublicacaoDt.slice(0, 10) : "--"}
                  </span>
                  {workshop.galeria && workshop.galeria.length > 0 && (
                    <span>{workshop.galeria.length} foto(s)</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminWorkshops;
