
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

interface WorkshopInfoProps {
  dataInicio: string | null;
  dataFim: string | null;
  duracaoHoras: number | null;
  numeroVagas: number | null;
  localRealizacao: string | null;
}

const WorkshopInfo = ({ 
  dataInicio, 
  dataFim, 
  duracaoHoras, 
  numeroVagas, 
  localRealizacao 
}: WorkshopInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-montserrat">Informações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-blue-600" />
          <div>
            <p className="font-medium">Data de Início</p>
            <p className="text-sm text-gray-600">
              {dataInicio ? 
                new Date(dataInicio).toLocaleDateString('pt-BR') : 
                "A definir"
              }
            </p>
          </div>
        </div>
        
        {dataFim && (
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Data de Término</p>
              <p className="text-sm text-gray-600">
                {new Date(dataFim).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-3">
          <Clock className="h-5 w-5 text-blue-600" />
          <div>
            <p className="font-medium">Duração</p>
            <p className="text-sm text-gray-600">
              {duracaoHoras || 40} horas
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Users className="h-5 w-5 text-blue-600" />
          <div>
            <p className="font-medium">Vagas</p>
            <p className="text-sm text-gray-600">
              {numeroVagas || 15} participantes
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-blue-600" />
          <div>
            <p className="font-medium">Local</p>
            <p className="text-sm text-gray-600">
              {localRealizacao || "CATUH - Barretos/SP"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopInfo;
