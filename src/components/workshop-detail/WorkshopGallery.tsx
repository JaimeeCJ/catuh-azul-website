
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GalleryItem {
  GaleriaId: number;
  ImagemBlob: string;
}

interface WorkshopGalleryProps {
  galeria: GalleryItem[];
  getImageUrl: (imagePath: string) => string;
}

const WorkshopGallery = ({ galeria, getImageUrl }: WorkshopGalleryProps) => {
  if (!galeria || galeria.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-montserrat">Galeria de Fotos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {galeria.map((foto, index) => (
            <img
              key={foto.GaleriaId || index}
              src={getImageUrl(foto.ImagemBlob)}
              alt={`Foto ${index + 1} do workshop`}
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopGallery;
