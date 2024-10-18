import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/default.css';
import '../css/home.css';
import '../css/restaurantList.css';

const host = "http://localhost:8080/api/restaurant";

const fetchRestaurants = async ({ pageParam = 0, queryKey }) => {
    const [,search] = queryKey;
    const endpoint = search 
        ? `/search?keyword=${encodeURIComponent(search)}&page=${pageParam}` 
        : `?page=${pageParam}`;

    const response = await fetch(`${host}${endpoint}`);
    
    if (!response.ok) {
        throw new Error(`서버연결 불가능: ${response.status}`); // 오류처리
    }

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
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(window.scrollY > 300);
    };

    const resDetailClick = (id) => {
        navigate(`/restaurant/${id}`);
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
        queryKey: ['restaurants', searchTerm],
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
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasNextPage, isFetching, fetchNextPage]);

    const restaurants = data?.pages.flatMap(page => page.content) || [];

    return (
        <section className="restaurant-list-container">
            <div className="restaurant-wrapper">
                <RestaurantSidbar />
                <div className="restaurant-list">
                    <h1>{searchTerm ? `검색 결과: ${searchTerm}` : '맛집 전체 리스트'}</h1>

                    {restaurants.length > 0 ? (
                        <ul>
                            {restaurants.map((restaurant) => (
                                <li key={restaurant.id} className="restaurant-item2" onClick={() => resDetailClick(restaurant.id)}>
                                    <img 
                                        src={searchTerm ? (restaurant.url && restaurant.url.length > 0 ? 
                                            restaurant.url[0] : "https://via.placeholder.com/200x150") : (
                                            restaurant.placeFiles[0]?.url || "https://via.placeholder.com/200x150")}
                                        alt={`${restaurant.name} 이미지`} 
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/200x150"; }} 
                                    />
                                    <div className="restaurant-details2">
                                        <h2>{restaurant.name}</h2>
                                        <p>{restaurant.comment}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='none-data'>검색 결과가 존재하지 않습니다.</p> 
                    )}

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
