
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Category {
  id: number;
  nome: string;
  descricao: string | null;
  created_at: string;
  updated_at: string;
}

const AdminCategories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: ""
  });

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/categorias-documentos");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as categorias.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome.trim()) {
      toast({
        title: "Erro",
        description: "O nome da categoria é obrigatório.",
        variant: "destructive",
      });
      return;
    }

    try {
      const url = isEditing 
        ? `http://localhost:8000/api/categorias-documentos/${editingCategory?.id}`
        : "http://localhost:8000/api/categorias-documentos";
      
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedCategory = await response.json();
        
        if (isEditing) {
          setCategories(categories.map(cat => 
            cat.id === editingCategory?.id ? savedCategory : cat
          ));
          toast({
            title: "Categoria atualizada",
            description: "A categoria foi atualizada com sucesso.",
          });
        } else {
          setCategories([...categories, savedCategory]);
          toast({
            title: "Categoria criada",
            description: "A categoria foi criada com sucesso.",
          });
        }
        
        setFormData({ nome: "", descricao: "" });
        setIsEditing(false);
        setEditingCategory(null);
      }
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a categoria.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (category: Category) => {
    setFormData({
      nome: category.nome,
      descricao: category.descricao || ""
    });
    setEditingCategory(category);
    setIsEditing(true);
  };

  const handleDelete = async (categoryId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/categorias-documentos/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories(categories.filter(cat => cat.id !== categoryId));
        toast({
          title: "Categoria excluída",
          description: "A categoria foi removida com sucesso.",
        });
      }
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a categoria.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setFormData({ nome: "", descricao: "" });
    setIsEditing(false);
    setEditingCategory(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-light border-t-primary-dark rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando categorias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-montserrat font-bold text-primary-dark mb-2">
          Gerenciar Categorias
        </h1>
        <p className="text-gray-600 font-inter">
          Gerencie as categorias de documentos disponíveis
        </p>
      </div>

      {/* Formulário de Categoria */}
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">
            {isEditing ? "Editar Categoria" : "Nova Categoria"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Categoria *
                </label>
                <Input 
                  placeholder="Ex: Atas de Reunião"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <Textarea 
                  placeholder="Descrição da categoria (opcional)"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1 sm:flex-none">
                <Plus className="h-4 w-4 mr-2" />
                {isEditing ? "Atualizar" : "Criar"} Categoria
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Categorias */}
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Categorias Existentes</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhuma categoria encontrada</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">Descrição</TableHead>
                    <TableHead className="hidden sm:table-cell">Criado em</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.nome}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {category.descricao || "-"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {formatDate(category.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(category.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;
