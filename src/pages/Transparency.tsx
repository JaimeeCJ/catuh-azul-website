
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { API_BASE_URL } from '@/utils/api';

interface Document {
  id: number;
  nome: string;
  categoria_id: number;
  caminho: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  nome: string;
  descricao: string | null;
  created_at: string;
  updated_at: string;
}

const Transparency = () => {
  const [activeTab, setActiveTab] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/documentos`);
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error("Erro ao carregar documentos:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categorias-documentos`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
        if (data.length > 0 && !activeTab) {
          setActiveTab(data[0].id.toString());
        }
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchDocuments(), fetchCategories()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const getDocumentsByCategory = (categoryId: string) => {
    return documents.filter(doc => doc.categoria_id.toString() === categoryId);
  };

  const handleDownload = (document: Document) => {
    const downloadUrl = `${API_BASE_URL}/storage/${document.caminho}`;
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
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <FileText className="h-8 w-8 text-primary-dark flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <CardTitle className="font-montserrat text-lg leading-tight">{doc.nome}</CardTitle>
              <CardDescription className="font-inter">
                Data: {formatDate(doc.created_at)}
              </CardDescription>
            </div>
          </div>
          <span className="bg-primary-light text-primary-dark px-2 py-1 rounded text-xs font-montserrat flex-shrink-0 ml-2">
            {getFileExtension(doc.caminho)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
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
        <section className="bg-gradient-to-r from-primary-light to-primary-dark text-white py-12 sm:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
              Transparência
            </h1>
            <p className="font-inter text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
              Acesse nossos documentos institucionais, relatórios financeiros e informações sobre nossa gestão com total transparência.
            </p>
          </div>
        </section>
        
        <section className="py-12 sm:py-16 pb-24">
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
      <section className="bg-gradient-to-r from-primary-light to-primary-dark text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
            Transparência
          </h1>
          <p className="font-inter text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            Acesse nossos documentos institucionais, relatórios financeiros e informações sobre nossa gestão com total transparência.
          </p>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-12 sm:py-16 pb-24">
        <div className="container mx-auto px-4">
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-montserrat text-lg text-gray-500 mb-2">
                Nenhuma categoria disponível
              </h3>
              <p className="font-inter text-gray-400">
                As categorias de documentos serão publicadas em breve.
              </p>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto mb-8">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1 h-auto p-1">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id.toString()} 
                      className="font-inter text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      <span className="truncate">{category.nome}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {categories.map((category) => {
                const categoryDocuments = getDocumentsByCategory(category.id.toString());
                
                return (
                  <TabsContent key={category.id} value={category.id.toString()} className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="font-montserrat font-bold text-xl sm:text-2xl text-primary-dark mb-2">
                        {category.nome}
                      </h2>
                      {category.descricao && (
                        <p className="font-inter text-gray-600">
                          {category.descricao}
                        </p>
                      )}
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
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {categoryDocuments.map((doc) => (
                          <DocumentCard key={doc.id} doc={doc} />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          )}
        </div>
      </section>
    </div>
  );
};

export default Transparency;
