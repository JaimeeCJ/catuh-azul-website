
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WorkshopForm } from "@/hooks/useWorkshopData";

interface WorkshopBasicInfoProps {
  form: WorkshopForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function WorkshopBasicInfo({ form, onChange }: WorkshopBasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Básicas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="TituloTx">Título do Workshop</Label>
            <Input
              id="TituloTx"
              name="TituloTx"
              value={form.TituloTx}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="DtPublicacaoDt">Data de Publicação</Label>
            <Input
              id="DtPublicacaoDt"
              name="DtPublicacaoDt"
              type="date"
              value={form.DtPublicacaoDt}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="DescricaoDs">Descrição Resumida</Label>
          <Textarea
            id="DescricaoDs"
            name="DescricaoDs"
            rows={3}
            value={form.DescricaoDs}
            onChange={onChange}
            placeholder="Descrição curta para listagem..."
            required
          />
        </div>

        <div>
          <Label htmlFor="DescricaoDetalhadaDs">Descrição Detalhada</Label>
          <Textarea
            id="DescricaoDetalhadaDs"
            name="DescricaoDetalhadaDs"
            rows={6}
            value={form.DescricaoDetalhadaDs}
            onChange={onChange}
            placeholder="Descrição completa do workshop, objetivos, metodologia..."
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="StatusAtivoFl"
            name="StatusAtivoFl"
            checked={form.StatusAtivoFl}
            onChange={onChange}
            className="rounded"
          />
          <Label htmlFor="StatusAtivoFl">Workshop ativo (visível no site)</Label>
        </div>
      </CardContent>
    </Card>
  );
}
