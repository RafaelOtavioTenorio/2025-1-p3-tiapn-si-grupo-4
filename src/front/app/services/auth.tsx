import apiClient from './client';

interface LoginCredentials {
    login?: string;
    senha?: string;
}

interface SignupData extends LoginCredentials {
    nome: string;
    email: string;
    cpf: string;
    celular: string;
    password: string;
}

interface SignupResponse {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    celular: string;
    nivelAcesso: number;
    ativo: boolean;
}


interface AuthResponse {
    token: string;
    user: any;
}

export const  loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            return response.data;
        }
        throw new Error('no token');
    } catch (error) {
        console.error('Erro no login:', error);
        throw error;
    }
};

export const signupUser = async (data: SignupData): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<SignupResponse>('/user', data);
        if(!response.data.id){
            throw new Error('Erro ao cadastrar usuário: ID não retornado');
        }

        const responseLogin = await apiClient.post<AuthResponse>('/auth/login', {
            login: data.email,
            senha: data.password
        });

        if (responseLogin.data.token) {
            localStorage.setItem('authToken', responseLogin.data.token);
            localStorage.setItem('userData', JSON.stringify(responseLogin.data.user));
        }
        return responseLogin.data;
    } catch (error) {
        console.error('Erro no cadastro:', error);
        throw console.error('Erro no cadastro:', error);;
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