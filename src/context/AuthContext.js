import React, {createContext, useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    // const [token, setToken] = useState(null); // access, refresh 로 변경
    const [auth, setAuth] = useState([]);
    const [sub, setSub] = useState(null);
    const [isAdminNav, setIsAdminNav] = useState(false);
    const navigate = useNavigate();

    // 컴포넌트가 마운트 될 때 쿠키에서 토큰 읽기
    useEffect(() => {
        const aToken = Cookies.get('accessToken');
        const rToken = Cookies.get('refreshToken');
        if (aToken && rToken) {
            setAccessToken(aToken);
            setRefreshToken(rToken);
        }
        try {
            const decodedToken = jwtDecode(aToken);
            setAuth(decodedToken.auth);
            setSub(decodedToken.sub);
            setIsAdminNav(decodedToken.auth.includes('ADMIN'));
        } catch (error) {
            console.error('토큰 디코딩 오류:', error);
        }
    }, []);

    // 토큰 재발급 함수
    const reToken = (aToken, grantType) => {
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
    const saveToken = (aToken, rToken, grantType) => {
        const accessToken = grantType + aToken;
        const refreshToken = grantType + rToken;
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
            value={{accessToken, refreshToken, permissions: auth, sub, reToken, saveToken, clearToken, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

// AuthContext 사용을 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);

// 리프레시 토큰 로직
export const refreshToken = (data, reToken) => {
    if (data.grantType) {  // 토큰 다시 발급을 받으면 자기 자신를 다시 호출
        reToken(data.accessToken, data.grantType);
        window.location.reload(true);
    }
}

export const clearCookie = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
}

export const urlList = (path) => {
    const host = 'http://localhost:8080';
    return {
        url: path,
        method: 'post',
        baseURL: host,
        headers: {Authorization1: Cookies.get('accessToken'), Authorization2: Cookies.get('refreshToken')}
    }
}
