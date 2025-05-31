
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import CategoryForm from "@/components/admin/CategoryForm";
import CategoryTable from "@/components/admin/CategoryTable";

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

  const handleFormSubmit = async (formData: { nome: string; descricao: string }) => {
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
    setIsEditing(false);
    setEditingCategory(null);
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

      <CategoryForm
        isEditing={isEditing}
        editingCategory={editingCategory}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminCategories;
