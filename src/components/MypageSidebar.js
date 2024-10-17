import React from "react";
import {NavLink} from 'react-router-dom';
import '../css/mypageMutual.css';

const MypageSidebar = () => {
    return (
        <div className="mypage-sidebar">
            <h2>마이페이지</h2>
            <ul>
                <li>
                    <NavLink
                        to="/mypage/main"
                        className={({isActive}) => (isActive ? 'active' : '')}
                    >
                        내정보
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/mypage/reservationlist"
                        className={({isActive}) => (isActive ? 'active' : '')}
                    >
                        예약 내역
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/mypage/reviewlist"
                        className={({isActive}) => (isActive ? 'active' : '')}
                    >
                        리뷰 관리
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/mypage/bookmark"
                        className={({isActive}) => (isActive ? 'active' : '')}
                    >
                        즐겨찾기
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/mypage/inquiry"
                        className={({isActive}) => (isActive ? 'active' : '')}
                    >
                        내 문의내역
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}
export default MypageSidebar;
