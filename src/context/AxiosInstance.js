import axios from 'axios';
import { clearCookie } from './AuthContext'; // AuthContext 가져오기

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // API 기본 URL 설정
    timeout: 10000, // 요청 후 10초 이내에 응답이 없으면 오류 발생
});

// 응답에 대한 인터셉터 설정
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
