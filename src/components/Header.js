import React from 'react';
import { Link , useNavigate } from 'react-router-dom'; // Link를 import

const Header = ({adminClick}) => {
  const navigate = useNavigate();
  const changeAdminClick = () => {
    adminClick(true);
    navigate('/admin');
  }
  return (
    <header>
      <div className="container">
        <div className="header-content">
        <Link to="/" className="logo">WarriorDining</Link> {/* Link로 수정 */}
          <div className="auth-buttons">
            <a href="#">로그인</a>
            <a href="#">회원 가입</a>
            <a onClick={changeAdminClick}>관리자 페이지</a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
