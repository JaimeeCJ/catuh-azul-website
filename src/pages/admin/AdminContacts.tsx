
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "(17) 99999-1234",
      message: "Gostaria de mais informações sobre os workshops de informática.",
      date: "2024-01-20",
      status: "Novo",
      replied: false
    },
    {
      id: "2",
      name: "João Santos",
      email: "joao.santos@email.com",
      phone: "(17) 99999-5678",
      message: "Interesse em participar das atividades da comunidade terapêutica.",
      date: "2024-01-18",
      status: "Respondido",
      replied: true
    },
    {
      id: "3",
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "(17) 99999-9012",
      message: "Como posso fazer uma doação para a organização?",
      date: "2024-01-15",
      status: "Em andamento",
      replied: false
    }
  ]);

  const [filter, setFilter] = useState("todos");

  const filteredContacts = contacts.filter(contact => {
    if (filter === "todos") return true;
    if (filter === "novos") return contact.status === "Novo";
    if (filter === "respondidos") return contact.replied;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Novo":
        return "bg-blue-100 text-blue-800";
      case "Respondido":
        return "bg-green-100 text-green-800";
      case "Em andamento":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-montserrat font-bold text-primary-dark mb-2">
          Central de Mensagens
        </h1>
        <p className="text-gray-600 font-inter">
          Gerencie as mensagens de contato recebidas pelo site
        </p>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Buscar por nome ou email..." 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
              >
                <option value="todos">Todas as mensagens</option>
                <option value="novos">Novas</option>
                <option value="respondidos">Respondidas</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary-dark">{contacts.length}</div>
            <div className="text-sm text-gray-600">Total de Mensagens</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {contacts.filter(c => c.status === "Novo").length}
            </div>
            <div className="text-sm text-gray-600">Novas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {contacts.filter(c => c.replied).length}
            </div>
            <div className="text-sm text-gray-600">Respondidas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {contacts.filter(c => c.status === "Em andamento").length}
            </div>
            <div className="text-sm text-gray-600">Em Andamento</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Mensagens */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-montserrat text-lg">{contact.name}</CardTitle>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {contact.email}
                    </span>
                    <span className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {contact.phone}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {contact.date}
                    </span>
                  </div>
                </div>
                
                <Badge className={getStatusColor(contact.status)}>
                  {contact.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-700 mb-4">{contact.message}</p>
              
              <div className="flex space-x-2">
                <Button size="sm">
                  <Mail className="h-4 w-4 mr-1" />
                  Responder
                </Button>
                <Button size="sm" variant="outline">
                  Marcar como Respondida
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminContacts;
