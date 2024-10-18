import React, {useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/mypageMutual.css';
import '../css/default.css';
import '../css/myPageReservationList.css';
import MypageSidebar from "../components/MypageSidebar";
import axios from "axios";

const host = "http://localhost:8080/api/member/reservation/"

const ReservationList = () => {
    const {sub} = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [reservationId, setReservationId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let url = `${host}?email=${sub}&page=${page}&size=${pageSize}`
            axios.get(url)
                .then(res => {
                    setData( res.data.status ? res.data.results.content : [] );
                    setTotalPages(res.data.status ? res.data.results.totalPages : 0);
                })
                .catch(error => console.log(error))
                .finally(() => {
                    setLoading(false);
                })
        };
        fetchData();
    }, [page, pageSize]);

    const bookMark = (placeId) => {
        axios.put("http://localhost:8080/api/member/bookmarks/", {"email": sub, "placeId": placeId})
            .then(res => {
                alert("즐겨찾기 등록 완료");
                navigate("/mypage/bookmark");
            })
            .catch(error => console.log(error));
    }
    const getPaginationNumbers = () => {
        const maxPagesToShow = 5;
        const startPage = Math.max(0, page - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow);

        return Array.from({ length: endPage - startPage }, (_, index) => startPage + index);
    };

    const paginationNumbers = getPaginationNumbers();

    return (
        <main className="mypage-container">
            <MypageSidebar />
            <section id="orders">
                <h1>예약 내역</h1>
                <div className="myorder-list">
                    {data.map((row) => (
                        <div className="myorder-item" key={row.id}>
                            <div className="reservation-info">
                                <h2 className="reservation-number">예약 번호: {row.id}</h2>
                                <p className="reservation-date">예약일: {row.reservationDate}</p>
                                <p className="reservation-status">상태: {row.reservationStatus}</p>
                                <ul className="myreservation-details">
                                    <li>음식점 : {row.placeName}</li>
                                    <li>인원 수 : {row.count}명</li>
                                    <li>예약 시간 : {row.reservationTime}</li>
                                    <li>특별 요청 : {row.orderNote}</li>
                                </ul>
                                {row.reservationStatus === "대기" ?
                                    <button
                                        className="myreservationList-button"
                                        onClick={() => navigate(`/mypage/reservationdetail/`)}> 예약 수정/취소 </button>
                                    : ""
                                }
                                {row.reservationStatus === "완료" ? (
                                 row.reviewExists ? (  // 리뷰 작성 여부에 따라 버튼 텍스트 변경
                                    <button className="myreservationList-button" disabled> 리뷰 작성 완료 </button>
                                ) : (
                                <button
                                    className="myreservationList-button"
                                    onClick={() => navigate(`/reviewcomment/${row.id}`)}> 리뷰 작성하기 </button>
                                     )) : null}
                                {row.reservationStatus === "완료" && !row.bookMark ?
                                    <button
                                        className="myreservationList-button"
                                        onClick={() => { bookMark(row.placeId);}}> 즐겨찾기 등록 </button>
                                    : ""
                                }
                            </div>
                        </div>
                    ))}
                    <div className="reservation-pagination-container">
                        <div className="reservation-pagination">
                            <a href="#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   if (page > 0) {
                                       setPage(page - 1);
                                   }
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
                                   if (page < totalPages - 1) {
                                       setPage(page + 1);
                                   }
                               }}
                               disabled={page >= totalPages - 1}> 다음 </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ReservationList;
