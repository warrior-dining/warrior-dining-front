import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../css/default.css';
import '../css/home.css';
import '../css/restaurantList.css';

const fetchRestaurants = async ({ pageParam = 0, queryKey }) => {
    const [, search, category, price] = queryKey;
    let endpoint = search ? `/search?keyword=${encodeURIComponent(search)}&page=${pageParam}` : `?page=${pageParam}`;
    
    if (category && category !== 'none') {
        endpoint += `&categoryId=${category}`;
    }
    
    if (price && price !== 'none') {
        const [minPrice, maxPrice] = getPriceRange(price);
        if (minPrice !== null) endpoint += `&minPrice=${minPrice}`;
        if (maxPrice !== null) endpoint += `&maxPrice=${maxPrice}`;
    }

    try {
        const response = await axios.get(`/api/restaurant${endpoint}`);
        return response.data;
    } catch (error) {
        throw new Error(`서버 연결 불가능: ${error.response?.status || error.message}`); // 오류처리
    }
};

// 가격대에 따라 minPrice와 maxPrice를 반환하는 함수
const getPriceRange = (priceFilter) => {
    switch (priceFilter) {
        case 'low':
            return [0, 20000];
        case 'medium':
            return [20001, 50000];
        case 'high':
            return [50001, 80000];
        case 'veryhigh':
            return [80001, 110000];
        case 'superhigh':
            return [110001, 999999];
        default:
            return [null, null];
    }
};

const RestaurantSidebar = ({ onFilterChange, onReset, categoryFilter, priceFilter }) => {
    return (
        <aside className="sidebar">
            <form action="">
                <h2>필터</h2>
                <h3>카테고리</h3>
                <select id="category" name="category" value={categoryFilter} onChange={onFilterChange}>
                    <option value="none">카테고리 선택</option>
                    <option value="5">한식</option>
                    <option value="6">중식</option>
                    <option value="7">일식</option>
                    <option value="8">양식</option>
                    <option value="9">분식</option>
                    <option value="10">아시안</option>
                    <option value="11">기타</option>
                </select>
                <h3>가격대</h3>
                <select id="price" name="price" value={priceFilter} onChange={onFilterChange}>
                    <option value="none">가격 선택</option>
                    <option value="low">20,000원 이하</option>
                    <option value="medium">20,000 ~ 50,000원</option>
                    <option value="high">50,000 ~ 80,000원</option>
                    <option value="veryhigh">80,000 ~ 110,000원</option>
                    <option value="superhigh">110,000원 이상</option>
                </select>
                <button type="button" onClick={onReset} className="reset-button">
                    <FontAwesomeIcon icon={faArrowRotateLeft} /> 초기화
                </button>
            </form>
        </aside>
    );
};

const RestaurantList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';

    // 카테고리 및 가격 필터 상태를 정의
    const [categoryFilter, setCategoryFilter] = useState('none');
    const [priceFilter, setPriceFilter] = useState('none');
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
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['restaurants', searchTerm, categoryFilter, priceFilter],
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
            const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
            const isBottom = scrollTop + clientHeight >= scrollHeight - 10;

            if (isBottom && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const restaurants = data?.pages.flatMap(page => page.content) || [];

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        if (name === 'category') {
            setCategoryFilter(value);
        } else if (name === 'price') {
            setPriceFilter(value);
        }
        fetchNextPage();
    };

    const handleReset = () => {
        setCategoryFilter('none');
        setPriceFilter('none');
        navigate('/restaurantlist');
    };

    return (
        <section className="restaurant-list-container">
            <div className="restaurant-wrapper">
                <RestaurantSidebar 
                    onFilterChange={handleFilterChange} 
                    onReset={handleReset} 
                    categoryFilter={categoryFilter} 
                    priceFilter={priceFilter} 
                />
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

                    {isFetchingNextPage && <p>Loading more...</p>}
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
