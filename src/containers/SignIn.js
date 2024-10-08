import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import '../css/SignIn.css';

const SignIn = () => {
    const navigate = useNavigate();
    const { saveToken } = useAuth();
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
                const { accessToken} = data;
                saveToken(accessToken);
                navigate('/');

            } else {
                const errorMessage = await response.text();
                setError('로그인 실패: ' + errorMessage);
            }

        } catch (error) {
            setError(error.message);
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
                <a type="button" onClick={signUpClick}>회원 가입</a>
                <a type="button" onClick={forgotPasswordClick}>비밀번호를 잊으셨나요?</a>
            </form>
        </div>
    );
};

export default SignIn;
