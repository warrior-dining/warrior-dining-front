import React from 'react';
import { useNavigate} from 'react-router-dom';
import '../css/mypageMutual.css';
import '../css/default.css';
import '../css/myPageReservationList.css';
import MypageSidebar from "../components/MypageSidebar";

const ReservationList = () => {
    const navigate = useNavigate();

    const reservations = [
        {
            number: '12345',
            date: '2024-08-15',
            status: '방문예정',
            restaurant: '레스토랑 A',
            people: 3,
            time: '18:00',
            specialRequest: '창가 자리 부탁드립니다.',
            paymentStatus: '결제 대기',
        },
        {
            number: '12346',
            date: '2024-08-16',
            status: '방문완료',
            restaurant: '레스토랑 B',
            people: 2,
            time: '19:00',
            specialRequest: '조용한 자리 부탁드립니다.',
            paymentStatus: '결제 완료',
        },
        {
            number: '12347',
            date: '2024-08-17',
            status: '방문예정',
            restaurant: '레스토랑 C',
            people: 4,
            time: '20:00',
            specialRequest: '장애인 접근 가능 좌석 요청',
            paymentStatus: '결제 완료',
        },
        {
            number: '12348',
            date: '2024-08-17',
            status: '방문예정',
            restaurant: '레스토랑 C',
            people: 4,
            time: '20:00',
            specialRequest: '장애인 접근 가능 좌석 요청',
            paymentStatus: '결제 완료',
        },
        {
            number: '12349',
            date: '2024-08-17',
            status: '방문예정',
            restaurant: '레스토랑 C',
            people: 4,
            time: '20:00',
            specialRequest: '장애인 접근 가능 좌석 요청',
            paymentStatus: '결제 완료',
        },
    ];

    
    return (
        <main className="mypage-container">
            <MypageSidebar />
            <section id="orders">
                <h1>예약 내역</h1>
                <div className="order-list">
                    {reservations.map((reservation) => (
                        <div className="order-item" key={reservation.number}>
                            <div className="reservation-info">
                                <h2 className="reservation-number">예약 번호: {reservation.number}</h2>
                                <p className="reservation-date">예약일: {reservation.date}</p>
                                <p className="reservation-status">상태: {reservation.status}</p>
                                <ul className="reservation-details">
                                    <li>레스토랑: {reservation.restaurant}</li>
                                    <li>인원 수: {reservation.people}명</li>
                                    <li>예약 시간: {reservation.time}</li>
                                    <li>특별 요청: {reservation.specialRequest}</li>
                                    <li>결제 상태: {reservation.paymentStatus}</li>
                                </ul>
                                <button 
                                    className="reservationList-order-details-button" 
                                    onClick={() => navigate('/mypage/reservationdetail', { state: reservation })}
                                >
                                    예약 수정/취소
                                </button>
                                <button 
                                    className="reservationList-cancel-button" 
                                    onClick={() => navigate('/reviewcomment')}
                                >
                                    리뷰 작성하기
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default ReservationList;
