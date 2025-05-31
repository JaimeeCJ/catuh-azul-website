
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkshopDescriptionProps {
  description: string;
  detailedDescription?: string;
}

const WorkshopDescription = ({ description, detailedDescription }: WorkshopDescriptionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-montserrat">Sobre o Workshop</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-inter text-gray-700 leading-relaxed whitespace-pre-wrap">
          {detailedDescription || description}
        </p>
      </CardContent>
    </Card>
  );
};

export default WorkshopDescription;
