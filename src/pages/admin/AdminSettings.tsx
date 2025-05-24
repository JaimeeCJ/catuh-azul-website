
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: "CATUH - Casa Assistencial Trabalhadores da Última Hora",
    siteDescription: "Organização sem fins lucrativos em Barretos",
    contactEmail: "contato@catuh.org.br",
    contactPhone: "(17) 3321-0000",
    address: "Rua das Flores, 123 - Centro, Barretos - SP",
    maintenanceMode: false,
    allowRegistrations: true,
    emailNotifications: true
  });

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações foram atualizadas com sucesso.",
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-montserrat font-bold text-primary-dark mb-2">
          Configurações
        </h1>
        <p className="text-gray-600 font-inter">
          Configure as informações gerais do site
        </p>
      </div>

      {/* Informações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Informações Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Site
            </label>
            <Input
              value={settings.siteName}
              onChange={(e) => handleInputChange('siteName', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição do Site
            </label>
            <Textarea
              value={settings.siteDescription}
              onChange={(e) => handleInputChange('siteDescription', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Informações de Contato */}
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Informações de Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email de Contato
              </label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone de Contato
              </label>
              <Input
                value={settings.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço
            </label>
            <Textarea
              value={settings.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Configurações do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Configurações do Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Modo de Manutenção</h3>
              <p className="text-sm text-gray-500">
                Ativar para exibir página de manutenção para visitantes
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Permitir Inscrições</h3>
              <p className="text-sm text-gray-500">
                Permitir que visitantes se inscrevam em workshops
              </p>
            </div>
            <Switch
              checked={settings.allowRegistrations}
              onCheckedChange={(checked) => handleInputChange('allowRegistrations', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Notificações por Email</h3>
              <p className="text-sm text-gray-500">
                Receber emails quando novas mensagens forem enviadas
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Salvar Configurações</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
