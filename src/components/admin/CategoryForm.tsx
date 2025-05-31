
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface Category {
  id: number;
  nome: string;
  descricao: string | null;
  created_at: string;
  updated_at: string;
}

interface CategoryFormProps {
  isEditing: boolean;
  editingCategory: Category | null;
  onSubmit: (formData: { nome: string; descricao: string }) => Promise<void>;
  onCancel: () => void;
}

const CategoryForm = ({ isEditing, editingCategory, onSubmit, onCancel }: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    nome: editingCategory?.nome || "",
    descricao: editingCategory?.descricao || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ nome: "", descricao: "" });
  };

  return (
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
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
