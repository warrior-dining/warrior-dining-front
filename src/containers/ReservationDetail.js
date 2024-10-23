import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import '../css/default.css';
import '../css/mypageMutual.css';
import '../css/myPageReservationDetail.css'
import MypageSidebar from "../components/MypageSidebar";
import {refreshToken, sub, urlList, useAuth} from '../context/AuthContext';
import axiosInstance from '../context/AxiosInstance';

const host = process.env.REACT_APP_BACKEND_URL;

const ReservationDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {reissueToken} = useAuth();
    const reservationId = Number(id);
    const {sub} = useAuth();
    const [data, setData] = useState({});
    const [timeOptions, setTimeOptions] = useState([]);
    const [editData, setEditData] = useState({})

    useEffect(() => {

        const fetchData = async () => {
            axiosInstance.get(`${host}/api/member/reservation/${reservationId}`, urlList())
                .then(res => {
                    refreshToken(res.data, reissueToken);
                    setData( res.data.status ? res.data.results : {} );
                })
                .catch(error => console.log(error))
        };
        fetchData(reservationId, reissueToken);

    }, []);
    useEffect(() => {
        if (data.startTime && data.endTime) {
            generateTimeOptions(data.startTime, data.endTime);
        }
        if (data){
            setEditData({
                reservationDate: data.reservationDate,
                reservationTime: data.reservationTime,
                count: data.count,
                orderNote: data.orderNote
                });
        }
    }, [data]);

    const generateTimeOptions = (startTime, endTime) => {
        const options = [];
        const start = new Date(`1970-01-01T${startTime}:00`); // 날짜는 임의로 설정
        const end = new Date(`1970-01-01T${endTime}:00`);

        while (start <= end) {
            options.push(start.toTimeString().slice(0, 5)); // HH:mm 형식으로 추가
            start.setMinutes(start.getMinutes() + 30); // 30분 단위로 증가
        }
        setTimeOptions(options);
    };

    const getMinMaxDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}`;

        // 최대 날짜 설정 (현재 날짜 + 7일)
        today.setDate(today.getDate() + 30);
        const maxYear = today.getFullYear();
        const maxMonth = String(today.getMonth() + 1).padStart(2, '0');
        const maxDay = String(today.getDate()).padStart(2, '0');
        const maxDate = `${maxYear}-${maxMonth}-${maxDay}`;

        return { minDate, maxDate };
    };

    const { minDate, maxDate } = getMinMaxDate();

    const onChangeEvent = (e) => {
        const { name, value } = e.target;
            setEditData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
    };

    const confirmSave = async () => {
        if (window.confirm('정말로 수정 내용을 저장하시겠습니까?')) {
            const [date, time] = [editData.reservationDate, editData.reservationTime];
            const combinedDateTime = `${date} ${time}`;
            const requestData = {
                ...editData,
                reservationTime: combinedDateTime, // 결합된 값을 사용
            };
            await axiosInstance.put( `${host}/api/member/reservation/${reservationId}`, requestData, urlList())
                .then(res => {
                    refreshToken(res.data, reissueToken);
                    alert('수정 성공');
                })
                .catch(error => console.log(error));
        }
    };
    
    const cancelEdit = () => {
        if (window.confirm('수정 내용을 취소하시겠습니까? 변경 사항이 저장되지 않습니다.')) {
            navigate('/mypage/reservationlist');
        }
    };
    
    const confirmCancel = async () => {
        if (window.confirm('정말로 예약을 취소하시겠습니까?')) {
           await axiosInstance.delete(`${host}/api/member/reservation/${reservationId}`, urlList())
                .then(res => {
                    refreshToken(res.data, reissueToken);
                    alert('예약이 취소되었습니다.');
                    navigate('/mypage/reservationlist');
                })
                .catch(error => {
                    alert(error);
                });
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
                            name="placeName"
                            defaultValue={data.placeName}
                            readOnly
                        />

                        <label htmlFor="date">예약일</label>
                        <input 
                            type="date" 
                            id="date" 
                            name="reservationDate"
                            defaultValue={editData.reservationDate}
                            onChange={onChangeEvent}
                            min={minDate}
                            max={maxDate}
                            required 
                        />

                        <label htmlFor="time">예약 시간</label>
                        <select id="time" name="reservationTime" value={editData.reservationTime || ''} onChange={onChangeEvent} required>
                            {timeOptions.map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="people">인원 수</label>
                        <input 
                            type="number" 
                            id="people" 
                            name="count"
                            defaultValue={editData.count}
                            min="1"
                            onChange={onChangeEvent}
                            required 
                        />

                        <label htmlFor="special-request">특별 요청</label>
                        <textarea 
                            id="special-request" 
                            name="orderNote"
                            rows="4"
                            defaultValue={editData.orderNote}
                            onChange={onChangeEvent}
                        >
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
