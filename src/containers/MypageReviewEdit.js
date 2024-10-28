import React, {useEffect, useState} from 'react';
import axiosInstance from '../context/AxiosInstance';
import '../css/default.css';
import '../css/home.css';
import '../css/reviewCreate.css';
import {useNavigate, useParams} from 'react-router-dom';

const MypageReviewEdit = () => {
    const [rating, setRating] = useState();
    const [review, setReview] = useState('');
    const [data, setData] = useState([]);
    const {id} = useParams();
    const reviewId = Number(id);
    const navigate = useNavigate();


    useEffect(() => {
        axiosInstance.get(`/api/user/reviews/${reviewId}`)
            .then(res => {
                setData(res.data.results);
                setReview(res.data.results.content);
                setRating(res.data.results.rating);
            })
            .catch(error => console.log(error));
    }, [reviewId]);

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateData = {"rating": rating, "review": review}
        axiosInstance.put(`/api/user/reviews/${reviewId}`, updateData)
            .then(res => {
                alert("리뷰가 수정 되었습니다.")
                navigate('/mypage/reviewlist');
            })
            .catch(error => console.log(error));
    };

    const handleUpdateStatus = (id) => {
        axiosInstance.delete(`/api/user/reviews/${reviewId}`)
            .then(res => {
                window.location.reload();
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            <main className="container">
                <div className="review-form-container">
                    <h3>리뷰 수정하기</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="reviewId" value="12345"/>
                        <div className="form-group">
                            <label htmlFor="restaurant-name" id="restaurant-name-label">
                                {data.placeName}
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
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
            ></textarea>
                        </div>

                        <div className="form-group buttons">
                            <button type="submit">수정</button>
                            {data.status === '0' ? '1' : (
                                <button type="button"
                                        style={{display: data.deleted ? 'none' : ''}}
                                        onClick={(e) => {
                                            handleUpdateStatus(data.id);
                                        }}>삭제</button>
                            )}
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default MypageReviewEdit;
