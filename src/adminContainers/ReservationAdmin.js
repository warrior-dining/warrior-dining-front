import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/reservationManagement.css';

const host = "http://localhost:8080/api/admin/reservations/";
const ReservationAdmin = () => {
//     const [reservations, setReservations] = useState([
//         { id: '0001', restaurant: '맛있는 식당', customer: '홍길동', date: '2024-08-20', time: '18:00', guests: '4명', status: '확정' },
//         { id: '0002', restaurant: '즐거운 레스토랑', customer: '김영희', date: '2024-08-21', time: '19:00', guests: '2명', status: '확정' },
//         { id: '0003', restaurant: '멋진 카페', customer: '이철수', date: '2024-08-22', time: '15:00', guests: '3명', status: '대기' },
//         { id: '0004', restaurant: '멋진 카페', customer: '이철수', date: '2024-08-22', time: '15:00', guests: '3명', status: '대기' },
//         { id: '0005', restaurant: '멋진 카페', customer: '이철수', date: '2024-08-22', time: '15:00', guests: '3명', status: '대기' },
//         { id: '0006', restaurant: '멋진 카페', customer: '이철수', date: '2024-08-22', time: '15:00', guests: '3명', status: '대기' },
//         { id: '0007', restaurant: '멋진 카페', customer: '이철수', date: '2024-08-22', time: '15:00', guests: '3명', status: '대기' },
//     ]);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentStatusFilter, setCurrentStatusFilter] = useState('전체');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [expandedReservationId, setExpandedReservationId] = useState(null); // 상세 정보 상태

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(host)
        .then(res => {
            setData(res.data.data);
            console.log(res);
        })
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        renderReservations();
    }, [currentPage, currentStatusFilter, searchQuery]);


    const renderReservations = () => {
        const filtered = data.filter(row => {
            return (currentStatusFilter === '전체' ||row.data.status === currentStatusFilter) &&
                (row.data.customer.includes(searchQuery) || row.data.restaurant.includes(searchQuery));
        });
        setFilteredReservations(filtered);
    };

    const changePage = (direction) => {
        setCurrentPage(prevPage => prevPage + direction);
    };

    const handleUpdateStatus = (id) => {
        setData(prevReservations =>
            prevReservations.map(data =>
                data.id === id ? { ...data, status: '취소' } : data
            )
        );

        axios.patch(`${host}/${id}`, { status: 14 }) // 상태 업데이트를 위한 요청
            .then(res => {
                window.location.reload();
            })
            .catch(error => {
                console.log('Axios error:', error);
                if (error.response) {
                    console.log('Response data:', error.response.data);
                    console.log('Response status:', error.response.status);
                    console.log('Response headers:', error.response.headers);
                }
            });
    };

    const filterReservations = (status) => {
        setCurrentStatusFilter(status);
        setCurrentPage(1);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const toggleDetails = (id) => {
        setExpandedReservationId(expandedReservationId === id ? null : id);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageReservations = filteredReservations.slice(startIndex, startIndex + itemsPerPage);

    if (!data || data.length === 0) {
        return <div>Loading...</div>; // 데이터가 로드되기 전까지 로딩 메시지 표시
    }

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
                        </div>
                        <div className="reservation-search-bar">
                            <input type="text" id="search-input" placeholder="검색어를 입력하세요" onChange={handleSearch} />
                            <button onClick={renderReservations}>검색</button>
                        </div>
                    </div>
                    <div id="reservation-container">
                        {data.map((row) => (
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
                    <div className="pagination">
                        <button onClick={() => changePage(-1)} disabled={currentPage === 1}>이전</button>
                        <button onClick={() => changePage(1)} disabled={startIndex + itemsPerPage >= filteredReservations.length}>다음</button>
                    </div>
                </section>
            </div>
        </main>
    );
};
export default ReservationAdmin;
