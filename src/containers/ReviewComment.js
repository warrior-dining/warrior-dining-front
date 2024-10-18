import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import '../css/default.css';
import '../css/home.css';
import '../css/reviewCreate.css';


const host = "http://localhost:8080/api/member/reviews/reservation/"
const ReviewComment = () => {
    const [rating, setRating] = useState(null);
        const [review, setReview] = useState('');
        const navigate = useNavigate(); 
        const {id} = useParams();
        const reservationId = Number(id);
        const [data, setData] = useState([]);
    useEffect(()=> {
        if (reservationId) {
            const url = host + reservationId;
            axios.get(url) // 여기가 예약 정보를 가져오는 부분
                .then(res => {
                    setData(res.data.results); // 예약 정보 상태에 저장
                })
                .catch(error => console.log(error));
        }
    }, [reservationId]);

        const handleRatingClick = (value) => {
            if (rating === value) {
            setRating(null); 
            } else {
            setRating(value); 
            }
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            const createData = { rating, review };
    
            // 예약 정보도 함께 전송할 필요가 있다면, 아래와 같이 요청을 보낼 수 있습니다.
            axios.post(host + reservationId, createData)
                .then(res => {
                    // 성공 후 페이지 이동
                    navigate('/mypage/reservationlist');
                })
                .catch(error => console.log(error));
        };
            
        if (!data) {
            return <div>Loading...</div>; // 데이터가 로드되기 전까지 로딩 메시지 표시
        }
    return (
        <>
            <main className="container">
                <div className="review-form-container">
                <h3>리뷰 작성하기</h3>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="restaurant-name" id="restaurant-name-label"> {data.place && data.place.name ? data.place.name : "음식점 이름을 불러오는 중입니다..."}</label>
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
