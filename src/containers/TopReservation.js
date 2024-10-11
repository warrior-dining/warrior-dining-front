import React, { useEffect, useState } from 'react';
import '../css/default.css'; 
import '../css/reservationTop10.css'; 
import '../css/home.css';
import '../css/monthBest.css';
import { useNavigate } from 'react-router-dom';

const host = "http://localhost:8080/api/restaurant/top"; 

const TopReservation = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(host);
        const data = await response.json();

        if (Array.isArray(data)) {
          setRatings(data.slice(0, 10));
        } else {
          console.error("오류에용", data);
        }
      } catch (error) {
        console.error("에러에용", error);
      }
    };

    fetchData();
  }, []);

  const resDetailClick = () => {
    navigate(`/restaurant/detail`);
  };
  
  return (
    <div>
      <section className="featured-restaurants">
        <div className="restaurant-container">
          <h1>예약 TOP 10</h1>

          <div className="category-list">
            <a href="/korean">한식</a>
            <a href="/western">양식</a>
            <a href="/japanese">일식</a>
            <a href="/chinese">중식</a>
            <a href="/etc">기타</a>
            <a href="/all">전체보기</a>
          </div>
          
          <div className="restaurant-list">
            {ratings.length > 0 ? (
              ratings.map((rating, index) => (
                <div className="restaurant-item" key={index} onClick={() => resDetailClick(rating.id)}>
                  <div className="restaurant-rank">{index + 1}</div>
                  <img src={rating.url} alt={`레스토랑 이미지 ${index + 1}`} 
                  onError={(e) => {e.target.src = "https://via.placeholder.com/200x150";}}/>
                  <div className="restaurant-details">
                    <h2>{rating.name}</h2>
                    <p>{rating.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>데이터를 불러오는 중입니다...</p> 
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopReservation;
