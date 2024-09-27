import React from 'react';
import { Link , useNavigate } from 'react-router-dom'; 


const Header = ({adminClick}) => {
  const navigate = useNavigate();
  const changeAdminClick = () => {
    adminClick(true);
    navigate('/admin');
  }
  const changeMainClick = () => {
    adminClick(false);
  }

  return (
    <header>
      <div className="container">
        <div className="header-content">

        <Link to="/" className="logo" onClick={changeMainClick}>WarriorDining</Link> 

          <div className="auth-buttons">
            <a href="#">로그인</a>
            <a href="#">회원 가입</a>
            <a onClick={changeAdminClick}>관리자 페이지</a>
            <Link to="/mypage">마이페이지</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
