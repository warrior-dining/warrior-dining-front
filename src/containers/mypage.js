import React from "react";
import { Link } from 'react-router-dom';
import '../css/mypageMutual.css';
import '../css/myPage.css';
import '../css/default.css';

const Mypage = () => {
    return (
        <>
        <main className="mypage-container">
      <div className="mypage-sidebar">
        <h2>마이페이지</h2>
        <ul>
          <li><Link to="/mypage" className="active">내정보</Link></li>
          <li><Link to="/mypage/reservationlist">예약 내역</Link></li>
          <li><Link to="/mypage/reviewlist">리뷰 관리</Link></li>
          <li><Link to="/mypage/bookmark">즐겨찾기</Link></li>
          <li><Link to="/mypage/inquiryhistory">내 문의내역</Link></li>
        </ul>
      </div>

      <div className="mypage-content">
        <h1>내정보</h1>
        <form id="infoForm">
          <fieldset>
            <legend>개인정보</legend>
            <label htmlFor="name">이름:</label>
            <input type="text" id="name" name="name" defaultValue="홍길동" />

            <label htmlFor="email">이메일:</label>
            <input type="email" id="email" name="email" defaultValue="hong@example.com" />

            <label htmlFor="phone">전화번호:</label>
            <input type="tel" id="phone" name="phone" defaultValue="010-1234-5678" />
          </fieldset>

          <Link to="/mypage/edit" className="button">정보 수정</Link>
        </form>
      </div>
    </main>
        </>
    );
}


export default Mypage;