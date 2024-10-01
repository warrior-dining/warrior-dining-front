import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/default.css';
import '../css/mypageMutual.css';
import '../css/myPageReservationDetail.css'
import MypageSidebar from "../components/MypageSidebar";

const ReservationDetail = () => {
    const location = useLocation();
    const reservation = location.state; // 이전 페이지에서 전달받은 상태

    useEffect(() => {
        const timeSelect = document.getElementById('time');
        const existingTime = reservation?.time; // 기존에 설정된 시간

        function generateTimeOptions() {
            let startTime = 0; // 00:00
            let endTime = 24 * 60; // 24:00
            let interval = 30; // 30분 간격

            for (let minutes = startTime; minutes < endTime; minutes += interval) {
                let hours = Math.floor(minutes / 60);
                let mins = minutes % 60;
                let formattedHours = String(hours).padStart(2, '0');
                let formattedMinutes = String(mins).padStart(2, '0');
                let optionValue = `${formattedHours}:${formattedMinutes}`;
                let option = document.createElement('option');
                option.value = optionValue;
                option.textContent = optionValue;

                if (optionValue === existingTime) {
                    option.selected = true; // 기본값 설정
                }

                timeSelect.appendChild(option);
            }
        }

        generateTimeOptions();
    }, [reservation]);

    const confirmSave = () => {
        if (window.confirm('정말로 수정 내용을 저장하시겠습니까?')) {
            document.getElementById('reservation-form').submit();
        }
    };
    
    const cancelEdit = () => {
        if (window.confirm('수정 내용을 취소하시겠습니까? 변경 사항이 저장되지 않습니다.')) {
            window.location.href = '/reservationList';
        }
    };
    
    const confirmCancel = () => {
        if (window.confirm('정말로 예약을 취소하시겠습니까?')) {
            alert('예약이 취소되었습니다.');
            // 취소 요청을 서버로 전송하는 코드 추가
            window.location.href = '/mypage/reservationList';
        }
    };

    return (
        <>
        <main className="mypage-container">
        <MypageSidebar />
        <div className="content">
            <section id="reservation-edit">
                <div className="reservation-edit-section">
                    <h2>예약 수정</h2>
                    <form id="reservation-form" action="#" method="post">
                        <label htmlFor="restaurant">레스토랑</label>
                        <input 
                            type="text" 
                            id="restaurant" 
                            name="restaurant" 
                            defaultValue={reservation?.restaurant} 
                            required 
                        />

                        <label htmlFor="date">예약일</label>
                        <input 
                            type="date" 
                            id="date" 
                            name="date" 
                            defaultValue={reservation?.date} 
                            required 
                        />

                        <label htmlFor="time">예약 시간</label>
                        <select id="time" name="time" required>
                            {/* 시간 옵션은 useEffect에서 동적으로 추가됩니다. */}
                        </select>

                        <label htmlFor="people">인원 수</label>
                        <input 
                            type="number" 
                            id="people" 
                            name="people" 
                            defaultValue={reservation?.people} 
                            min="1" 
                            required 
                        />

                        <label htmlFor="special-request">특별 요청</label>
                        <textarea 
                            id="special-request" 
                            name="special-request" 
                            rows="4"
                        >
                            {reservation?.specialRequest}
                        </textarea>

                        <div className="button-container">
                            <button type="button" className="submit-button" onClick={confirmSave}>수정 저장</button>
                            <button type="button" className="cancel-edit-button" onClick={cancelEdit}>수정 취소</button>
                            <button type="button" className="submit-button" onClick={confirmCancel}>예약 취소</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
        </main>
        </>
    );
};

export default ReservationDetail;
