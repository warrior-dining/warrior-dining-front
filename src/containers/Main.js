import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {initReviewSlider} from '../components/ReviewSlider';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const HeroSection = () => {
    const navigate = useNavigate();

    const RestaurantListClick = () => {
        navigate('/placelist');
    };

    return (
        <section className="hero">
            <h1>한국 최고의 레스토랑을 찾아보세요</h1>
            <p>예약 및 리뷰를 통해 완벽한 식사를 경험하세요.</p>
            <button type='button' className="cta-button" onClick={RestaurantListClick}>찾아보기</button>
        </section>
    );
}

const RestaurantSection = ({title, items, onMoreClick, id}) => {
    const navigate = useNavigate(id);
    const detailClick = (id) => {
        navigate(`/place/${id}`);
    }

    return (
        <section>
            <div className="section-title">
                <h2>{title}</h2>
                <button className="more-link" onClick={() => onMoreClick(title)}>더보기</button>
            </div>
            <div className="section-container">
                {items.map((item, index) => (
                    <div className="restaurant-card" key={index} onClick={() => detailClick(item.id)}>
                        <img src={item.url} alt={`레스토랑 이미지 ${index + 1}`}
                             onError={(e) => {
                                 e.target.src = "https://via.placeholder.com/200x150";
                             }}/>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};


const ReviewSection = () => {
    const reviewWrapperRef = useRef(null);
    const reviewSlidesRef = useRef([]);
    const [restaurantReviews, setRestaurantsReviews] = useState([]);

    // 리뷰 작성자 이름 가운데 * 처리
    const maskName = (name) => {
        if (name.length === 2) {

            return name[0] + '*';
        } else if (name.length === 3) {

            return name[0] + '*' + name[2];
        } else if (name.length > 3) {

            const middle = '*'.repeat(name.length - 2);
            return name[0] + middle + name[name.length - 1];
        }
        return name;
    };

    useEffect(() => {
        const fetchRestaurantsReviews = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/place/reviews`);
                setRestaurantsReviews(response.data);
            } catch (error) {
                console.error("리뷰가 존재 하지 않습니다 : ", error);
            }
        };
        fetchRestaurantsReviews();
    }, []);

    useEffect(() => {
        if (restaurantReviews.length > 0 && reviewWrapperRef.current) {
            const reviewSlides = reviewSlidesRef.current;
            const reviewWrapper = reviewWrapperRef.current;

            // 슬라이드가 제대로 렌더링된 후에 슬라이더 초기화
            const cleanup = initReviewSlider(reviewWrapper, reviewSlides);

            return () => {
                cleanup();
            };
        }
    }, [restaurantReviews]);

    return (
        <section className="review-section">
            <h2>레스토랑 리뷰</h2>
            <div className="review-carousel">
                <div className="review-wrapper" ref={reviewWrapperRef}>
                    {restaurantReviews.map((review, index) => (
                        <div className="review-slide" ref={el => reviewSlidesRef.current[index] = el} key={index}>
                            <div className="review-card">

                                <div className="review-content">
                                    <div className="reviewer-name">{maskName(review.name)}</div>
                                    <div className='review-placeName'>{`< ${review.placeName} >`}</div>
                                    <div className="review-text">{review.content}</div>
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
    const navigate = useNavigate();
    const [topRestaurants, setTopRestaurants] = useState([]);
    const [monthBestRestaurants, setMonthBestRestaurants] = useState([]);

    useEffect(() => {
        const fetchTopRestaurants = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/place/top`);
                setTopRestaurants(response.data.slice(0, 4));
            } catch (error) {
                console.error("데이터가 존재 하지 않습니다 : ", error);
            }
        };

        const fetchMonthBestRestaurants = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/place/month`);
                setMonthBestRestaurants(response.data.slice(0, 4));
            } catch (error) {
                console.error("데이터가 존재 하지 않습니다 : ", error);
            }
        };

        fetchTopRestaurants();
        fetchMonthBestRestaurants();
    }, []);

    const handleMoreClick = (title) => {
        if (title === '예약 TOP 순위') {
            navigate('/TopReservation');
        } else if (title === '이달의 맛집') {
            navigate('/MonthBest');
        }
    };

    return (
        <main className="container">
            <div className="main-content">
                <RestaurantSection
                    title="예약 TOP 순위"
                    items={topRestaurants}
                    onMoreClick={handleMoreClick}
                />
                <img src={topRestaurants.url}/>
                <RestaurantSection
                    title="이달의 맛집"
                    items={monthBestRestaurants}
                    onMoreClick={handleMoreClick}
                />

                <ReviewSection/>
            </div>
        </main>
    );
};

const Main = () => {
    return (
        <>
            <HeroSection/>
            <MainContent/>
        </>
    );
}

export default Main;
