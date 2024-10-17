import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/restaurantlist${searchTerm.trim() ? `?search=${encodeURIComponent(searchTerm)}` : ''}`);
    setSearchTerm(''); 
    window.location.reload();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); 
    }
  };

  return (
    <div className="nav-bar">
      <div className="container">
        <ul>
          <li><Link to="/topreservation">예약 TOP</Link></li>
          <li><Link to="/monthbest">이달의 맛집</Link></li>
          <li><Link to="/restaurantlist">음식점 찾기</Link></li>
          <li><Link to="/inquiryfaq">문의</Link></li>
          <li className="search-bar">
            <input 
              type="text" 
              placeholder="지역 또는 레스토랑 검색" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              onKeyDown={handleKeyDown} 
            />
            <button onClick={handleSearch}>검색</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
