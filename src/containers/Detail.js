import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/default.css';
import '../css/detail.css';
import {useAuth, urlList} from '../context/AuthContext';
import axiosInstance from '../context/AxiosInstance';


const host = "http://localhost:8080/api/restaurant";

const Detail = () => {
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleMenus, setVisibleMenus] = useState(3); // 초기 보여줄 메뉴 개수
    const [visibleReviews, setVisibleReviews] = useState(3); // 초기 보여줄 리뷰 개수
    const [showMoreMenus, setShowMoreMenus] = useState(true); // 메뉴 더보기 상태
    const [showMoreReviews, setShowMoreReviews] = useState(true); // 리뷰 더보기 상태
    const { id } = useParams(); // URL에서 placeId 가져오기

    useEffect(() => {
        fetchRestaurantDetail();
    }, [id]);

    const fetchRestaurantDetail = async () => {
        try {
            const response = await fetch(`${host}/${id}`);
            const data = await response.json();

            if (data.content && data.content.length > 0) {
                setRestaurantDetail(data.content[0]); 
            } else {
                setRestaurantDetail(null); 
            }
        } catch (error) {
            console.error("Failed to fetch restaurant detail:", error);
        }
    };

    const handleOpenModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const loadMoreMenus = () => {
        const newVisibleMenus = visibleMenus + 3; // 3개씩 추가
        setVisibleMenus(newVisibleMenus);

        // 더보기 버튼 상태 업데이트
        if (newVisibleMenus >= restaurantDetail.placeMenus.length) {
            setShowMoreMenus(false); // 더 이상 데이터가 없으면 더보기 버튼 비활성화
        }
    };

    const loadMoreReviews = () => {
        const newVisibleReviews = visibleReviews + 3; // 3개씩 추가
        setVisibleReviews(newVisibleReviews);

        // 더보기 버튼 상태 업데이트
        if (newVisibleReviews >= restaurantDetail.reviews.length) {
            setShowMoreReviews(false); // 더 이상 데이터가 없으면 더보기 버튼 비활성화
        }
    };

    const toggleMenus = () => {
        setVisibleMenus(3); // 초기 상태로 되돌리기
        setShowMoreMenus(true); // 더보기 버튼 활성화
    };

    const toggleReviews = () => {
        setVisibleReviews(3); // 초기 상태로 되돌리기
        setShowMoreReviews(true); // 더보기 버튼 활성화
    };

    if (!restaurantDetail) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <RestaurantDetails restaurant={restaurantDetail} onOpenModal={handleOpenModal} />
            <MenuSection 
                menus={restaurantDetail.placeMenus} 
                visibleMenus={visibleMenus} 
                loadMoreMenus={loadMoreMenus} 
                showMoreMenus={showMoreMenus} 
                toggleMenus={toggleMenus} 
            />
            <ReviewsSection 
                reviews={restaurantDetail.reviews} 
                visibleReviews={visibleReviews} 
                loadMoreReviews={loadMoreReviews} 
                showMoreReviews={showMoreReviews} 
                toggleReviews={toggleReviews} 
            />
            {isModalOpen && <ReservationModal restaurant={restaurantDetail} onClose={handleCloseModal} />}
        </div>
    );
};

const RestaurantDetails = ({ restaurant, onOpenModal }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % restaurant.placeFiles.length
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            (prevIndex - 1 + restaurant.placeFiles.length) % restaurant.placeFiles.length
        );
    };

    return (
        <section className="restaurant-detail">
            <button className="slide-button prev" onClick={handlePrevImage}>
                &lt; {/* 왼쪽 화살표 */}
            </button>
            <div className="detailPage-image-container">
                <img 
                    src={restaurant.placeFiles[currentImageIndex]?.url} 
                    alt="레스토랑 이미지" 
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/1200x800"; 
                    }} 
                />
            </div>
            <div className="restaurant-info">
                <h1>{restaurant.name}</h1>
                <p>{restaurant.comment}</p>
                <button className="cta-button" onClick={onOpenModal}>예약하기</button>
            </div>
            <button className="slide-button next" onClick={handleNextImage}>
                &gt; {/* 오른쪽 화살표 */}
            </button>
        </section>
    );
};

const MenuSection = ({ menus, visibleMenus, loadMoreMenus, showMoreMenus, toggleMenus }) => (
    <section className="RD-menu-section">
        <h2 className="section-title">메뉴</h2>
        {menus.slice(0, visibleMenus).map(item => (
            <MenuItem key={item.id} item={item} />
        ))}
        {showMoreMenus && (
            <a className="more-link" onClick={loadMoreMenus}>
                메뉴 더보기
            </a>
        )}
        {visibleMenus > 3 && !showMoreMenus && (
            <a className="more-link" onClick={toggleMenus}>
                접기
            </a>
        )}
    </section>
);

