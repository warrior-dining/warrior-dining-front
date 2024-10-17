import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import '../css/mypageMutual.css';
import '../css/myPage.css';
import '../css/default.css';
import MypageSidebar from "../components/MypageSidebar";
import {useAuth, urlList, refreshToken} from '../context/AuthContext';
import axiosInstance from '../context/AxiosInstance';


const Mypage = () => {
    const {reissueToken} = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState({name: '', email: '', phone: ''});

    useEffect(() => {
        axiosInstance(urlList("/api/user/test/2"))
            .then(res => {
                refreshToken(res.data, reissueToken);
                if (res.data.status) {
                    const userData = {
                        name: res.data.name,
                        email: res.data.email,
                        phone: res.data.phone
                    };
                    setUser(userData); // 사용자 정보 업데이트
                }
            })
            .catch(
                error => {
                    console.log(error);
                }
            )
    }, [reissueToken, navigate]);

    const changeEvent = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    return (
        <>
            <main className="mypage-container">
                <MypageSidebar/>

                <div className="mypage-content">
                    <h1>내정보</h1>
                    <form id="infoForm">
                        <fieldset>
                            <legend>개인정보</legend>
                            <label htmlFor="name">이름:</label>
                            <input type="text" id="name" name="name" value={user.name} onChange={changeEvent}/>

                            <label htmlFor="email">이메일:</label>
                            <input type="email" id="email" name="email" value={user.email} onChange={changeEvent}/>

                            <label htmlFor="phone">전화번호:</label>
                            <input type="tel" id="phone" name="phone" value={user.phone} onChange={changeEvent}/>
                        </fieldset>

                        <Link to="/mypage/edit" className="button">정보 수정</Link>
                    </form>
                </div>
            </main>
        </>
    );
}


export default Mypage;

