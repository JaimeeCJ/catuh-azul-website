
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WorkshopCTAProps {
  workshopTitle: string;
}

const WorkshopCTA = ({ workshopTitle }: WorkshopCTAProps) => {
  const navigate = useNavigate();

  const handleInscricao = () => {
    navigate("/contact", { state: { workshopTitle } });
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="font-montserrat text-blue-900">
          Interessado?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-blue-800">
          Inscreva-se agora ou entre em contato para mais informações.
        </p>
        <div className="space-y-2">
          <Button 
            onClick={handleInscricao}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Inscrever-se
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/contact")}
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Mais Informações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopCTA;
