
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

const Transparency = () => {
  const [activeTab, setActiveTab] = useState("minutes");

  const documents = {
    minutes: [
      { title: "Ata da Reunião - Janeiro 2024", date: "15/01/2024", type: "PDF" },
      { title: "Ata da Reunião - Dezembro 2023", date: "20/12/2023", type: "PDF" },
      { title: "Ata da Reunião - Novembro 2023", date: "18/11/2023", type: "PDF" },
    ],
    financial: [
      { title: "Balanço Patrimonial 2023", date: "31/12/2023", type: "PDF" },
      { title: "Demonstração de Resultados 2023", date: "31/12/2023", type: "PDF" },
      { title: "Relatório de Auditoria 2023", date: "15/03/2024", type: "PDF" },
    ],
    bylaws: [
      { title: "Estatuto Social Vigente", date: "10/05/2023", type: "PDF" },
      { title: "Regimento Interno", date: "15/06/2023", type: "PDF" },
    ],
    febract: [
      { title: "Relatório FEBRACT 2023", date: "28/02/2024", type: "PDF" },
      { title: "Certificação FEBRACT", date: "15/01/2024", type: "PDF" },
    ],
    samaritano: [
      { title: "Licenciamento Sanitário", date: "10/04/2024", type: "PDF" },
      { title: "Relatório de Atividades 2023", date: "31/01/2024", type: "PDF" },
      { title: "Certificação ANVISA", date: "20/03/2024", type: "PDF" },
    ],
  };

  const DocumentCard = ({ doc }: { doc: { title: string; date: string; type: string } }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-primary-dark" />
            <div>
              <CardTitle className="font-montserrat text-lg">{doc.title}</CardTitle>
              <CardDescription className="font-inter">Data: {doc.date}</CardDescription>
            </div>
          </div>
          <span className="bg-primary-light text-primary-dark px-2 py-1 rounded text-xs font-montserrat">
            {doc.type}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
          <Button size="sm" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
              <TabsTrigger value="minutes" className="font-inter">Atas</TabsTrigger>
              <TabsTrigger value="financial" className="font-inter">Financeiro</TabsTrigger>
              <TabsTrigger value="bylaws" className="font-inter">Estatuto</TabsTrigger>
              <TabsTrigger value="febract" className="font-inter">FEBRACT</TabsTrigger>
              <TabsTrigger value="samaritano" className="font-inter">Samaritano</TabsTrigger>
            </TabsList>

            <TabsContent value="minutes" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-montserrat font-bold text-2xl text-primary-dark mb-2">
                  Atas de Reunião
                </h2>
                <p className="font-inter text-gray-600">
                  Documentos das reuniões da diretoria e assembleia geral
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.minutes.map((doc, index) => (
                  <DocumentCard key={index} doc={doc} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-montserrat font-bold text-2xl text-primary-dark mb-2">
                  Relatórios Financeiros
                </h2>
                <p className="font-inter text-gray-600">
                  Demonstrações financeiras e relatórios de auditoria
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.financial.map((doc, index) => (
                  <DocumentCard key={index} doc={doc} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bylaws" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-montserrat font-bold text-2xl text-primary-dark mb-2">
                  Estatuto Social
                </h2>
                <p className="font-inter text-gray-600">
                  Documentos constitutivos e regimento interno
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.bylaws.map((doc, index) => (
                  <DocumentCard key={index} doc={doc} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="febract" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-montserrat font-bold text-2xl text-primary-dark mb-2">
                  Relatórios FEBRACT
                </h2>
                <p className="font-inter text-gray-600">
                  Documentos e certificações da Federação Brasileira de Comunidades Terapêuticas
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.febract.map((doc, index) => (
                  <DocumentCard key={index} doc={doc} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="samaritano" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-montserrat font-bold text-2xl text-primary-dark mb-2">
                  Comunidade Terapêutica Samaritano
                </h2>
                <p className="font-inter text-gray-600">
                  Licenciamentos, certificações e relatórios de atividades
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.samaritano.map((doc, index) => (
                  <DocumentCard key={index} doc={doc} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Transparency;
