import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../css/default.css';
import '../css/home.css';
import '../css/reviewCreate.css';

const ReviewComment = () => {
    const [rating, setRating] = useState(null);
        const [review, setReview] = useState('');
        const navigate = useNavigate(); 

        const handleRatingClick = (value) => {
            if (rating === value) {
            setRating(null); 
            } else {
            setRating(value); 
            }
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('레스토랑 이름:', '레스토랑 이름'); 
            console.log('별점:', rating);
            console.log('리뷰:', review);
            
            // 제출 후 다른 페이지로 이동 (레스토랑 리뷰 페이지 생성후 주소값 입력)
            navigate('/');
  };

    return (
        <>
            <main className="container">
                <div className="review-form-container">
                <h3>리뷰 작성하기</h3>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="restaurant-name" id="restaurant-name-label">레스토랑 이름</label>
                </div>

                <div className="form-group">
                    <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <React.Fragment key={value}>
                        <input
                            type="radio"
                            id={`star${value}`}
                            name="rating"
                            value={value}
                            checked={rating === value}
                            onChange={() => handleRatingClick(value)}
                        />
                        <label
                            htmlFor={`star${value}`}
                            data-value={value}
                            className={rating >= value ? 'selected' : ''}
                            onClick={() => handleRatingClick(value)}
                        >
                            &#9733;
                        </label>
                        </React.Fragment>
                    ))}
                    </div>
                </div>

                <div className="form-group">
                    <textarea
                    id="review"
                    name="review"
                    rows="10"
                    placeholder="리뷰를 작성하세요"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                    ></textarea>
                </div>

                <div className="form-group">
                    <button type="button" onClick={() => navigate('/mypage/reservationlist')}>취소</button>
                    <button type="submit">제출</button>
                </div>
                </form>
            </div>
        </main>
        </>
    );
}

export default ReviewComment;
