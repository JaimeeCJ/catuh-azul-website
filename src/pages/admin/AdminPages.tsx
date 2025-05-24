
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminPages = () => {
  const { toast } = useToast();
  const [editingPage, setEditingPage] = useState<string | null>(null);
  
  const [pages, setPages] = useState([
    {
      id: "home",
      title: "Página Inicial",
      content: "Conteúdo da página inicial da CATUH...",
      lastModified: "2024-01-15"
    },
    {
      id: "about",
      title: "Sobre",
      content: "Missão, visão e valores da CATUH...",
      lastModified: "2024-01-10"
    },
    {
      id: "transparency",
      title: "Transparência",
      content: "Informações sobre transparência da organização...",
      lastModified: "2024-01-08"
    }
  ]);

  const handleEdit = (pageId: string) => {
    setEditingPage(pageId);
  };

  const handleSave = (pageId: string) => {
    setEditingPage(null);
    toast({
      title: "Página atualizada",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const handleCancel = () => {
    setEditingPage(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-montserrat font-bold text-primary-dark mb-2">
          Gerenciar Páginas
        </h1>
        <p className="text-gray-600 font-inter">
          Edite o conteúdo das páginas do site
        </p>
      </div>

      <div className="space-y-4">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-montserrat">{page.title}</CardTitle>
                <div className="flex space-x-2">
                  {editingPage === page.id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleSave(page.id)}
                        className="flex items-center space-x-1"
                      >
                        <Save className="h-4 w-4" />
                        <span>Salvar</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                        className="flex items-center space-x-1"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancelar</span>
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(page.id)}
                      className="flex items-center space-x-1"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Editar</span>
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Última modificação: {page.lastModified}
              </p>
            </CardHeader>
            
            <CardContent>
              {editingPage === page.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título da Página
                    </label>
                    <Input defaultValue={page.title} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Conteúdo
                    </label>
                    <Textarea
                      defaultValue={page.content}
                      rows={10}
                      className="min-h-[200px]"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 whitespace-pre-line">
                    {page.content}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPages;
