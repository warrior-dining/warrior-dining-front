import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import '../css/SignIn.css';
import kakaoLoginImage from '../image/kakao_login.png';
import naverLoginImage from '../image/naver_login.png';

const SignIn = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const {saveToken} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signUpClick = () => {
        navigate('/SignUp');
    };

    const forgotPasswordClick = () => {
        // 비밀번호 찾기 기능 구현
        alert('비밀번호 찾기 기능은 준비 중입니다.');
    };

    const socialLoginClick = (platform) => {
        const urlMap = {
            kakao: `${backendUrl}/api/user/login/kakao`,
            naver: `${backendUrl}/api/user/login/naver`
        };

        // 플랫폼에 맞는 URL로 리다이렉트
        if (urlMap[platform]) {
            window.location.href = urlMap[platform];
        } else {
            setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.')
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const grantType = urlParams.get('grantType');
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');
        if (accessToken) {
            saveToken(accessToken, refreshToken, grantType);
            navigate('/');
        }
    }, [navigate, saveToken]);

    const submit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('/api/user/signin', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: email, password: password}),
            });

            if (response.ok) {
                const data = await response.json();
                const {accessToken, refreshToken, grantType} = data;
                saveToken(accessToken, refreshToken, grantType);
                navigate('/');

            } else {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.message || '로그인 실패'; // 사용자에게 보여줄 메시지
                setError(errorMessage);
            }

        } catch (error) {
            setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={submit}>
                <h2>로그인</h2>
                <label htmlFor="email">아이디</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="아이디를 입력하세요"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required/>

                <label htmlFor="password">비밀번호</label>
                <input type="password"
                       id="password"
                       name="password"
                       placeholder="비밀번호를 입력하세요"
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                       required/>

                <button type="submit">로그인</button>
                {error && <p className="error">{error}</p>}

                <div className="social-login-container">
                    <button type="button" className="kakao-login-button" onClick={() => socialLoginClick("kakao")}>
                        <img src={kakaoLoginImage} alt="카카오 로그인" className="kakao-login-image"/>
                    </button>

                    <button type="button" className="naver-login-button" onClick={() => socialLoginClick("naver")}>
                        <img src={naverLoginImage} alt="네이버 로그인" className="kakao-login-image"/>
                    </button>
                </div>

                <div className="login-under">
                    <button type="button" onClick={signUpClick}>회원 가입</button>
                    <button type="button" onClick={forgotPasswordClick}>비밀번호를 잊으셨나요?</button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
