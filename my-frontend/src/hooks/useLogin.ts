import { useState, useCallback } from 'react';
import { apiClient } from '../utils/apiClient';
import { User } from '../types/userTypes';

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    user: User;
    token: string;
}

const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async (credentials: LoginCredentials): Promise<LoginResponse> => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiClient('https://be-m76b.onrender.com/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
            });
            return data;
        } catch (err: unknown) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { login, loading, error };
};

export default useLogin;
