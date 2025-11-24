import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            if (token) {
                try {
                    // If there is a /me endpoint, we should use it. 
                    // For now, we'll assume the token is valid if it exists, 
                    // but ideally we should verify it.
                    // Let's try to hit a protected endpoint or just set loading false.
                    // Since we don't have a confirmed /me endpoint, we will just set the user 
                    // to a non-null value so the app knows we are logged in.
                    // In a real app, we'd decode the JWT to get user info.
                    setUser({ email: 'user@example.com' }); // Placeholder until we have user info from token/api
                } catch (error) {
                    console.error('Auth verification failed', error);
                    logout();
                }
            }
            setLoading(false);
        };

        verifyUser();
    }, [token]);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        setToken(token);
        // If the API returns the user object, use it. Otherwise, we might need to fetch it.
        // For now assuming the API returns it as per common patterns, or we construct a basic one.
        // Based on user input, we only saw request structure. 
        // If response structure isn't known, we'll assume it returns { token, user? } or similar.
        // If user is missing, we might decode token or just store email.
        setUser(user || { email });
        return response.data;
    };

    const register = async (name, email, password) => {
        // User specified role: "USER" in the request example
        const response = await api.post('/auth/register', {
            email,
            password,
            role: 'USER',
            // Including name if the backend accepts it, otherwise it might be ignored
            name
        });
        // Assuming register returns the same as login or just success
        // If it returns token, we can auto-login
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            setUser(response.data.user || { email, name });
        }
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
