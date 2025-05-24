
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminMedia = () => {
  const { toast } = useToast();
  const [mediaFiles, setMediaFiles] = useState([
    {
      id: "1",
      name: "logo-catuh-principal.png",
      type: "image",
      size: "245 KB",
      uploadDate: "2024-01-15",
      url: "/placeholder.svg"
    },
    {
      id: "2",
      name: "fachada-catuh.jpg",
      type: "image",
      size: "1.2 MB",
      uploadDate: "2024-01-10",
      url: "/placeholder.svg"
    },
    {
      id: "3",
      name: "workshop-informatica.jpg",
      type: "image",
      size: "890 KB",
      uploadDate: "2024-01-08",
      url: "/placeholder.svg"
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        toast({
          title: "Arquivo carregado",
          description: `${file.name} foi carregado com sucesso.`,
        });
      });
    }
  };

  const handleDelete = (fileId: string) => {
    setMediaFiles(mediaFiles.filter(file => file.id !== fileId));
    toast({
      title: "Arquivo excluído",
      description: "O arquivo foi removido com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-montserrat font-bold text-primary-dark mb-2">
          Galeria de Mídia
        </h1>
        <p className="text-gray-600 font-inter">
          Gerencie imagens, logos e outros arquivos de mídia
        </p>
      </div>

      {/* Upload de Arquivos */}
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Upload de Arquivos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-light transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Clique para selecionar ou arraste os arquivos aqui</p>
            <p className="text-sm text-gray-400">PNG, JPG, SVG até 5MB cada</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="media-upload"
            />
            <label
              htmlFor="media-upload"
              className="inline-block mt-4 px-4 py-2 bg-primary-dark text-white rounded cursor-pointer hover:bg-primary-dark/90 transition-colors"
            >
              Selecionar Arquivos
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary-dark">{mediaFiles.length}</div>
            <div className="text-sm text-gray-600">Total de Arquivos</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {(mediaFiles.reduce((acc, file) => {
                const sizeInKB = parseFloat(file.size.replace(/[^\d.]/g, ''));
                return acc + (file.size.includes('MB') ? sizeInKB * 1024 : sizeInKB);
              }, 0) / 1024).toFixed(1)} MB
            </div>
            <div className="text-sm text-gray-600">Espaço Utilizado</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {mediaFiles.filter(f => f.type === 'image').length}
            </div>
            <div className="text-sm text-gray-600">Imagens</div>
          </CardContent>
        </Card>
      </div>

      {/* Galeria de Arquivos */}
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Arquivos Existentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mediaFiles.map((file) => (
              <div key={file.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {file.type === 'image' ? (
                    <img 
                      src={file.url} 
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 truncate mb-1">
                    {file.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {file.size} • {file.uploadDate}
                  </p>
                  
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(file.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMedia;