const MenuItem = ({ item }) => (
    <div className="Detail-menu-item">
        <h3>{item.menu}</h3>
        <p>{item.price.toLocaleString()} 원</p> {/* 가격 포맷팅 */}
    </div>
);

const ReviewsSection = ({ reviews, visibleReviews, loadMoreReviews, showMoreReviews, toggleReviews }) => (
    <section className="RD-reviews-section">
        <h2 className="section-title">리뷰</h2>
        {reviews.slice(0, visibleReviews).map((review, index) => (
            <ReviewCard key={index} review={review} />
        ))}
        {showMoreReviews && (
            <a className="more-link" onClick={loadMoreReviews}>
                리뷰 더보기
            </a>
        )}
        {visibleReviews > 3 && !showMoreReviews && (
            <a className="more-link" onClick={toggleReviews}>
                접기
            </a>
        )}
    </section>
);

const ReviewCard = ({ review }) => (
    <div className="RD-review-card">
        <div className="RD-review-content">
            <img src="https://via.placeholder.com/60" alt="리뷰어 사진" />
            <div>
                <p className="reviewer-name">{review.user.name}</p>
                <p className="review-text">{review.content}</p>
            </div>
        </div>
    </div>
);

const ReservationModal = ({restaurant ,onClose }) => {
    return (
    <div className="modal" style={{ display: 'flex' }}>
        <div className="modal-content">
            <button className="modal-close" onClick={onClose}>&times;</button>
            <h1>레스토랑 예약</h1>
            <ReservationForm restaurant={restaurant}/>
        </div>
    </div>
    );
};

const ReservationForm = ({ restaurant }) => {
    const restaurantData = restaurant;
    const [reservationDate, setReservationDate] = useState(null);
    const [reservationTime, setReservationTime] = useState(null);
    const [count, setCount] = useState(1);
    const [orderNote, setOrderNote] = useState('');
    const {sub} = useAuth();

    const [startHours, startMinutes] = restaurantData.startTime.split(':').map(Number);
    const [endHours, endMinutes] = restaurantData.endTime.split(':').map(Number);
    const timeOptions = [];
    const startInMinutes = startHours * 60 + startMinutes;
    const endInMinutes = endHours * 60 + endMinutes;

    for (let time = startInMinutes; time <= endInMinutes; time += 30) {
        const hours = String(Math.floor(time / 60)).padStart(2, '0');
        const minutes = String(time % 60).padStart(2, '0');
        timeOptions.push(`${hours}:${minutes}`); // 'HH:mm' 형식으로 변환
    }

    const getMinMaxDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}`;

        // 최대 날짜 설정 (현재 날짜 + 7일)
        today.setDate(today.getDate() + 30);
        const maxYear = today.getFullYear();
        const maxMonth = String(today.getMonth() + 1).padStart(2, '0');
        const maxDay = String(today.getDate()).padStart(2, '0');
        const maxDate = `${maxYear}-${maxMonth}-${maxDay}`;

        return { minDate, maxDate };
    };

    const { minDate, maxDate } = getMinMaxDate();

    const submitEvent = (e) => {
        e.preventDefault();
        const test = urlList("/api/member/reservation/");
        const reservationData = {
            userEmail : sub,
            placeId : restaurantData.id,
            reservationDate : reservationDate,
            reservationTime : reservationDate + " " + reservationTime,
            count : count,
            orderNote : orderNote
        }
        console.log(reservationData);
        axiosInstance.post(test.baseURL + test.url, reservationData , test.headers )
            .then(res => {
                alert("성공");
            }).catch(error => alert(error));
    };

    return (
        <form onSubmit={submitEvent}>
            <div className="form-group date-time-group">
                <div className="form-group half">
                    <label htmlFor="date">예약 날짜</label>
                    <input type="date" id="date" name="date" min={minDate} max={maxDate} onChange={(e)=> setReservationDate(e.target.value)} required />
                </div>
                <div className="form-group half">
                    <label htmlFor="time">예약 시간</label>
                    <select id="time" name="time" onChange={(e) => setReservationTime(e.target.value)} required>
                            <option>선택하세요.</option>
                        {timeOptions.map((row, index) => (
                            <option key={index} value={row}>{row}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="guests">인원 수</label>
                <select id="guests" name="guests" onChange={e=> setCount(e.target.value)} required>
                    {[...Array(10)].map((_, index) => (
                        <option key={index} value={index + 1}>{index + 1}명</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="special-requests">요청 사항</label>
                <textarea id="special-requests" name="special-requests" rows="4" onChange={e=> setOrderNote(e.target.value)}></textarea>
            </div>
            <div className="form-group">
                <button type="submit" style={{ float: 'right' }}>예약 확인</button>
            </div>
        </form>
    );
};

export default Detail;
