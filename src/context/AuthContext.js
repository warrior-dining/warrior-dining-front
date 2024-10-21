import React, {createContext, useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // const [token, setToken] = useState(null); // access, refresh 로 변경
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [auth, setAuth] = useState([]);
    const [sub, setSub] = useState(null);
    const [isAdminNav, setIsAdminNav] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    // 컴포넌트가 마운트 될 때 쿠키에서 토큰 읽기
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
            } catch (error) {
                console.error('토큰 디코딩 오류:', error);
            }
        }
    }, []);

    // 토큰 재발급 함수
    const reissueToken = (aToken, grantType) => {
        const accessToken = grantType + aToken;
        setAccessToken(accessToken);
        Cookies.set('accessToken', accessToken, {secure: true, sameSite: 'strict'});

        // 디코딩하여 사용자 권한 및 ID 상태 업데이트
        try {
            const decodedToken = jwtDecode(accessToken);
            setAuth(decodedToken.auth);
            setSub(decodedToken.sub);
            setIsAdminNav(decodedToken.auth.includes('ADMIN'));
        } catch (error) {
            console.error('토큰 디코딩 오류:', error);
        }
    }

    // 토큰 저장 함수
    const saveToken = (newAccessToken, newRefreshToken, grantType) => {
        const accessToken = grantType + newAccessToken;
        const refreshToken = grantType + newRefreshToken;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        // const newToken = {accessToken, refreshToken}
        // setTokens(newToken);
        Cookies.set('accessToken', accessToken, {secure: true, sameSite: 'strict'});
        Cookies.set('refreshToken', refreshToken, {secure: true, sameSite: 'strict'});

        // 디코딩하여 사용자 권한 및 ID 상태 업데이트
        try {
            const decodedToken = jwtDecode(accessToken);
            setAuth(decodedToken.auth);
            setSub(decodedToken.sub);
            setIsAdminNav(decodedToken.auth.includes('ADMIN'));
            setIsLoggedIn(true);
        } catch (error) {
            console.error('토큰 디코딩 오류:', error);
        }
    };

    // 토큰을 제거하는 함수
    const clearToken = () => {
        setAccessToken(null);
        setRefreshToken(null);
        // setTokens({});
        setAuth([]);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setIsLoggedIn(false);
        navigate("/signin");
    };

    // 로그아웃
    const signOut = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            clearToken();
        }
    };

    return (
        <AuthContext.Provider
            value={{accessToken, refreshToken, permissions: auth, sub, reissueToken, saveToken, clearToken, signOut, isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};

// AuthContext 사용을 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);

// 리프레시 토큰 로직
export const refreshToken = (data, reissueToken) => {
    if (data.grantType) {  // 토큰 다시 발급을 받으면 자기 자신를 다시 호출
        reissueToken(data.accessToken, data.grantType);
        window.location.reload(true);
    }
}

export const clearCookie = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
}

export const urlList = (method, path) => {
    const host = 'http://localhost:8080';
    return {
        url: path,
        method: method,
        baseURL: host,
        headers: {Authorization_Access: Cookies.get('accessToken'), Authorization_Refresh: Cookies.get('refreshToken')}
    }
}
