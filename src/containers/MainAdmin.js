import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import

const DashboardSection = () => {
    return (
        <section class="dashboard-summary">
            <h2>대시보드 요약</h2>
            <div class="summary-cards">
                <div class="summary-card">
                    <h3>예약 현황</h3>
                    <p>최근 30일간 예약 건수: 123건</p>
                </div>
                <div class="summary-card">
                    <h3>리뷰 요약</h3>
                    <p>최근 리뷰 평균 별점: 4.5</p>
                </div>
                <div class="summary-card">
                    <h3>회원 동향</h3>
                    <p>최근 30일간 신규 회원 수: 20명</p>
                </div>
                <div class="summary-card">
                    <h3>문의 사항</h3>
                    <p>답변 미완료: 15건</p>
                    <p>답변 완료: 45건</p>
                </div>
            </div>
        </section>
    );
}

const StatisticsSection = () => {
    return (
        <section class="statistics">
            <h2>주요 통계</h2>
            <div class="stat-card-container">
                <div class="stat-card">
                    <h3>총 예약 수</h3>
                    <p>1,234건</p>
                </div>
                <div class="stat-card">
                    <h3>총 리뷰 수</h3>
                    <p>567건</p>
                </div>
                <div class="stat-card">
                    <h3>회원 수</h3>
                    <p>89명</p>
                </div>
                <div class="stat-card">
                    <h3>최근 방문</h3>
                    <p>12명</p>
                </div>
            </div>
        </section>
    );
};

const NoticeSection = () => {
    return (
        <section class="announcements">
            <h2>관리자 공지사항</h2>
            <ul>
                <li>8월 21일 - 새로운 기능 업데이트가 진행되었습니다.</li>
                <li>8월 15일 - 시스템 유지보수 공지.</li>
                <li>8월 10일 - 데이터 백업 완료.</li>
            </ul>
        </section>
    );
}

const RecentSection = () => {
    return (
        <section class="recent-activities">
            <h2>최근 활동</h2>
            <ul>
                <li>8월 20일 - 새로운 예약이 생성되었습니다.</li>
                <li>8월 19일 - 새로운 리뷰가 등록되었습니다.</li>
                <li>8월 18일 - 회원 3명이 가입하였습니다.</li>
            </ul>
        </section>
    );    
}

const MainContent = () => {
  const navigate = useNavigate(); // navigate 함수 사용

  const handleMoreClick = (title) => {
    if (title === '1') {
      navigate('/TopReservation'); 
    } else if (title === '이달의 맛집') {
      navigate('/MonthBest'); 
    } else if (title === '이달의 맛집') {
        navigate('/MonthBest'); 
    } else if (title === '이달의 맛집') {
        navigate('/MonthBest'); 
    } else if (title === '이달의 맛집') {
        navigate('/MonthBest'); 
    } else if (title === '이달의 맛집') {
        navigate('/MonthBest'); 
    } 
  };

  return (
    <main>
      <div className="container">
        <DashboardSection />
        <StatisticsSection /> 
        <NoticeSection />
        <RecentSection />
      </div>
    </main>
  );
};

const MainAdmin = () => {
    return (
        <>
            <main>
                <div class="container">
                    <MainContent />
                </div>
            </main>
        </>
    );
}

export default MainAdmin;
