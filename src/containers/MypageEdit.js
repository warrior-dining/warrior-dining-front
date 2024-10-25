import React, {useEffect, useState} from "react";
import '../css/mypageMutual.css';
import '../css/default.css';
import '../css/myPageEdit.css';
import MypageSidebar from "../components/MypageSidebar";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../context/AxiosInstance";
import {clearCookie, refreshToken, useAuth} from '../context/AuthContext';

const MypageEdit = () => {
    const [error, setError] = useState(null);
    const {reissueToken} = useAuth();
    const [user, setUser] = useState({
        name: '', email: '', phone: '', currentPassword: '', newPassword: '', confirmPassword: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`/api/user`)
            .then(res => {
                refreshToken(res.data, reissueToken);
                if (res.data.status) {
                    const userData = {
                        name: res.data.name,
                        email: res.data.email,
                        phone: res.data.phone,
                        flag: res.data.flag
                    };
                    setUser(userData);

                    if (userData.flag !== 1) {
                        alert("warrior-dining 계정만 정보수정이 가능합니다.")
                        navigate('/mypage');
                    }

                    setError(null);
                }
            })
            .catch(error => {
                setError('유저 정보를 불러오는 데 실패했습니다.');
            });
    }, [reissueToken]);

    const changeEvent = (e) => {
        const {name, value} = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.currentPassword) {
            setError('현재 비밀번호를 입력하세요.');
            return;
        }

        if (user.newPassword && user.newPassword !== user.confirmPassword) {
            setError('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        const edits = {
            email: user.email,
            phone: user.phone,
            password: user.currentPassword,
            newPassword: user.newPassword
        };

        if (user.phone) edits.phone = user.phone;
        if (user.newPassword) edits.newPassword = user.newPassword;

        axiosInstance.put(`/api/user`, edits)
            .then(response => {
                if (response.data.status) {
                    alert('정보가 성공적으로 수정되었습니다. 재로그인 이용해주세요.');
                    clearCookie();
                    window.location.href = "/signin";
                    setError(null);
                }
            })
            .catch(error => {
                if (error.response) {
                    setError('정보 수정에 실패했습니다. 오류: ' + error.response.data.message);
                } else {
                    setError('서버오류가 발생했습니다. 다시 시도해주세요.');
                }
            });
    }

    return (
        <>
            <main className="mypage-container">
                <MypageSidebar/>
                <div className="content">
                    <section id="settings">
                        <h1>설정</h1>

                        <div className="settings-section">
                            <h2>정보 수정</h2>

                            {error && <p className="error">{error}</p>}

                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name">사용자 이름</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    readOnly
                                />

                                <label htmlFor="email">이메일</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    readOnly
                                />

                                <label htmlFor="phone">전화번호</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={user.phone}
                                    onChange={changeEvent}
                                />

                                <label htmlFor="currentPassword">현재 비밀번호</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    placeholder={"현재 비밀번호를 입력하세요."}
                                    onChange={changeEvent}
                                />

                                <label htmlFor="newPassword">새 비밀번호</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder={"새로운 비밀번호를 입력하세요."}
                                    onChange={changeEvent}
                                />

                                <label htmlFor="confirmPassword">새 비밀번호 확인</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder={"새로운 비밀번호를 입력하세요."}
                                    onChange={changeEvent}
                                />

                                <button type="submit" className="save-button">저장</button>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default MypageEdit;
