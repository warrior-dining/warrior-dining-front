import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [auth, setAuth] = useState([]);
    const [sub, setSub] = useState(null);
    const [isAdminNav, setIsAdminNav] = useState(false);

    useEffect(() => {
        // 쿠키에서 토큰 읽기
        const savedToken = Cookies.get('accessToken');
        if (savedToken) {
            saveToken(savedToken);
        }
    }, []);

    const saveToken = (token) => {
        setToken(token);
        Cookies.set('accessToken', token, { secure: true, sameSite: 'strict' });
        try {
            const decodedToken = jwtDecode(token);
            setAuth(decodedToken.auth);
            setSub(decodedToken.sub);
            setIsAdminNav(decodedToken.auth.includes('ADMIN'));
        } catch (error) {
            console.error('토큰 디코딩 오류:', error);
        }
    };

    const clearToken = () => {
        setToken(null);
        setAuth([]);
        Cookies.remove('accessToken');
    };

    const signOut = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            clearToken();
        }
    };

    return (
        <AuthContext.Provider value={{ token, permissions: auth, saveToken, clearToken, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
