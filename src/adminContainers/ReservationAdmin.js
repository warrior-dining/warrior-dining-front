import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/reservationManagement.css';

const host = "http://localhost:8080/api/admin/reservations/";

const ReservationAdmin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentStatusFilter, setCurrentStatusFilter] = useState('전체');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [expandedReservationId, setExpandedReservationId] = useState(null);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [status, setStatus] = useState([]);

    let url = host + `?page=${currentPage - 1}&size=5&status=${status}`; // currentPage - 1

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setData(res.data.data.content);
                setTotalPages(res.data.data.totalPages);
            })
            .catch(error => console.log(error));
    }, [currentPage]);

    useEffect(() => {
        renderReservations();
    }, [currentStatusFilter, data]); // searchQuery는 제외

    const renderReservations = () => {
        const filtered = data.filter(row => {
            // 상태 필터링
            if (currentStatusFilter !== '전체' && row.code.value !== currentStatusFilter) {
                return false;
            }
            // 검색 필터링
            if (searchQuery && !row.user.name.includes(searchQuery)) {
                return false;
            }
            return true;
        });
        setFilteredReservations(filtered);
    };

    const handleUpdateStatus = (id) => {
        const confirmCancel = window.confirm("예약을 취소하시겠습니까?");
        if (!confirmCancel) {
            return;
        }
        axios.patch(`${host}${id}`, { status: 14 })
            .then(res => {
                setData(prevData => prevData.map(item => 
                    item.id === id ? { ...item, code: { value: '취소' } } : item
                ));
                renderReservations();
            })
            .catch(error => {
                console.log('Axios error:', error);
            });
    };

    const filterReservations = (status) => {
        setCurrentStatusFilter(status);
        setCurrentPage(1); // 페이지를 1로 리셋
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const toggleDetails = (id) => {
        setExpandedReservationId(expandedReservationId === id ? null : id);
    };

    if (!data || data.length === 0) {
        return <div>Loading...</div>;
    }

    const getPaginationNumbers = () => {
        const maxPagesToShow = 5;
        const startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow);

        return Array.from({ length: endPage - startPage }, (_, index) => startPage + index);
    };

    const paginationNumbers = getPaginationNumbers();

    return (
        <main>
            <div className="container">
                <section className="reservation-list">
                    <h2 className="main-title">예약 목록</h2>
                    <div className="filter-search-container">
                        <div className="filter-buttons">
                            <button onClick={() => filterReservations('전체')}>전체</button>
                            <button onClick={() => filterReservations('확정')}>확정</button>
                            <button onClick={() => filterReservations('대기')}>대기</button>
                            <button onClick={() => filterReservations('취소')}>취소</button>
                            <button onClick={() => filterReservations('완료')}>완료</button>
                        </div>
                        <div className="reservation-search-bar">
                            <input type="text" id="search-input" placeholder="검색어를 입력하세요" onChange={handleSearch} />
                            <button onClick={renderReservations}>검색</button>
                        </div>
                    </div>
                    <div id="reservation-container">
                        {filteredReservations.map((row) => (
                            <div className="reservation-item" key={row.id} onClick={() => toggleDetails(row.id)} style={{ cursor: 'pointer' }}>
                                <h3>예약 ID: {row.id}</h3>
                                <p>
                                    고객 이름: {row.user.name}
                                    <span className={`status ${row.code.value}`}>{row.code.value}</span>
                                </p>
                                {row.code.value === '대기' && (
                                    <button className="cancel-button" onClick={(e) => { e.stopPropagation(); handleUpdateStatus(row.id); }}>
                                        예약 취소
                                    </button>
                                )}
                                <div className={`reservation-details ${expandedReservationId === row.id ? 'open' : ''}`}>
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
                        ))}
                    </div>
                    <div className="reservation-pagination">
                        <a href="#" onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(currentPage - 1); }}>이전</a>
                        {paginationNumbers.map((num) => (
                            <a key={num} href="#" className={num + 1 === currentPage ? "active" : ""} onClick={(e) => { e.preventDefault(); setCurrentPage(num + 1); }}>
                                {num + 1}
                            </a>
                        ))}
                        <a href="#" onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(currentPage + 1); }}>다음</a>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ReservationAdmin;
