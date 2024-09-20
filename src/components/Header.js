import React from 'react';
import { Link } from 'react-router-dom'; // Link를 import

function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-content">
        <Link to="/" className="logo">WarriorDining</Link> {/* Link로 수정 */}
          <div className="auth-buttons">
            <a href="#">로그인</a>
            <a href="#">회원 가입</a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
