import React, {useEffect, useState} from 'react';
import axiosInstance from '../context/AxiosInstance';
import { useAuth, refreshToken } from '../context/AuthContext';
import '../css/mainAdmin.css';


const DashboardSection = ({data}) => {
    return (
        <section className="dashboard-summary">
            <h2>대시보드 요약</h2>
            <div className="summary-cards">
                <div className="summary-card">
                    <h3>예약 현황</h3>
                    <p>최근 30일간 예약 건수: {data.countRecentReservations}건</p>
                </div>
                <div className="summary-card">
                    <h3>리뷰 요약</h3>
                    <p>최근 리뷰 평균 별점: {data.avgRecentRating}</p>
                </div>
                <div className="summary-card">
                    <h3>회원 동향</h3>
                    <p>최근 30일간 신규 회원 수: {data.countRecentJoinUser}명</p>
                </div>
                <div className="summary-card">
                    <h3>문의 사항</h3>
                    <p>답변 미완료: {data.countInquiriesByCode && data.countInquiriesByCode.length > 0 ? data.countInquiriesByCode[0].count : 0}건</p>
                    <p>답변 완료: {data.countInquiriesByCode && data.countInquiriesByCode.length > 1 ? data.countInquiriesByCode[1].count : 0}건</p>
                </div>
            </div>
        </section>
    );
}

const StatisticsSection = ({data}) => {
    return (
        <section className="statistics">
            <h2>주요 통계</h2>
            <div className="stat-card-container">
                <div className="stat-card">
                    <h3>총 예약 수</h3>
                    <p>{data.reservationTotalCount}건</p>
                </div>
                <div className="stat-card">
                    <h3>총 리뷰 수</h3>
                    <p>{data.reviewTotalCount}건</p>
                </div>
                <div className="stat-card">
                    <h3>회원 수</h3>
                    <p>{data.userTotalCount}명</p>
                </div>
                <div className="stat-card">
                    <h3>최근 방문</h3>
                    <p>12명</p>
                </div>
            </div>
        </section>
    );
};

const NoticeSection = ({data}) => {
    let placeList = [];
    if(data.placeRecent != null && data.placeRecent.length > 0 ){
        placeList = [... data.placeRecent];
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    };
    return (
        <section className="announcements">
            <h2>최근 등록된 음식점</h2>
            <ul>
                { placeList.map((row) =>
                        <li key={row.id}>
                            {formatDate(row.createdAt)} - {row.name}
                        </li>
                    )
                }
            </ul>
        </section>
    );
}

const MainContent = () => {
    const [data, setData] = useState([]);
    const {reissueToken} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            await axiosInstance.get("/api/admin/")
                .then(res => {
                    refreshToken(res.data, reissueToken);
                    setData(res.data.status ? res.data.results: []);
                })
                .catch(error => console.log(error));
        }
        fetchData();
    }, []);
  return (
    <main>
      <div className="container">
          <DashboardSection data={data}/>
          <StatisticsSection data={data} />
          <NoticeSection data={data}/>
      </div>
    </main>
  );
};

const MainAdmin = () => {
    return (
        <>
            <main>
                <div className="container">
                    <MainContent />
                </div>
            </main>
        </>
    );
}

export default MainAdmin;
