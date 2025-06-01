
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WorkshopForm } from "@/hooks/useWorkshopData";

interface WorkshopDetailsProps {
  form: WorkshopForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function WorkshopDetails({ form, onChange }: WorkshopDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do Workshop</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="DuracaoHorasNr">Duração (horas)</Label>
            <Input
              id="DuracaoHorasNr"
              name="DuracaoHorasNr"
              type="number"
              value={form.DuracaoHorasNr}
              onChange={onChange}
              placeholder="40"
            />
          </div>
          <div>
            <Label htmlFor="NumeroVagasNr">Número de Vagas</Label>
            <Input
              id="NumeroVagasNr"
              name="NumeroVagasNr"
              type="number"
              value={form.NumeroVagasNr}
              onChange={onChange}
              placeholder="15"
            />
          </div>
          <div>
            <Label htmlFor="LocalRealizacaoTx">Local</Label>
            <Input
              id="LocalRealizacaoTx"
              name="LocalRealizacaoTx"
              value={form.LocalRealizacaoTx}
              onChange={onChange}
              placeholder="CATUH - Barretos/SP"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="DataInicioDt">Data de Início</Label>
            <Input
              id="DataInicioDt"
              name="DataInicioDt"
              type="date"
              value={form.DataInicioDt}
              onChange={onChange}
            />
          </div>
          <div>
            <Label htmlFor="DataFimDt">Data de Término</Label>
            <Input
              id="DataFimDt"
              name="DataFimDt"
              type="date"
              value={form.DataFimDt}
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="PreRequisitosDs">Pré-requisitos</Label>
          <Textarea
            id="PreRequisitosDs"
            name="PreRequisitosDs"
            rows={3}
            value={form.PreRequisitosDs}
            onChange={onChange}
            placeholder="Descreva os pré-requisitos necessários..."
          />
        </div>
      </CardContent>
    </Card>
  );
}
