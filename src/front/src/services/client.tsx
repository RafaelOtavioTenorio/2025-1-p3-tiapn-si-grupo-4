import axios from "axios"


const apiClient = axios.create({
  baseURL:  import.meta.env.BASE_URL, // Ex: 'http://localhost:3000/api'
  headers: {
    'Content-Type': 'application/json',
  },
});



apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Ou de onde você armazena o token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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