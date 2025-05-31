
import { Card, CardContent } from "@/components/ui/card";

interface WorkshopImageProps {
  imagePath: string | null;
  title: string;
  getImageUrl: (imagePath: string) => string;
}

const WorkshopImage = ({ imagePath, title, getImageUrl }: WorkshopImageProps) => {
  if (!imagePath) return null;

  return (
    <Card>
      <CardContent className="p-0">
        <img 
          src={getImageUrl(imagePath)} 
          alt={title}
          className="w-full h-64 md:h-80 object-cover rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </CardContent>
    </Card>
  );
};

export default WorkshopImage;
