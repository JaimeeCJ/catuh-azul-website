
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FolderOpen, GraduationCap, Mail, Users, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Páginas Publicadas", value: "5", icon: FileText, color: "bg-blue-500" },
    { title: "Documentos", value: "12", icon: FolderOpen, color: "bg-green-500" },
    { title: "Workshops Ativos", value: "8", icon: GraduationCap, color: "bg-purple-500" },
    { title: "Mensagens Recebidas", value: "24", icon: Mail, color: "bg-orange-500" },
    { title: "Visitantes (Mês)", value: "1,247", icon: Users, color: "bg-pink-500" },
    { title: "Taxa de Conversão", value: "12.3%", icon: TrendingUp, color: "bg-indigo-500" },
  ];

  const recentActivities = [
    { action: "Nova mensagem de contato recebida", time: "Há 2 horas", type: "message" },
    { action: "Documento de transparência atualizado", time: "Há 1 dia", type: "document" },
    { action: "Workshop 'Informática Básica' criado", time: "Há 2 dias", type: "workshop" },
    { action: "Página 'Sobre' foi editada", time: "Há 3 dias", type: "page" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-montserrat font-bold text-primary-dark mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 font-inter">
          Visão geral do site da CATUH
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-2 rounded-lg mr-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b last:border-b-0">
                  <div className="w-2 h-2 bg-primary-light rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Links Rápidos */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/admin/workshops"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <GraduationCap className="h-8 w-8 text-primary-dark mx-auto mb-2" />
                <p className="text-sm font-medium">Adicionar Workshop</p>
              </a>
              
              <a
                href="/admin/documents"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <FolderOpen className="h-8 w-8 text-primary-dark mx-auto mb-2" />
                <p className="text-sm font-medium">Upload Documento</p>
              </a>
              
              <a
                href="/admin/contacts"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <Mail className="h-8 w-8 text-primary-dark mx-auto mb-2" />
                <p className="text-sm font-medium">Ver Mensagens</p>
              </a>
              
              <a
                href="/admin/media"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <FileText className="h-8 w-8 text-primary-dark mx-auto mb-2" />
                <p className="text-sm font-medium">Gerenciar Mídia</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
