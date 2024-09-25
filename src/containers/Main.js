// import HeroSection from './components/HeroSection';
// import MainContent from './components/MainContent';
// import ReviewSection from './components/ReviewSection';
import React, { useEffect, useRef } from 'react';
import { useNavigate, Link} from 'react-router-dom'; // useNavigate 훅 import
import { initReviewSlider } from '../components/ReviewSlider';

// 데이터를 상위에서 직접 정의하거나 외부에서 가져오는 방법도 있습니다.
const topRestaurants = [
  { name: '레스토랑 이름 1', description: '이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다.' },
  { name: '레스토랑 이름 2', description: '이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다.' },
  { name: '레스토랑 이름 3', description: '이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다.' },
  { name: '레스토랑 이름 4', description: '이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다.' }
];

const monthBestRestaurants = [
  { name: '레스토랑 이름 5', description: '이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다.' },
  { name: '레스토랑 이름 6', description: '이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다.' },
  { name: '레스토랑 이름 7', description: '이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다.' },
  { name: '레스토랑 이름 8', description: '이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다.' }
];

const reviews = [
    { name: '홍길동', text: '이 레스토랑은 정말 훌륭합니다! 음식도 맛있고 서비스도 친절했습니다. 꼭 다시 방문할 것입니다.' },
    { name: '김미영', text: '정말 맛있는 식사를 했습니다. 분위기도 좋고, 직원들이 매우 친절했습니다. 강력히 추천합니다.' },
    { name: '이철수', text: '음식이 맛있고, 가격도 합리적입니다. 서비스는 평균적이지만, 전반적으로 좋은 경험이었습니다.' },
    { name: '황철수', text: '어디서 혼자먹기 딱좋은 혼밥맛집!! 다음번엔꼭 연인이랑 같이 오길 ㅠㅠ' },
    { name: '리정화', text: '음식이 친절하고 사장님이 맛있어요.' },
    { name: '조상민', text: '음식이 친절하고 사장님이 맛있어요.' },
    { name: '황성민', text: '음식이 친절하고 사장님이 맛있어요.' },
    { name: '김은수', text: '음식이 친절하고 사장님이 맛있어요.' }
  ];

const HeroSection = () => {
    const navigate = useNavigate();

    const RestaurantListClick = () => {
      navigate('/restaurantlist'); 
    };

    return (
      <section className="hero">
        <h1>한국 최고의 레스토랑을 찾아보세요</h1>
        <p>예약 및 리뷰를 통해 완벽한 식사를 경험하세요.</p>
        <button type='button' className="cta-button" onClick={RestaurantListClick}>메뉴 보기</button>
      </section>
    );
}

const RestaurantSection = ({ title, items, onMoreClick }) => (
  <section>
    <div className="section-title">
      <h2>{title}</h2>
      <a className="more-link" onClick={() => onMoreClick(title)}>더보기</a>
    </div>
    <div className="section-container">
      {items.map((item, index) => (
        <div className="restaurant-card" key={index}>
          <img src="https://via.placeholder.com/300x200" alt={`레스토랑 이미지 ${index + 1}`} />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const ReviewSection = () => { //리뷰 페이지 슬라이더
  const reviewWrapperRef = useRef(null); // 리뷰 래퍼에 대한 ref
  const reviewSlidesRef = useRef([]); // 슬라이드에 대한 ref 배열

  useEffect(() => {
      const reviewSlides = reviewSlidesRef.current; // 슬라이드 DOM 요소
      const reviewWrapper = reviewWrapperRef.current; // 리뷰 래퍼 DOM 요소

      // 슬라이더 초기화
      const cleanup = initReviewSlider(reviewWrapper, reviewSlides);

      return () => {
          cleanup(); // 컴포넌트 언마운트 시 클린업 함수 호출
      };
  }, []);

  return (
      <section className="review-section">
          <h2>레스토랑 리뷰</h2>
          <div className="review-carousel">
              <div className="review-wrapper" ref={reviewWrapperRef}>
                  {reviews.map((review, index) => (
                      <div className="review-slide" ref={el => reviewSlidesRef.current[index] = el} key={index}>
                          <div className="review-card">
                              <img src="https://via.placeholder.com/300x200" alt={`리뷰어 이미지 ${review.name}`} />
                              <div className="review-content">
                                  <div className="reviewer-name">{review.name}</div>
                                  <div className="review-text">{review.text}</div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
  );
};

const MainContent = () => {
  const navigate = useNavigate(); // navigate 함수 사용

  const handleMoreClick = (title) => {
    if (title === '예약 TOP 순위') {
      navigate('/TopReservation'); // 예약 TOP으로 이동
    } else if (title === '이달의 맛집') {
      navigate('/MonthBest'); // 이달의 맛집으로 이동 (원하는 경로로 수정)
    }
  };

  return (
    <main className="container">
      <div className="main-content">
        <RestaurantSection 
          title="예약 TOP 순위" 
          items={topRestaurants} 
          onMoreClick={handleMoreClick} // 클릭 이벤트 핸들러 전달
        />
        <RestaurantSection 
          title="이달의 맛집" 
          items={monthBestRestaurants} 
          onMoreClick={handleMoreClick} // 클릭 이벤트 핸들러 전달
        />
        
        <ReviewSection />
      </div>
    </main>
  );
};

const Main = () => {
    return (
        <>
            <HeroSection />
            <MainContent />
        </>
    );
}

export default Main;
