import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [auth, setAuth] = useState([]);
    const [sub, setSub] = useState(null);
    const [isAdminNav, setIsAdminNav] = useState(false);
    const [flag, setFlag] = useState(null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const savedAccessToken = Cookies.get('accessToken');
        const savedRefreshToken = Cookies.get('refreshToken');
        if (savedAccessToken && savedRefreshToken) {
            setAccessToken(savedAccessToken);
            setRefreshToken(savedRefreshToken);
            setIsLoggedIn(true);
            try {
                const decodedToken = jwtDecode(savedAccessToken);
                setAuth(decodedToken.auth);
                setSub(decodedToken.sub);
                setIsAdminNav(decodedToken.auth.includes('ADMIN'));
                setFlag(decodedToken.flag);
            } catch (error) {
                console.error('토큰 디코딩 오류:', error);
            }
        }
    }, []);

    const reissueToken = (aToken, grantType) => {
        const accessToken = grantType + aToken;
        setAccessToken(accessToken);
        Cookies.set('accessToken', accessToken, {secure: true, sameSite: 'strict'});

        try {
            const decodedToken = jwtDecode(accessToken);
            setAuth(decodedToken.auth);
            setSub(decodedToken.sub);
            setIsAdminNav(decodedToken.auth.includes('ADMIN'));
            setFlag(decodedToken.flag);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('토큰 디코딩 오류:', error);
        }
    }

    const saveToken = (newAccessToken, newRefreshToken, grantType) => {
        const accessToken = grantType + newAccessToken;
        const refreshToken = grantType + newRefreshToken;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        Cookies.set('accessToken', accessToken, {secure: true, sameSite: 'strict'});
        Cookies.set('refreshToken', refreshToken, {secure: true, sameSite: 'strict'});

        try {
            const decodedToken = jwtDecode(accessToken);
            setAuth(decodedToken.auth);
            setSub(decodedToken.sub);
            setIsAdminNav(decodedToken.auth.includes('ADMIN'));
            setFlag(decodedToken.flag);
        } catch (error) {
            console.error('토큰 디코딩 오류:', error);
        }
    };

    const clearToken = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setAuth([]);
        setFlag(null);
        setIsLoggedIn(false);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        navigate("/signin");
    };

    const signOut = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            clearToken();
        }
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                permissions: auth,
                sub,
                flag,
                reissueToken,
                saveToken,
                clearToken,
                signOut,
                isLoggedIn,
                setIsLoggedIn
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const refreshToken = (data, reissueToken) => {
    if (data.grantType) {
        reissueToken(data.accessToken, data.grantType);
        window.location.reload(true);
    }
}

export const clearCookie = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
}

export const urlList = () => {
    return {}
}
