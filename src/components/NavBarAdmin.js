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
                        </div>
                    </li>
                    {/* Link로 수정 */}
                    <li className='nav-item'>
                        <a href="#">음식점 관리</a>
                        <div className="sub-menu">
                            <Link to="/admin/places">음식점 목록</Link>
                            <Link to="/admin/places/add">음식점 등록</Link>
                        </div>
                    </li>
                    <li className='nav-item'>
                        <a href="#">리뷰 관리</a>
                        <div className="sub-menu">
                            <Link to="/admin/reviews">리뷰 목록</Link>
                        </div>
                    </li>
                    <li className='nav-item'>
                        <a href="#">예약 관리</a>
                        <div className="sub-menu">
                            <Link to="/admin/reservations">예약 목록</Link>
                        </div>
                    </li>
                    <li className='nav-item'>
                        <a href="#">문의사항 관리</a>
                        <div className="sub-menu">
                            <Link to="/admin/inquiries">문의 목록</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBarAdmin;
