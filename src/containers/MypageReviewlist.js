import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/default.css';
import '../css/mypageMutual.css';
import '../css/myReview.css';
import MypageSidebar from "../components/MypageSidebar";

const MypageReviewlist = () => {
    const navigate = useNavigate();

    const reviews = [
        {
          id: 1,
          restaurantName: '레스토랑 A',
          rating: 4.5,
          date: '2024-08-21',
          content: '음식이 맛있었고 서비스도 훌륭했습니다. 분위기가 아쉬웠지만 전반적으로 만족스러웠습니다.'
        },
        {
          id: 2,
          restaurantName: '레스토랑 B',
          rating: 3.8,
          date: '2024-08-15',
          content: '가격이 조금 비쌌지만 음식은 괜찮았습니다. 서비스는 개선이 필요합니다.'
        },
        {
          id: 3,
          restaurantName: '레스토랑 C',
          rating: 5.0,
          date: '2024-08-10',
          content: '최고의 경험이었습니다. 모든 것이 완벽했습니다.'
        }
      ];

      const confirmDelete = (id) => {
        if (window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
          alert(`리뷰가 삭제되었습니다`); 
          
        }
      };
    
      const handleEdit = () => {
        navigate(`/mypage/reviewEdit`); 
      };

    return(
        <>
    <main className="mypage-container">
        <MypageSidebar />
        <div className="content">
            <section id="myReview">
            <h1>리뷰 관리</h1>
            <div className="review-list">
                {reviews.map((review) => (
                <div className="review-item-container" key={review.id}>
                    <div className="review-item">
                    <h2>{review.restaurantName}</h2>
                    <p>별점: {'★'.repeat(Math.floor(review.rating))}{review.rating % 1 !== 0 ? '☆' : ''} ({review.rating})</p>
                    <p>작성일: {review.date}</p>
                    <p>리뷰 내용: {review.content}</p>
                    <button className="edit-review-button" onClick={() => handleEdit(review.id)}>수정</button>
                    <button className="delete-review-button" onClick={() => confirmDelete(review.id)}>삭제</button>
                    </div>
                </div>
                ))}
            </div>
            </section>
        </div>
    </main>
        </>
    );
}

export default MypageReviewlist;
