import React, { useState } from 'react';
import '../css/SignUp.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [emailInfo, setEmailInfo] = useState('');

    const handleEmailCheck = () => {
        // 이메일 중복 확인 로직
        setEmailInfo("중복 확인 완료"); // 예시로 결과 메시지 설정
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 처리 로직 추가
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        console.log("회원가입 성공:", { email, password, name, birthdate, phone, gender });
    };

    return (
        <main className="container">
            <section className="main-section">
                <div className="signup-form">
                    <h2>회원가입</h2>
                    <form id="signup-form" onSubmit={handleSubmit}>
                        <div className="signup-form-group">
                            <label htmlFor="email">이메일</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력하세요"
                                required
                            />
                            <button type="button" id="check-email" className="signup-check-button" onClick={handleEmailCheck}>
                                중복 확인
                            </button>
                            <div id="email-info" className="info">{emailInfo}</div>
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
                            <label htmlFor="birthdate">생년월일</label>
                            <input
                                type="date"
                                id="birthdate"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
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
                                placeholder="휴대폰 번호를 입력하세요"
                                pattern="\d*"
                                maxLength="11"
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
                                <option value="male">남성</option>
                                <option value="female">여성</option>
                            </select>
                        </div>

                        <button type="submit">회원가입</button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default SignUp;
