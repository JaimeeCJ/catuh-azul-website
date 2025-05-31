
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkshopRequirementsProps {
  preRequisitos: string;
}

const WorkshopRequirements = ({ preRequisitos }: WorkshopRequirementsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-montserrat">Pré-requisitos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 whitespace-pre-wrap">
          {preRequisitos}
        </p>
      </CardContent>
    </Card>
  );
};

export default WorkshopRequirements;
