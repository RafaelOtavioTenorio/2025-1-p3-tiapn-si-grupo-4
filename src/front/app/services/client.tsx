import axios from "axios"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? process.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Logs para debug
console.log('Configuração do cliente API:');
console.log('Base URL:', import.meta.env.VITE_BASE_URL);
console.log('Headers padrão:', apiClient.defaults.headers);

apiClient.interceptors.request.use(
  (config) => {
    console.log('Requisição sendo enviada:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Erro no interceptor de requisição:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Não autorizado! Redirecionando para login...');
      localStorage.removeItem('authToken'); 
      // window.location.href = '/login'; // Descomente para redirecionar
    }
    return Promise.reject(error);
  }
);

export default apiClient;