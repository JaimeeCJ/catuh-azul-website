
const API_BASE_URL = "http://localhost:8000/api";

export const getAuthToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('admin_token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('admin_token');
};

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  isFormData?: boolean;
}

export const apiRequest = async (
  endpoint: string, 
  options: ApiRequestOptions = {}
): Promise<Response> => {
  const { method = 'GET', body, headers = {}, isFormData = false } = options;
  const token = getAuthToken();
  
  // Configurar headers
  const requestHeaders: Record<string, string> = {
    ...headers,
  };

  // Adicionar token se disponível
  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Adicionar Content-Type se não for FormData
  if (!isFormData && body) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };

  // Adicionar body se fornecido
  if (body) {
    if (isFormData) {
      requestOptions.body = body;
    } else {
      requestOptions.body = JSON.stringify(body);
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

  // Se não autorizado, limpar token e redirecionar
  if (response.status === 401 || response.status === 403) {
    removeAuthToken();
    if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
      window.location.href = '/admin/login';
    }
  }

  return response;
};
