import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../api/axios';
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    let isLoggedIn = Cookies.get('isLoggedIn');
    const [statusLogin, setStatusLogin] = useState(() => {
        if (isLoggedIn) {
            return isLoggedIn;
        }
        return false;
    });
    const navigate = useNavigate();

    const login = async (data) => {
        try {
            const response = await client.post('/auth/login', data, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.data.status === true) {
                setStatusLogin(true);
                const { access_token, refresh_token } = response.data.data;
                localStorage.setItem('token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        const response = await client.get('/auth/logout');
        if (response.data.status === true) {
            setStatusLogin(false);
        }

        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ statusLogin, setStatusLogin, login, logout }}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
