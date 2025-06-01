
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WorkshopForm } from "@/hooks/useWorkshopData";

interface WorkshopScheduleProps {
  form: WorkshopForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function WorkshopSchedule({ form, onChange }: WorkshopScheduleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Programa do Curso</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="CronogramaDs">Cronograma/Programa</Label>
          <Textarea
            id="CronogramaDs"
            name="CronogramaDs"
            rows={8}
            value={form.CronogramaDs}
            onChange={onChange}
            placeholder="Descreva o cronograma do curso, módulos, tópicos abordados..."
          />
          <p className="text-sm text-gray-500 mt-2">
            Dica: Use linhas separadas para cada módulo ou tópico
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
