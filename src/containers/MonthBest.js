import React from 'react';
import '../css/default.css';
import '../css/home.css';
import '../css/monthBest.css';

const MonthBest = () => {
  return (
    <div>

<section class="featured-restaurants">
    <div class="restaurant-container">
        <h1>이달의 맛집</h1>

        <div class="category-list">
            <a href="#">한식</a>
            <a href="#">양식</a>
            <a href="#">일식</a>
            <a href="#">중식</a>
            <a href="#">기타</a>
            <a href="#">전체보기</a>
        </div>

        <div class="restaurant-list">
            <div class="restaurant-item">
                <img src="https://via.placeholder.com/300x200" alt="레스토랑 이미지" />
                <div class="restaurant-details">
                    <h2>레스토랑 이름 1</h2>
                    <p>이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다. 분위기와 서비스가 뛰어나며, 특별한 날에 방문하기 좋은 장소입니다.</p>
                </div>
            </div>
            <div class="restaurant-item">
                <img src="https://via.placeholder.com/300x200" alt="레스토랑 이미지" />
                <div class="restaurant-details">
                    <h2>레스토랑 이름 2</h2>
                    <p>이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다. 분위기와 서비스가 뛰어나며, 특별한 날에 방문하기 좋은 장소입니다.</p>
                </div>
            </div>
            <div class="restaurant-item">
                <img src="https://via.placeholder.com/300x200" alt="레스토랑 이미지" />
                <div class="restaurant-details">
                    <h2>레스토랑 이름 3</h2>
                    <p>이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다. 분위기와 서비스가 뛰어나며, 특별한 날에 방문하기 좋은 장소입니다.</p>
                </div>
            </div>

        </div>
    </div>
</section>

    </div>
  );
};

export default MonthBest;
