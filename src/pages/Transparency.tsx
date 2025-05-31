
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

interface Document {
  id: number;
  nome: string;
  categoria_id: number;
  caminho: string;
  created_at: string;
  updated_at: string;
}

const Transparency = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = {
    "1": { name: "Atas de Reunião", description: "Documentos das reuniões da diretoria e assembleia geral" },
    "2": { name: "Relatórios Financeiros", description: "Demonstrações financeiras e relatórios de auditoria" },
    "3": { name: "Estatuto Social", description: "Documentos constitutivos e regimento interno" },
    "4": { name: "Relatórios FEBRACT", description: "Documentos e certificações da Federação Brasileira de Comunidades Terapêuticas" },
    "5": { name: "Comunidade Terapêutica Samaritano", description: "Licenciamentos, certificações e relatórios de atividades" }
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/documentos");
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error("Erro ao carregar documentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const getDocumentsByCategory = (categoryId: string) => {
    return documents.filter(doc => doc.categoria_id.toString() === categoryId);
  };

  const handleDownload = (document: Document) => {
    const downloadUrl = `http://localhost:8000/storage/${document.caminho}`;
    window.open(downloadUrl, '_blank');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toUpperCase() || 'DOC';
  };

  const DocumentCard = ({ doc }: { doc: Document }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-primary-dark" />
            <div>
              <CardTitle className="font-montserrat text-lg">{doc.nome}</CardTitle>
              <CardDescription className="font-inter">
                Data: {formatDate(doc.created_at)}
              </CardDescription>
            </div>
          </div>
          <span className="bg-primary-light text-primary-dark px-2 py-1 rounded text-xs font-montserrat">
            {getFileExtension(doc.caminho)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => handleDownload(doc)}
          >
            <FileText className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => handleDownload(doc)}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="animate-fade-in">
        <section className="bg-gradient-to-r from-primary-light to-primary-dark text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6">
              Transparência
            </h1>
            <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto">
              Acesse nossos documentos institucionais, relatórios financeiros e informações sobre nossa gestão com total transparência.
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary-light border-t-primary-dark rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando documentos...</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-light to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6">
            Transparência
          </h1>
          <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto">
            Acesse nossos documentos institucionais, relatórios financeiros e informações sobre nossa gestão com total transparência.
          </p>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
              {Object.entries(categories).map(([id, category]) => (
                <TabsTrigger key={id} value={id} className="font-inter text-xs lg:text-sm">
                  {category.name.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(categories).map(([categoryId, category]) => {
              const categoryDocuments = getDocumentsByCategory(categoryId);
              
              return (
                <TabsContent key={categoryId} value={categoryId} className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="font-montserrat font-bold text-2xl text-primary-dark mb-2">
                      {category.name}
                    </h2>
                    <p className="font-inter text-gray-600">
                      {category.description}
                    </p>
                  </div>
                  
                  {categoryDocuments.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="font-montserrat text-lg text-gray-500 mb-2">
                        Nenhum documento disponível
                      </h3>
                      <p className="font-inter text-gray-400">
                        Documentos desta categoria serão publicados em breve.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {categoryDocuments.map((doc) => (
                        <DocumentCard key={doc.id} doc={doc} />
                      ))}
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Transparency;
