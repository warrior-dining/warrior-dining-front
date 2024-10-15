import React, { useEffect, useState } from 'react';
import '../css/default.css';
import '../css/home.css';
import '../css/restaurantList.css';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const host = "http://localhost:8080/api/restaurant";


const fetchRestaurants = async ({ pageParam = 0 }) => {
    const response = await fetch(`${host}?page=${pageParam}`);
    const data = await response.json();
    return data;
};

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
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(window.scrollY > 300);
    };

    const resDetailClick = (id) => {
        navigate(`/restaurant/detail/${id}`);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ['restaurants'],
        queryFn: fetchRestaurants,
        getNextPageParam: (lastPage) => {
            return lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined;
        },
    });

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (hasNextPage && window.innerHeight + window.scrollY >= document.body.offsetHeight + 1000 && !isFetching) {
                fetchNextPage();
                for (let i = 0; i < 10; i++) {
                    if (hasNextPage) {
                        fetchNextPage();
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasNextPage, isFetching, fetchNextPage]);

    
    return (
        <section className="restaurant-list-container">
            <div className="restaurant-wrapper">
                <RestaurantSidbar />
                <div className="restaurant-list">
                    <h1>맛집 전체 리스트</h1>
                    <ul>
                        {data?.pages.flatMap(page => page.content).map((restaurant) => (
                            <li key={restaurant.id} className="restaurant-item2" onClick={() => resDetailClick(restaurant.id)}>
                                <img 
                                    src={restaurant.placeFiles[0].url}
                                    alt={`${restaurant.name} 이미지`} 
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/200x150"; }} // 이미지 로딩 실패 시 대체 이미지
                                />
                                <div className="restaurant-details2">
                                    <h2>{restaurant.name}</h2>
                                    <p>{restaurant.comment}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {isFetching && <p>Loading more...</p>}
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
