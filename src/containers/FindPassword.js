import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import '../css/default.css';
import '../css/myPage.css';
import '../css/findPassword.css';

const host = process.env.REACT_APP_BACKEND_URL;

const FindPassword = () => {
    const [findData, setFindData] = useState({
        name: '', birth: '', phone: ''
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFindData(prevData => ({...prevData, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 모든 필드가 입력되었는지 확인
        if (!findData.name || !findData.birth || !findData.phone) {
            setError("모든 필드를 입력하세요.");
            return;
        }

        try {
            const response = await axios.post(
                `${host}/api/user`,
                findData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            if (response.data.status) {
                alert(`새 비밀번호는 [${response.data.newPassword}] 입니다. 로그인 후 비밀번호를 변경하세요.`); // 또는 이메일로 전송하는 방식으로 변경 가능
                navigate('/signin'); // 필요 시 비밀번호 변경 페이지로 리디렉션
            } else {
                setError(response.data.message || "입력한 정보에 일치하는 회원이 존재하지 않습니다.");
            }
        } catch (error) {
            setError(error.response.data.message || "비밀번호 찾기 요청 중 오류가 발생했습니다.");
        }
    };

    return (
        <main className="mypage-container">
            <div className="mypagedelete-container">
                <section id="delete-account">
                    <h1>비밀번호 찾기</h1>
                    <div className="confirmation-section">
                        <p className="confirmation-message">
                            비밀번호를 찾으시려면 회원가입 시 입력한 사항을 입력한 후, 아래 버튼을 클릭하세요.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">이름</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="large-input"
                                placeholder={"예) 홍길동"}
                                value={findData.name}
                                onChange={handleChange}
                            />

                            <label htmlFor="birth">생년월일</label>
                            <input
                                type="text"
                                id="birth"
                                name="birth"
                                className="large-input"
                                placeholder={"예) 19950224"}
                                value={findData.birth}
                                onChange={handleChange}
                            />

                            <label htmlFor="phone">휴대폰 번호</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="large-input"
                                placeholder={"예) 01012345678"}
                                value={findData.phone}
                                onChange={handleChange}
                            />

                            {error && <p className="error">{error}</p>}

                            <div className="confirmation-buttons">
                                <button type="submit" className="delete-button">비밀번호 찾기</button>
                                <button type="button" className="delete-button" onClick={() => navigate('/signin')}>
                                    취소
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default FindPassword;
