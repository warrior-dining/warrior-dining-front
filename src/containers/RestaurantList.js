import React, { useEffect, useState } from 'react';
import '../css/default.css';
import '../css/home.css';
import '../css/restaurantList.css';
import { useNavigate } from 'react-router-dom';

const restaurants = [
    { id: 1, name: '레스토랑 이름 1', description: '이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다. 분위기와 서비스가 뛰어나며, 특별한 날에 방문하기 좋은 장소입니다.',link: '/restaurant/detail' },
    { id: 2, name: '레스토랑 이름 2', description: '훌륭한 분위기와 맛있는 요리를 제공합니다.' ,link: '/restaurant/detail'  },
    { id: 3, name: '레스토랑 이름 3', description: '특별한 날에 적합한 멋진 장소입니다.' ,link: '/restaurant/detail'  },
    { id: 4, name: '레스토랑 이름 4', description: '정통 요리와 현대적인 분위기가 어우러집니다.' ,link: '/restaurant/detail'  },
    { id: 5, name: '레스토랑 이름 5', description: '신선한 재료로 만든 요리가 매력적입니다.' ,link: '/restaurant/detail'  },
    { id: 6, name: '레스토랑 이름 6', description: '신선한 재료로 만든 요리가 매력적입니다.' ,link: '/restaurant/detail'  },
    { id: 7, name: '레스토랑 이름 7', description: '신선한 재료로 만든 요리가 매력적입니다.' ,link: '/restaurant/detail'  },
    { id: 8, name: '레스토랑 이름 8', description: '신선한 재료로 만든 요리가 매력적입니다.'  ,link: '/restaurant/detail' },
    // Add more restaurant objects as needed
];



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
        if (window.scrollY > 300) { 
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    const resDetailClick = () => {
        navigate(`/restaurant/detail`)
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                        {restaurants.map((restaurant) => (
                            <li key={restaurant.id} className="restaurant-item2" data-id={restaurant.id} onClick={resDetailClick}>
                                <img src="https://via.placeholder.com/200x150" alt="레스토랑 이미지" />
                                <div className="restaurant-details2">
                                    <h2>{restaurant.name}</h2>

                                    <p>{restaurant.description}</p>
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
