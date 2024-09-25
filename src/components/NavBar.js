import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="container">
        <ul>
        <li><Link to="/topreservation">예약 TOP</Link></li> {/* Link로 수정 */}
          <li><Link to="/monthbest">이달의 맛집</Link></li>
          <li><Link to="/restaurantlist">음식점 찾기</Link></li>
          <li><Link to="/inquiryfaq">문의</Link></li>
          <li className="search-bar">
            <input type="text" placeholder="지역 또는 레스토랑 검색" />
            <button>검색</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
