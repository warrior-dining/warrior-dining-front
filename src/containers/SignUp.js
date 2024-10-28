import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/SignUp.css';

const host = process.env.REACT_APP_BACKEND_URL;

const SignUp = () => {
        const navigate = useNavigate();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [name, setName] = useState('');
        const [birth, setBirth] = useState('');
        const [phone, setPhone] = useState('');
        const [gender, setGender] = useState('');
        const [error, setError] = useState('');
        const [successMessage, setSuccessMessage] = useState('');

        const submit = async (e) => {
            e.preventDefault();
            setError('');
            setSuccessMessage('');

            if (password !== confirmPassword) {
                setError(error.message || "비밀번호가 일치하지 않습니다.");
                return;
            }

            axios.post(`${host}/api/user/signup`, {
                email,
                password,
                name,
                birth,
                phone,
                gender
            })
                .then((response) => {
                    if (response.data.status === true) {
                        alert(response.data.name + "님 환영합니다 로그인 후 이용해주세요."); // 성공 메시지 설정
                        navigate('/signin');
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        setError(error.response.data.message);
                    } else if (error.request) {
                        setError(error.message || "서버로부터 응답을 받지 못했습니다.");
                    } else {
                        setError(error.message || "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
                    }
                });
        };

        return (
            <main className="container">
                <section className="main-section">
                    <div className="signup-form">
                        <h2>회원가입</h2>
                        <form id="signup-form" onSubmit={submit}>
                            <div className="signup-form-group">
                                <label htmlFor="email">아이디</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="아이디를 입력하세요"
                                    required
                                />
                            </div>

                            <div className="signup-form-group">
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호를 입력하세요"
                                    required
                                />
                            </div>

                            <div className="signup-form-group">
                                <label htmlFor="confirm-password">비밀번호 확인</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="비밀번호 확인"
                                    required
                                />
                            </div>

                            <div className="signup-form-group">
                                <label htmlFor="name">이름</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="이름을 입력하세요"
                                    required
                                />
                            </div>

                            <div className="signup-form-group">
                                <label htmlFor="birth">생년월일</label>
                                <input
                                    type="text"
                                    id="birth"
                                    value={birth}
                                    onChange={(e) => setBirth(e.target.value)}
                                    placeholder="생년월일은 년(4자리)월(2자리)일(2자리) 형식으로 입력하세요"
                                    required
                                />
                            </div>

                            <div className="signup-form-group">
                                <label htmlFor="phone">휴대폰 번호</label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="하이픈(-)을 제외한 휴대폰 번호를 전체를 입력하세요"
                                    required
                                />
                            </div>

                            <div className="signup-form-group">
                                <label htmlFor="gender">성별</label>
                                <select
                                    id="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                >
                                    <option value="">선택하세요</option>
                                    <option value="3">남성</option>
                                    <option value="4">여성</option>
                                </select>
                            </div>

                            <button type="submit">회원가입</button>
                            {error && <div className="error">{error}</div>}
                            {successMessage && <div className="success">{successMessage}</div>}
                        </form>
                    </div>
                </section>
            </main>
        );
    }
;

export default SignUp;
