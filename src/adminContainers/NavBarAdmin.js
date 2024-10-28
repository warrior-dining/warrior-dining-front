import React from 'react';
import {Link} from 'react-router-dom';

function NavBarAdmin() {
    return (
        <div className="nav-bar">
            <div className="container">
                <ul>
                    <li className='nav-item'>
                        <a href="#">회원 관리</a>
                        <div className="sub-menu">
                            <Link to="/admin/users">회원 목록</Link>
                            <a href="#">뭔가 메뉴가 더 있겟지</a>
                        </div>
                    </li>
                    <li className='nav-item'>
                        <a href="#">음식점 관리</a>
                        <div className="sub-menu">
                            <Link to="/admin/places">음식점 목록</Link>
                            <a href="#">음식점 추가</a>
                        </div>
                    </li>
                    <li className='nav-item'>
                        <a href="#">리뷰 관리</a>
                        <div className="sub-menu">
                            <a href="/admin/reviews">리뷰 목록</a>
                            <a href="#">리뷰 필터</a>
                        </div>
                    </li>
                    <li className='nav-item'>
                        <a href="#">예약 관리</a>
                        <div className="sub-menu">
                            <a href="/admin/reservations">예약 목록</a>
                            <a href="#">예약 검색</a>
                        </div>
                    </li>
                    <li className='nav-item'>
                        <a href="#">문의사항 관리</a>
                        <div className="sub-menu">
                            <a href="/admin/inquiries">문의 목록</a>
                            <a href="#">미처리 문의</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBarAdmin;
