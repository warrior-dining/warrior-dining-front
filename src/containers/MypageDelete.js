import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {clearCookie, useAuth} from '../context/AuthContext';
import '../css/default.css';
import '../css/myPage.css';
import '../css/myPageDelete.css';
import axiosInstance from "../context/AxiosInstance";
import MypageSidebar from "../components/MypageSidebar";

const MypageDelete = () => {
    const [passwords, setPasswords] = useState({
        password: '', confirmPassword: ''
    });
    const [email, setEmail] = useState({
        email: ''
    });
    const [error, setError] = useState('');
    const {flag, sub} = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (flag !== 1) {
            if (flag && email !== sub) {
                setError(`본인의 아이디를 정확히 입력해 주세요.`);
                return;
            }
        } else if (flag === 1) {
            if (!passwords.password) {
                setError('현재 비밀번호를 입력하세요.');
                return;
            } else if (passwords.password !== passwords.confirmPassword) {
                setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
                return;
            }
        }

        if (window.confirm('정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            try {
                const requestData = flag !== 1
                    ? {email: email, isUsed: false} // 소셜 사용자의 경우
                    : {password: passwords.password, isUsed: false}; // 일반 사용자의 경우

                const response = await axiosInstance.delete(
                    '/api/user',
                    {data: requestData});

                if (response.data.status) {
                    alert('회원 탈퇴가 완료되었습니다.');
                    setError('');
                    clearCookie();
                    window.location.href = "/";
                } else {
                    setError(response.data.error.message);
                }
            } catch (error) {
                if (error.response) {
                    setError('회원 탈퇴 실패: ' + error.response.data.message);
                } else {
                    setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
                }
            }
        }
    };

    return (
        <>
            <main className="mypage-container">
                <MypageSidebar/>

                <div className="content">
                    <h2>회원 탈퇴</h2>
                    {error && <p className="error">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>정보 입력</legend>
                            {flag !== 1 ? (
                                <>
                                    <p>회원 탈퇴를 하시려면 본인의 이름과 아이디를 입력한 후, 아래 버튼을 클릭하세요.</p>
                                    <label htmlFor="email">현재 아이디:</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <>
                                    <p>회원 탈퇴를 하시려면 비밀번호를 입력한 후, 아래 버튼을 클릭하세요.</p>
                                    <label htmlFor="password">현재 비밀번호:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={handlePasswordChange}
                                    />

                                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        onChange={handlePasswordChange}
                                    />
                                </>
                            )}
                        </fieldset>

                        <div className="confirmation-buttons">
                            <button type="submit" className="delete-button">회원 탈퇴</button>
                            <button type="button" className="delete-button" onClick={() => navigate('/mypage')}>취소
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default MypageDelete;
