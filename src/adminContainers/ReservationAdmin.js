import '../css/reservationManagement.css';
import React, {useEffect, useRef, useState} from "react";
import axiosInstance from "../context/AxiosInstance";
import {refreshToken, useAuth} from "../context/AuthContext";

const ReservationAdmin = () => {
    const [sortType, setSortType] = useState('');
    const [expandedReservationId, setExpandedReservationId] = useState(null);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const searchKeywordRef = useRef('');
    const [searchType, setSearchType] = useState('id');
    const [searchKeyword, setSearchKeyword] = useState('');
    const {reissueToken} = useAuth();

    useEffect(() => {
        axiosInstance.get(`/api/admin/reservations/?page=${page}&size=${pageSize}&status=${sortType}&type=${searchType}&keyword=${searchKeyword}`)
            .then(res => {
                refreshToken(res.data, reissueToken);
                setData(res.data.results.content);
                setTotalPages(res.data.results.totalPages);
            })
            .catch(error => console.log(error));
    }, [page, pageSize, sortType, searchKeyword]);

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

    const searchEvent = (e) => {
        e.preventDefault();
        if (searchKeyword === null) {
            alert("검색어를 입력하세요.");
            return;
        }
        setPage(0);
        setSearchKeyword(searchKeywordRef.current.value);
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
                            <button onClick={() => setSortType('')}>전체</button>
                            <button onClick={() => setSortType('15')}>확정</button>
                            <button onClick={() => setSortType('14')}>대기</button>
                            <button onClick={() => setSortType('13')}>취소</button>
                            <button onClick={() => setSortType('12')}>완료</button>
                        </div>
                        <form onSubmit={searchEvent}>
                            <div className="reservation-search-bar">
                                <select value={searchType} onChange={(e) => {
                                    setSearchType(e.target.value)
                                }}>
                                    <option value="id">예약번호</option>
                                    <option value="name">예약자 이름</option>
                                    <option value="place">식당</option>
                                </select>
                                <input type="text" id="search-input" placeholder="검색어를 입력하세요" ref={searchKeywordRef}/>
                                <button type="submit">검색</button>
                            </div>
                        </form>
                    </div>
                    <div className="reservation-container">
                        {data.length === 0 ? (
                            <div></div>
                        ) : (
                            data.map((row) => (
                                <div className="reservation-item" key={row.id} onClick={() => toggleDetails(row.id)}>
                                    <h3>예약 ID: {row.id}</h3>
                                    <p>
                                        고객 이름: {row.user.name}
                                        <span className={`status ${row.code.value}`}>{row.code.value}</span>
                                    </p>
                                    {row.code.value === '대기' && (
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
                                                <p>식당: {row.place.name} </p>
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

export default ReservationAdmin;
