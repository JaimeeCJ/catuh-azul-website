
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Transparency from "./pages/Transparency";
import Workshops from "./pages/Workshops";
import WorkshopDetail from "./pages/WorkshopDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPages from "./pages/admin/AdminPages";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminWorkshops from "./pages/admin/AdminWorkshops";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminEditWorkshop from "./pages/admin/AdminEditWorkShop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="transparency" element={<Transparency />} />
            <Route path="workshops" element={<Workshops />} />
            <Route path="workshops/:id" element={<WorkshopDetail />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="documents" element={<AdminDocuments />} />
            <Route path="workshops" element={<AdminWorkshops />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="/admin/workshops/edit/:id" element={<AdminEditWorkshop />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
