import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [auth, setAuth] = useState([]);
    const [isAdminNav, setIsAdminNav] = useState(false);

    const saveToken = (token) => {
        setToken(token);
        try {
            const decodedToken = jwtDecode(token);
            console.log('디코딩된 토큰:', decodedToken);
            setAuth(decodedToken.auth);
            setIsAdminNav(decodedToken.auth.includes('ADMIN'));
            console.log('저장된 권한:', decodedToken.auth);
        } catch (error) {
            console.error('토큰 디코딩 오류:', error);
        }
    };

    const clearToken = () => {
        setToken(null);
        setAuth([]);
    };

    return (
        <AuthContext.Provider value={{ token, permissions: auth, saveToken, clearToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
