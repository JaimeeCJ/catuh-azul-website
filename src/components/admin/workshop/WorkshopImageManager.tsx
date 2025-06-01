
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";

interface WorkshopImageManagerProps {
  imagemAtual: string;
  galeriaAtual: any[];
  onImagemFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGaleriaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoverImagemPrincipal: () => void;
  onRemoverImagemGaleria: (imagem: any) => void;
  getImageUrl: (imagePath: string) => string;
}

export default function WorkshopImageManager({
  imagemAtual,
  galeriaAtual,
  onImagemFileChange,
  onGaleriaChange,
  onRemoverImagemPrincipal,
  onRemoverImagemGaleria,
  getImageUrl
}: WorkshopImageManagerProps) {
  return (
    <div className="space-y-6">
      {/* Imagem Principal Atual */}
      <Card>
        <CardHeader>
          <CardTitle>Imagem Principal Atual</CardTitle>
        </CardHeader>
        <CardContent>
          {imagemAtual ? (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img
                  src={getImageUrl(imagemAtual)}
                  alt="Imagem principal atual"
                  className="w-full max-w-md h-48 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={onRemoverImagemPrincipal}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Para alterar, selecione uma nova imagem abaixo
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma imagem principal definida</p>
          )}
        </CardContent>
      </Card>

      {/* Upload Nova Imagem Principal */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Upload className="h-5 w-5 inline mr-2" />
            {imagemAtual ? "Alterar Imagem Principal" : "Nova Imagem Principal"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            id="ImagemBlob"
            name="ImagemBlob"
            type="file"
            accept="image/*"
            onChange={onImagemFileChange}
          />
          <p className="text-sm text-gray-500 mt-1">
            Imagem que aparecerá como destaque do workshop
          </p>
        </CardContent>
      </Card>

      {/* Galeria Atual */}
      <Card>
        <CardHeader>
          <CardTitle>Galeria de Fotos Atual ({galeriaAtual.length} imagens)</CardTitle>
        </CardHeader>
        <CardContent>
          {galeriaAtual.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galeriaAtual.map((imagem, index) => (
                <div key={imagem.id || imagem.IdGaleria || index} className="relative">
                  <img
                    src={getImageUrl(imagem.ImagemBlob || imagem.url)}
                    alt={`Galeria ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1"
                    onClick={() => onRemoverImagemGaleria(imagem)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma imagem na galeria</p>
          )}
        </CardContent>
      </Card>

      {/* Upload Novas Imagens da Galeria */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Upload className="h-5 w-5 inline mr-2" />
            Adicionar à Galeria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            id="GaleriaImagens"
            name="GaleriaImagens"
            type="file"
            accept="image/*"
            multiple
            onChange={onGaleriaChange}
          />
          <p className="text-sm text-gray-500 mt-1">
            Selecione múltiplas imagens para adicionar à galeria
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
