import apiClient from './client';

interface LoginCredentials {
    Login?: string;
    Senha?: string;
}

interface SignupData extends LoginCredentials {
    Nome: string;
    Email: string;
    CPF: string;
    Celular: string;
    Password: string;
}

interface AuthResponse {
    token: string;
    user: any;
}

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userData', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        console.error('Erro no login:', error);
        throw error;
    }
};

export const signupUser = async (data: SignupData): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/user', data);
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userData', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        console.error('Erro no cadastro:', error);
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
};

export const getCurrentUser = () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
        try {
            return JSON.parse(userData);
        } catch (e) {
            console.error("Erro ao parsear dados do usuário:", e);
            return null;
        }
    }
    return null;
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('authToken');
};