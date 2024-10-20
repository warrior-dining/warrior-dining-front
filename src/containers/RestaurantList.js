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

const RestaurantSidebar = ({ onFilterChange }) => {
    return (
        <aside className="sidebar">
            <form action="">
                <h2>필터</h2>
                <h3>카테고리</h3>
                <select id="category" name="category" onChange={onFilterChange}>
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
                <select id="price" name="price" onChange={onFilterChange}>
                    <option value="none">가격 선택</option>
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
        isFetchingNextPage, // 새 페이지 로딩 중인지 확인
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
            const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
            const isBottom = scrollTop + clientHeight >= scrollHeight - 10;

            // 스크롤이 끝에 도달하고, 새로운 페이지를 로드 중이지 않으면 fetchNextPage 호출
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

    // 필터링 로직
    const filteredRestaurants = restaurants.filter((restaurant) => {
        const matchesCategory = categoryFilter === 'none' || restaurant.code.id === Number(categoryFilter);
        const matchesPrice = priceFilter === 'none' || restaurant.placeMenus.some(menu => {
            const price = menu.price;
            switch (priceFilter) {
                case 'low':
                    return price <= 20000;
                case 'medium':
                    return price > 20000 && price <= 50000;
                case 'high':
                    return price > 50000 && price <= 80000;
                case 'veryhigh':
                    return price > 80000 && price <= 110000;
                case 'superhigh':
                    return price > 110000;
                default:
                    return true;
            }
        });
        return matchesCategory && matchesPrice;
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        if (name === 'category') {
            setCategoryFilter(value);
        } else if (name === 'price') {
            setPriceFilter(value);
        }
    };

    return (
        <section className="restaurant-list-container">
            <div className="restaurant-wrapper">
                <RestaurantSidebar onFilterChange={handleFilterChange} />
                <div className="restaurant-list">
                    <h1>{searchTerm ? `검색 결과: ${searchTerm}` : '맛집 전체 리스트'}</h1>

                    {filteredRestaurants.length > 0 ? (
                        <ul>
                            {filteredRestaurants.map((restaurant) => (
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
