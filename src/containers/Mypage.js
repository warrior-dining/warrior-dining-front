import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import '../css/mypageMutual.css';
import '../css/myPage.css';
import '../css/default.css';
import MypageSidebar from "../components/MypageSidebar";
import {refreshToken, useAuth} from '../context/AuthContext';
import axiosInstance from '../context/AxiosInstance';


const Mypage = () => {
    const {reissueToken} = useAuth();
    const [user, setUser] = useState({name: '', email: '', phone: ''});

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
                }
            })
            .catch(
                error => {
                    console.log(error);
                }
            )
    }, [reissueToken]);

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
                            <input type="text" id="name" name="name" value={user.name} onChange={changeEvent}
                                   readOnly/>

                            <label htmlFor="email">이메일:</label>
                            <input type="email" id="email" name="email" value={user.email} onChange={changeEvent}
                                   readOnly/>

                            <label htmlFor="phone">전화번호:</label>
                            <input type="tel" id="phone" name="phone" value={user.phone} onChange={changeEvent}
                                   readOnly/>
                        </fieldset>

                        {(user.flag === 1) && (
                            <Link to="/mypage/edit" className="button">정보 수정</Link>
                        )}
                    </form>
                </div>
            </main>
        </>
    );
}


export default Mypage;

