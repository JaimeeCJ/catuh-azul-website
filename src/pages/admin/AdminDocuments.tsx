
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Download, Trash2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDocuments = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState([
    {
      id: "1",
      name: "Ata da Reunião - Janeiro 2024",
      category: "atas",
      uploadDate: "2024-01-15",
      size: "2.3 MB",
      type: "PDF"
    },
    {
      id: "2",
      name: "Relatório Financeiro 2023",
      category: "financeiro",
      uploadDate: "2024-01-10",
      size: "1.8 MB",
      type: "PDF"
    },
    {
      id: "3",
      name: "Estatuto Social",
      category: "estatuto",
      uploadDate: "2024-01-08",
      size: "3.1 MB",
      type: "PDF"
    }
  ]);

  const categories = [
    { id: "atas", name: "Atas de Reunião" },
    { id: "financeiro", name: "Relatórios Financeiros" },
    { id: "estatuto", name: "Estatuto Social" },
    { id: "febract", name: "Relatórios FEBRACT" },
    { id: "samaritano", name: "Comunidade Terapêutica Samaritano" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Documento carregado",
        description: `${file.name} foi carregado com sucesso.`,
      });
    }
  };

  const handleDelete = (documentId: string) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
    toast({
      title: "Documento excluído",
      description: "O documento foi removido com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-montserrat font-bold text-primary-dark mb-2">
          Gerenciar Documentos
        </h1>
        <p className="text-gray-600 font-inter">
          Upload e gestão de documentos de transparência
        </p>
      </div>

      {/* Upload de Documentos */}
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Adicionar Novo Documento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Documento
              </label>
              <Input placeholder="Ex: Ata da Reunião - Fevereiro 2024" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light">
                <option value="">Selecione uma categoria</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-light transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Clique para selecionar ou arraste o arquivo aqui</p>
            <p className="text-sm text-gray-400">PDF, DOC, DOCX até 10MB</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block mt-4 px-4 py-2 bg-primary-dark text-white rounded cursor-pointer hover:bg-primary-dark/90 transition-colors"
            >
              Selecionar Arquivo
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Documentos */}
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Documentos Existentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{document.name}</h3>
                    <p className="text-sm text-gray-500">
                      {categories.find(c => c.id === document.category)?.name} • 
                      {document.size} • 
                      Enviado em {document.uploadDate}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(document.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDocuments;
