import React, { useEffect, useState } from 'react';
import '../css/default.css'; 
import '../css/home.css';
import '../css/monthBest.css';
import { useNavigate } from 'react-router-dom';

const host = "http://localhost:8080/api/restaurant/month"; 

const MonthBest = () => {
    const navigate = useNavigate();
    const [ratings, setRatings] = useState([]); 
    const [filteredRatings, setFilteredRatings] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true); // 데이터를 불러오는 중인지 여부

    const categories = {
      all: '전체',
      korean: 5,      
      chinese: 6,     
      japanese: 7,    
      western: 8,     
      bunsik: 9,      
      asian: 10,      
      etc: 11,        
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(host);
            const data = await response.json();
    
            if (Array.isArray(data)) {
              setRatings(data.slice(0, 10));
              setFilteredRatings(data.slice(0, 10));
            } else {
              console.error("오류에용", data);
            }
          } catch (error) {
            console.error("에러에용", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        if (selectedCategory === 'all') {
          setFilteredRatings(ratings);
        } else {
          const filtered = ratings.filter(rating => rating.value === categories[selectedCategory]);
          setFilteredRatings(filtered);
        }
      }, [selectedCategory, ratings]); // 카테고리 선택이나 데이터 변경 시 필터링

      const resDetailClick = (id) => {
        navigate(`/restaurant/${id}`);
      };

      const CategoryClick = (category) => {
        setSelectedCategory(category);
      };

  return (
    <div>
      <section className="featured-restaurants">
        <div className="restaurant-container">
          <h1>이달의 맛집</h1>

          <div className="category-list">
            <button onClick={() => CategoryClick('all')}>전체</button>
            <button onClick={() => CategoryClick('korean')}>한식</button>
            <button onClick={() => CategoryClick('western')}>양식</button>
            <button onClick={() => CategoryClick('japanese')}>일식</button>
            <button onClick={() => CategoryClick('chinese')}>중식</button>
            <button onClick={() => CategoryClick('bunsik')}>분식</button>
            <button onClick={() => CategoryClick('asian')}>아시안</button>
            <button onClick={() => CategoryClick('etc')}>기타</button>
          </div>

          <div className="restaurant-list">
            {loading ? (
              <p>데이터를 불러오는 중입니다...</p>
            ) : filteredRatings.length > 0 ? (
              filteredRatings.map((rating, index) => (
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
              <p>데이터가 존재하지 않습니다.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MonthBest;
