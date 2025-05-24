
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve. Obrigado!",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-light to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6">
            Entre em Contato
          </h1>
          <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto">
            Estamos aqui para ajudar. Entre em contato conosco para mais informações sobre nossos programas e serviços.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat text-2xl">Envie uma Mensagem</CardTitle>
                  <CardDescription className="font-inter">
                    Preencha o formulário abaixo e entraremos em contato em breve.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block font-inter font-medium mb-2">
                        Nome Completo *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-inter font-medium mb-2">
                        E-mail *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block font-inter font-medium mb-2">
                        Telefone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(17) 99999-9999"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-inter font-medium mb-2">
                        Mensagem *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Como podemos ajudá-lo?"
                        rows={5}
                      />
                    </div>

                    <Button type="submit" className="w-full font-montserrat font-semibold">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat text-xl flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary-dark" />
                    Endereço
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-gray-700">
                    Rua das Flores, 123<br />
                    Centro - Barretos/SP<br />
                    CEP: 14780-000
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat text-xl flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-primary-dark" />
                    Telefone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-gray-700">
                    (17) 3322-1234<br />
                    (17) 99999-8888
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat text-xl flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary-dark" />
                    E-mail
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-gray-700">
                    contato@catuh.org.br<br />
                    secretaria@catuh.org.br
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat text-xl flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary-dark" />
                    Horário de Funcionamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-inter text-gray-700 space-y-1">
                    <p>Segunda a Sexta: 8h às 17h</p>
                    <p>Sábado: 8h às 12h</p>
                    <p>Domingo: Fechado</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat text-2xl text-center">Nossa Localização</CardTitle>
                <CardDescription className="font-inter text-center">
                  Visite-nos em nossa sede em Barretos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-primary-light/20 to-primary-dark/20 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary-dark mx-auto mb-4" />
                    <p className="font-montserrat font-semibold text-primary-dark text-lg">
                      Mapa do Google
                    </p>
                    <p className="font-inter text-gray-600">
                      Integração com Google Maps será implementada aqui
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
