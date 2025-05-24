
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminWorkshops = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [workshops, setWorkshops] = useState([
    {
      id: "1",
      title: "Informática Básica",
      description: "Curso introdutório de informática para iniciantes",
      duration: "40 horas",
      participants: 25,
      status: "Ativo",
      startDate: "2024-02-01"
    },
    {
      id: "2",
      title: "Alfabetização de Adultos",
      description: "Programa de alfabetização para adultos da comunidade",
      duration: "60 horas",
      participants: 18,
      status: "Ativo",
      startDate: "2024-01-15"
    },
    {
      id: "3",
      title: "Artesanato e Trabalhos Manuais",
      description: "Workshop de artesanato para geração de renda",
      duration: "30 horas",
      participants: 12,
      status: "Concluído",
      startDate: "2023-11-01"
    }
  ]);

  const handleAddWorkshop = () => {
    setShowForm(true);
  };

  const handleSaveWorkshop = () => {
    setShowForm(false);
    toast({
      title: "Workshop criado",
      description: "O novo workshop foi adicionado com sucesso.",
    });
  };

  const handleDeleteWorkshop = (workshopId: string) => {
    setWorkshops(workshops.filter(w => w.id !== workshopId));
    toast({
      title: "Workshop excluído",
      description: "O workshop foi removido com sucesso.",
    });
  };

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
        
        <Button onClick={handleAddWorkshop} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Workshop</span>
        </Button>
      </div>

      {/* Formulário de Novo Workshop */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Novo Workshop</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título do Workshop
                </label>
                <Input placeholder="Ex: Curso de Culinária" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duração
                </label>
                <Input placeholder="Ex: 20 horas" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Início
                </label>
                <Input type="date" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Máximo de Participantes
                </label>
                <Input type="number" placeholder="Ex: 20" />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <Textarea
                placeholder="Descreva o conteúdo e objetivos do workshop..."
                rows={4}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleSaveWorkshop}>Salvar Workshop</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Workshops */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workshops.map((workshop) => (
          <Card key={workshop.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-montserrat text-lg">{workshop.title}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {workshop.participants} participantes
                    </span>
                    <span>Duração: {workshop.duration}</span>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteWorkshop(workshop.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-700 text-sm mb-4">{workshop.description}</p>
              
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  workshop.status === 'Ativo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {workshop.status}
                </span>
                
                <span className="text-sm text-gray-500">
                  Início: {workshop.startDate}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminWorkshops;
