import React, { useState, useEffect } from 'react';
import '../css/default.css';
import '../css/home.css';
import '../css/reviewCreate.css';

const MypageReviewEdit = () => {
    const [rating, setRating] = useState(3); 
    const [review, setReview] = useState(''); 

    useEffect(() => {
       
        updateSelection(rating);
    }, [rating]);

    const handleRatingClick = (value) => {
        
        setRating(rating === value ? null : value);
    };

    const updateSelection = (selectedValue) => {
        const labels = document.querySelectorAll('.star-rating label');
        labels.forEach((label) => {
        const value = label.dataset.value;
        if (value <= selectedValue) {
            label.classList.add('selected');
        } else {
            label.classList.remove('selected');
        }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
    console.log({ reviewId: 12345, rating, review });
    };
    return (
        <>
        <main className="container">
      <div className="review-form-container">
        <h3>리뷰 수정하기</h3>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="reviewId" value="12345" />
          <div className="form-group">
            <label htmlFor="restaurant-name" id="restaurant-name-label">
              레스토랑 이름
            </label>
          </div>

          <div className="form-group">
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    id={`star${star}`}
                    name="rating"
                    value={star}
                    checked={rating === star}
                    onChange={() => setRating(star)}
                  />
                  <label
                    htmlFor={`star${star}`}
                    data-value={star}
                    className={rating >= star ? 'selected' : ''}
                    onClick={() => handleRatingClick(star)}
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

          <div className="form-group buttons">
            <button type="submit">수정</button>
            <button type="button">삭제</button>
          </div>
        </form>
      </div>
    </main>
        </>
    );
}

export default MypageReviewEdit;
