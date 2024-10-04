import React, { useState } from 'react';
import '../css/default.css';
import '../css/detail.css';

const menuItems = [
    { id: 1, title: '메뉴 아이템 1', description: '이 메뉴 아이템은 최고의 재료로 준비된 요리입니다. 맛과 품질이 뛰어납니다.' },
    { id: 2, title: '메뉴 아이템 2', description: '다양한 맛을 느낄 수 있는 메뉴로, 고객의 입맛을 만족시킬 수 있습니다.' },
    { id: 3, title: '메뉴 아이템 3', description: '세심하게 조리된 요리로, 고급스러운 맛을 제공합니다.' },
];

const reviews = [
    { id: 1, name: '홍길동', text: '정말 훌륭한 경험이었습니다. 음식이 맛있고 서비스가 친절했습니다. 다음에 또 오고 싶어요.' },
    { id: 2, name: '김철수', text: '분위기가 정말 좋았고, 음식이 신선하고 맛있었습니다. 추천합니다.' },
    { id: 3, name: '이영희', text: '따뜻한 분위기, 친절한 서비스가 인상 깊었습니다. 다시 가고 싶습니다.' },
];

const Detail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <RestaurantDetails onOpenModal={handleOpenModal} />
            <MenuSection />
            <ReviewsSection />
            {isModalOpen && <ReservationModal onClose={handleCloseModal} />}
        </div>
    );
};

const RestaurantDetails = ({ onOpenModal }) => (
    <section className="restaurant-detail">
        <img src="https://via.placeholder.com/1200x800" alt="레스토랑 이미지" />
        <div className="restaurant-info">
            <h1>레스토랑 이름 1</h1>
            <p>이곳은 맛있는 음식을 제공하는 최고의 레스토랑입니다. 정통 요리와 현대적인 분위기가 어우러지는 장소입니다.</p>
            <button className="cta-button" onClick={onOpenModal}>예약하기</button>
        </div>
    </section>
);

const MenuSection = () => (
    <section className="RD-menu-section">
        <h2 className="section-title">메뉴</h2>
        {menuItems.map(item => (
            <MenuItem key={item.id} item={item} />
        ))}
        <a href="#" className="more-link">메뉴 더보기</a>
    </section>
);

const MenuItem = ({ item }) => (
    <div className="Detail-menu-item">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
    </div>
);

const ReviewsSection = () => (
    <section className="RD-reviews-section">
        <h2 className="section-title">리뷰</h2>
        {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
        ))}
        <a href="#" className="more-link">리뷰 더보기</a>
    </section>
);

const ReviewCard = ({ review }) => (
    <div className="RD-review-card">
        <div className="RD-review-content">
            <img src="https://via.placeholder.com/60" alt="리뷰어 사진" />
            <div>
                <p className="reviewer-name">{review.name}</p>
                <p className="review-text">{review.text}</p>
            </div>
        </div>
    </div>
);

const ReservationModal = ({ onClose }) => (
    <div className="modal" style={{ display: 'flex' }}>
        <div className="modal-content">
            <button className="modal-close" onClick={onClose}>&times;</button>
            <h1>레스토랑 예약</h1>
            <ReservationForm />
        </div>
    </div>
);

const ReservationForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // 예약 처리 로직 추가
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group date-time-group">
                <div className="form-group half">
                    <label htmlFor="date">예약 날짜</label>
                    <input type="date" id="date" name="date" required />
                </div>
                <div className="form-group half">
                    <label htmlFor="time">예약 시간</label>
                    <select id="time" name="time" required>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="guests">인원 수</label>
                <select id="guests" name="guests" required>
                    {[...Array(10)].map((_, index) => (
                        <option key={index} value={index + 1}>{index + 1}명</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="special-requests">요청 사항</label>
                <textarea id="special-requests" name="special-requests" rows="4"></textarea>
            </div>
            <div className="form-group">
                <button type="submit" style={{ float: 'right' }}>예약 확인</button>
            </div>
        </form>
    );
};

export default Detail;
