import React from 'react';
import '../css/default.css'; // 스타일 시트 연결
import '../css/reservationTop10.css'; // 예약 TOP 10 스타일 시트 연결
import '../css/home.css';
import '../css/monthBest.css';

const TopReservation = () => {
  return (
    <div>

      <section className="featured-restaurants">
        <div className="restaurant-container">
          <h1>예약 TOP 10</h1>

          <div className="category-list">
            <a href="#">한식</a>
            <a href="#">양식</a>
            <a href="#">일식</a>
            <a href="#">중식</a>
            <a href="#">기타</a>
          </div>

          <div className="restaurant-list">
            {[...Array(10)].map((_, index) => (
              <div className="restaurant-item" key={index}>
                <div className="restaurant-rank">{index + 1}</div>
                <img src="https://via.placeholder.com/300x200" alt={`레스토랑 이미지 ${index + 1}`} />
                <div className="restaurant-details">
                  <h2>레스토랑 이름 {index + 1}</h2>
                  <p>이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다. 분위기와 서비스가 뛰어나며, 특별한 날에 방문하기 좋은 장소입니다.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default TopReservation;
