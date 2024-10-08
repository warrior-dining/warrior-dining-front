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
    }, [currentPage, currentStatusFilter, data]); // searchQuery를 포함시키지 않았습니다

    const renderReservations = () => {
        const filtered = data.filter(row => {
            // 전체인 경우는 모든 예약을 포함
            if (currentStatusFilter === '전체') {
                return true;
            }
            // 현재 상태 필터와 일치하는 예약만 포함
            return row.code.value === currentStatusFilter;
        });
        setFilteredReservations(filtered); // 필터링된 결과를 저장
        console.log("Filtered Reservations:", filtered);
    };

    const changePage = (direction) => {
        setCurrentPage(prevPage => prevPage + direction);
    };

    const handleUpdateStatus = (id) => {
        const confirmCancel = window.confirm("예약을 취소하시겠습니까?");
    if (!confirmCancel) {
        return; // 사용자가 취소를 클릭하면 함수 종료
        }
       axios.patch(`${host}${id}`, { status: 14 }) // 상태 업데이트를 위한 요청
            .then(res => {
                // 데이터 새로 고침
                setData(prevData => prevData.map(item => 
                    item.id === id ? { ...item, code: { value: '취소' } } : item
                ));
                renderReservations(); // 상태 업데이트 후 다시 렌더링
            })
            .catch(error => {
                console.log('Axios error:', error);
            });
    };

    const filterReservations = (status) => {
        setCurrentStatusFilter(status);
        console.log(`Current Status Filter: ${status}`);
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
                        {filteredReservations.map((row) => ( // filteredReservations를 사용
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
                        <button onClick={() => changePage(-1)} >이전</button>
                        <button onClick={() => changePage(1)} >다음</button>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ReservationAdmin;
