import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="nav-bar">
      <div className="container">
        <ul>
        <li><Link to="/TopReservation">예약 TOP</Link></li>
          <li><Link to="/MonthBest">이달의 맛집</Link></li>
          <li><Link to="/RestaurantList">음식점 찾기</Link></li>
          <li><Link to="/InquiryFaq">문의</Link></li>
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
