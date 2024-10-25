import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth, refreshToken} from '../context/AuthContext';
import '../css/default.css';
import '../css/mypageMutual.css';
import '../css/myReview.css';
import MypageSidebar from "../components/MypageSidebar";
import axiosInstance from "../context/AxiosInstance";


const MypageReviewlist = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize]  = useState(5);
    const [reload, setReload] = useState(true);
    const {reissueToken} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
        await axiosInstance.get(`/api/member/reviews/?page=${page}&size=${pageSize}`)
            .then(res => {
            refreshToken(reissueToken);
            setData(res.data.results.content);
            setTotalPages(res.data.results.totalPages); 
            })
            .catch(error => console.log(error));
        }
        fetchData();
     }, [page, pageSize, reload])

    const getStars = (rating) => {
      const starCount = parseInt(rating, 10); 
      let stars = '';
      for (let i = 0; i < 5; i++) {
          stars += i < starCount ? '★' : '☆'; 
      }
      return stars;
  };

      const confirmDelete = (id) => {
        if (window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
          alert(`리뷰가 삭제되었습니다`); 
          
        }
      };

      const handleUpdateStatus = (id) => {
        setData(prevData => prevData.map(item =>
            item.id === id ? {...item, isDeleted: true} : item
        ));
        confirmDelete();
        axiosInstance.patch(`/api/member/reviews/${id}`)
            .then(res => {
                setReload(!reload);
            })
            .catch(error => console.log(error));
    };

      const handleEdit = (id) => {
        navigate(`/mypage/reviewEdit/${id}`); 
      };

      const getPaginationNumbers = () => {
        const maxPagesToShow = 5;
        const startPage = Math.max(0, page - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow);

        return Array.from({ length: endPage - startPage }, (_, index) => startPage + index);
    };

    const paginationNumbers = getPaginationNumbers();

    return(
        <>
    <main className="mypage-container">
        <MypageSidebar />
        <div className="content">
            <section className="myReview">
            <h1>리뷰 관리</h1>
            <div className="review-list">
                {data.map((review) => (
                <div className="review-item-container" key={review.id}>
                    <div className="review-item">
                    <h2>{review.place.name}</h2>
                    <p>별점: {getStars(review.rating)}</p>
                    <p>작성일: {review.createdAt}</p>
                    <p>리뷰 내용: {review.content}</p>
                    <button className="edit-review-button" onClick={() => handleEdit(review.id)}>수정</button>
                    {review.status === '0' ? '1' :
                    <button className="delete-review-button" 
                        style={{display: review.deleted ? 'none' : ''}}
                        onClick={(e) => {
                            handleUpdateStatus(review.id)
                        }}>삭제</button>
                    }
                    </div>
                </div>
                ))}
            </div>
            <div className="message">
                {data.length === 0 && ( 
                    <p>작성된 리뷰가 없습니다.</p> )}
            </div>
            </section>
            <div className="review-pagination-container">
                <div className="review-pagination">
                    <a href="#"
                        onClick={(e) => {
                        e.preventDefault();
                            if (page > 0) { setPage(page - 1); }
                        }}
                    disabled={page === 0}> 이전 </a>
                    {paginationNumbers.map((num) => (
                        <a key={num} href="#" className={num === page ? "active" : ""}
                            onClick={(e) => {
                            e.preventDefault();
                            setPage(num);
                        }}> {num + 1} </a>
                    ))}
                    <a href="#"
                        onClick={(e) => {
                        e.preventDefault();
                        if (page < totalPages - 1) { setPage(page + 1); }
                    }}
                    disabled={page >= totalPages - 1}> 다음 </a>
                </div>
            </div>    
        </div>
    </main>
        </>
    );
}

export default MypageReviewlist;
