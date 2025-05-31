
import { useNavigate } from "react-router-dom";

interface WorkshopBreadcrumbProps {
  workshopTitle: string;
}

const WorkshopBreadcrumb = ({ workshopTitle }: WorkshopBreadcrumbProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <button 
            onClick={() => navigate("/")}
            className="hover:text-blue-600"
          >
            Início
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate("/workshops")}
            className="hover:text-blue-600"
          >
            Workshops
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{workshopTitle}</span>
        </div>
      </div>
    </div>
  );
};

export default WorkshopBreadcrumb;
