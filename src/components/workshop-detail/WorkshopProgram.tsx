
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkshopProgramProps {
  cronograma: string;
}

const WorkshopProgram = ({ cronograma }: WorkshopProgramProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-montserrat">Programa do Curso</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-inter text-gray-700 whitespace-pre-wrap">
          {cronograma}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopProgram;
