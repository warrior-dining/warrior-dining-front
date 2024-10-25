import '../css/reservationManagement.css';
import React, {useEffect, useState} from "react";
import axiosInstance from "../context/AxiosInstance";
import {refreshToken, useAuth} from "../context/AuthContext";

const ReservationOwner = () => {
    const [sortType, setSortType] = useState('');
    const [expandedReservationId, setExpandedReservationId] = useState(null);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const {reissueToken} = useAuth();

    useEffect(() => {
        axiosInstance.get(`/api/owner?status=${sortType}&page=${page}&size=${pageSize}`)
            .then(res => {
                refreshToken(res.data, reissueToken);
                setData(res.data.results.content);
                setTotalPages(res.data.results.totalPages);

            })
            .catch(error => console.log(error));
    }, [page, pageSize, sortType]);

    const handleUpdateStatus = (id) => {
        const confirmCancel = window.confirm("예약을 취소하시겠습니까?");
        if (!confirmCancel) {
            return;
        }
        axiosInstance.patch(`/api/admin/reservations/${id}`, {status: 14})
            .then(res => {
                alert("예약이 정상적으로 취소되었습니다.")
                setSortType('13');
            })
            .catch(error => {
                console.log('Axios error:', error);
            });
    };

    const toggleDetails = (id) => {
        setExpandedReservationId(expandedReservationId === id ? null : id);
    };

    const getPaginationNumbers = () => {
        const maxPagesToShow = 5;
        const startPage = Math.max(0, page - Math.floor(maxPagesToShow));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow);

        return Array.from({length: endPage - startPage}, (_, index) => startPage + index);
    };

    const paginationNumbers = getPaginationNumbers();

    return (
        <main>
            <div className="container">
                <section className="reservation-list">
                    <h2 className="main-title">예약 목록</h2>
                    <div className="filter-search-container">
                        <div className="filter-buttons">
                            <button onClick={() => { setPage(0); setSortType('')}}>전체</button>
                            <button onClick={() => { setPage(0); setSortType('15')}}>확정</button>
                            <button onClick={() => { setPage(0); setSortType('14')}}>대기</button>
                            <button onClick={() => { setPage(0); setSortType('13')}}>취소</button>
                            <button onClick={() => { setPage(0); setSortType('12')}}>완료</button>
                        </div>

                    </div>
                    <div className="reservation-container">
                        {data.length === 0 ? (
                            <div></div>
                        ) : (
                            data.map((row) => (
                                <div className="reservation-item" key={row.id} onClick={() => toggleDetails(row.id)}>
                                    <h3>예약 ID: {row.id}</h3>
                                    <p>
                                        고객 이름: {row.userName}
                                        <span className={`status ${row.reservationStatus}`}>{row.reservationStatus}</span>
                                    </p>
                                    {row.reservationStatus === '대기' && (
                                        <button className="cancel-button" onClick={(e) => {
                                            e.stopPropagation();
                                            handleUpdateStatus(row.id);
                                        }}>
                                            예약 취소
                                        </button>
                                    )}
                                    <div
                                        className={`reservation-details ${expandedReservationId === row.id ? 'open' : ''}`}>
                                        {expandedReservationId === row.id && (
                                            <>
                                                <p>예약 날짜: {row.reservationDate}</p>
                                                <p>예약 시간: {row.reservationTime}</p>
                                                <p>요청사항: {row.orderNote}</p>
                                                <p>인원: {row.count}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
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
                </section>
            </div>
        </main>
    );
};

export default ReservationOwner;
