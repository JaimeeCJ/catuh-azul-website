
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Download, Trash2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: number;
  nome: string;
  categoria_id: number;
  caminho: string;
  created_at: string;
  updated_at: string;
}

const AdminDocuments = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("1");

  const categories = [
    { id: "1", name: "Atas de Reunião" },
    { id: "2", name: "Relatórios Financeiros" },
    { id: "3", name: "Estatuto Social" },
    { id: "4", name: "Relatórios FEBRACT" },
    { id: "5", name: "Comunidade Terapêutica Samaritano" }
  ];

  const fetchDocuments = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/documentos");
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error("Erro ao carregar documentos:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os documentos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !documentName.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo e insira o nome do documento.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("nome", documentName);
    formData.append("categoria_id", selectedCategory);
    formData.append("documento", file);

    try {
      const response = await fetch("http://localhost:8000/api/documentos", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newDocument = await response.json();
        setDocuments([...documents, newDocument]);
        setDocumentName("");
        event.target.value = "";
        
        toast({
          title: "Documento carregado",
          description: `${documentName} foi carregado com sucesso.`,
        });
      } else {
        throw new Error("Erro ao fazer upload");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer o upload do documento.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (documentId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/documentos/${documentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDocuments(documents.filter(doc => doc.id !== documentId));
        toast({
          title: "Documento excluído",
          description: "O documento foi removido com sucesso.",
        });
      } else {
        throw new Error("Erro ao excluir documento");
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o documento.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (document: Document) => {
    const downloadUrl = `http://localhost:8000/storage/${document.caminho}`;
    window.open(downloadUrl, '_blank');
  };

  const getCategoryName = (categoryId: number) => {
    return categories.find(c => c.id === categoryId.toString())?.name || "Categoria desconhecida";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-light border-t-primary-dark rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando documentos...</p>
        </div>
      </div>
    );
  }

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
              <Input 
                placeholder="Ex: Ata da Reunião - Junho 2024"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
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
              disabled={uploading}
            />
            <label
              htmlFor="file-upload"
              className={`inline-block mt-4 px-4 py-2 bg-primary-dark text-white rounded cursor-pointer hover:bg-primary-dark/90 transition-colors ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? 'Enviando...' : 'Selecionar Arquivo'}
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
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum documento encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{document.nome}</h3>
                      <p className="text-sm text-gray-500">
                        {getCategoryName(document.categoria_id)} • 
                        Enviado em {formatDate(document.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownload(document)}
                    >
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDocuments;
