import React, { useEffect, useState } from 'react';
import '../css/default.css';
import '../css/home.css';
import '../css/restaurantList.css';

const RestaurantSidbar = () => {
    return (
        <aside className="sidebar">
            <form action="">
                <h2>필터</h2>
                <h3>지역 선택</h3>
                <select id="location" name="location">
                    <option value="">지역을 선택하세요</option>
                    <option value="seoul">서울</option>
                    <option value="busan">부산</option>
                    <option value="incheon">인천</option>
                </select>
                <h3>카테고리</h3>
                <select id="category" name="category">
                    <option value="">카테고리 선택</option>
                    <option value="korean">한식</option>
                    <option value="chinese">중식</option>
                    <option value="japanese">일식</option>
                </select>
                <h3>가격대</h3>
                <select id="price" name="price">
                    <option value="">가격대 선택</option>
                    <option value="low">20,000원 이하</option>
                    <option value="medium">20,000 ~ 50,000원</option>
                    <option value="high">50,000 ~ 80,000원</option>
                    <option value="veryhigh">80,000 ~ 110,000원</option>
                    <option value="superhigh">110,000원 이상</option>
                </select>

            </form>
        </aside>
    );
};

const RestaurantList = () => {
    const [isVisible, setIsVisible] = useState(false);
    // 페이지 최상단으로 스크롤하는 로직
    const toggleVisibility = () => {
        if (window.scrollY > 300) { 
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 추가
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility); 
        return () => {
            window.removeEventListener('scroll', toggleVisibility); 
        };
    }, []); 

    return (
        <section className="restaurant-list-container">
            <div className="restaurant-wrapper">
                <RestaurantSidbar />
                <div className="restaurant-list">
                    <h1>맛집 전체 리스트</h1>
                    <ul>
                        {/* 레스토랑 항목들 */}
                        {Array(20).fill(null).map((_, index) => (
                            <li key={index} className="restaurant-item2" data-id={index + 1}>
                                <img src="https://via.placeholder.com/200x150" alt="레스토랑 이미지" />
                                <div className="restaurant-details2">
                                    <h2>레스토랑 이름 {index + 1}</h2>
                                    <p>이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다. 분위기와 서비스가 뛰어나며, 특별한 날에 방문하기 좋은 장소입니다.</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {isVisible && (
                <button className="scroll-to-top" onClick={scrollToTop}>
                    ↑
                </button>
            )}
        </section>
    );
};

export default RestaurantList;
