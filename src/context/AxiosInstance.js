import axios from 'axios';
import { clearCookie } from './AuthContext'; // AuthContext 가져오기
import Cookies from 'js-cookie';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 10000,
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
    config => {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');
        if (accessToken) {
            config.headers['Authorization_Access'] = accessToken; // 액세스 토큰 추가
        }
        if (refreshToken) {
            config.headers['Authorization_Refresh'] = refreshToken; // 리프레시 토큰 추가
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.data.message === "사용자 정보가 존재하지 않습니다. 다시 로그인해 주세요.") {
            alert(error.response.data.message);
            clearCookie();
            window.location.href = "/signin"; // 홈으로 리디렉션
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;