import React from 'react';
import '../css/default.css';
import '../css/inquiry.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const InquiryFaq = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const InquiryClick = () => {
    if(!isLoggedIn) {
      alert("로그인 후 이용가능한 서비스입니다.");
      navigate('/signin'); 
    } else {
      navigate('/inquirycreate');
    }
  };

  const InquiryDetailClick = () => {
    navigate('/mypage/inquiry');
  };

  return (
    <>
      <main className="container">
        <div className="main-content">

          <section>
            <h2 className="section-title">자주 묻는 질문</h2>
            <div className="faq-container">
              <div className="faq-item">
                <h3>Q1: 어떻게 음식점을 예약하나요?</h3>
                <p> Warrior Dining 홈페이지에서 원하는 음식점을 검색한 후, 음식점 상세 페이지에서 예약 날짜와 시간을 선택한 후 '예약하기' 버튼을 클릭하세요.</p>
              </div>
              <div className="faq-item">
                <h3>Q2: 예약을 취소하거나 변경할 수 있나요?</h3>
                <p> 예약 변경 및 취소는 예약 시간 24시간 전까지 가능합니다. 마이페이지에서 예약 내역을 확인하고 변경 또는 취소 버튼을 눌러주세요.</p>
              </div>
              <div className="faq-item">
                <h3>Q3: 결제는 언제 하나요?</h3>
                <p> 음식점은 현장에서 결제가 가능합니다.</p>
              </div>
              <div className="faq-item">
                <h3>Q4: 특별한 요청 사항이 있을 때는 어떻게 하나요?</h3>
                <p> 예약 과정 중 '요청사항'란에 알레르기나 행사 준비 등의 특별 요청을 입력하시면 음식점에서 최대한 반영해 드립니다.</p>
              </div>
              <div className="faq-item">
                <h3>Q5: 예약 확인은 어디서 보나요?</h3>
                <p> 마이페이지에서 예약 상태를 확인하세요. 추가적으로 고객센터에 문의하실 수 있습니다.</p>
              </div>
              <div className="faq-item">
                <h3>Q6: 리뷰는 어떻게 쓸수있나요?</h3>
                <p> 마이페이지에서 예약내역에 예약이 완료된 가게만 리뷰작성을 하실수 있습니다.</p>
              </div>
              <div className="faq-item">
                <h3>Q7: 즐겨찾기 등록은 어떻게 하나요?</h3>
                <p> 마이페이지에서 예약내역에 예약이 완료된 가게는 즐겨찾기를 등록 하실수 있습니다.</p>
              </div>
              <div className="faq-item">
                <h3>Q8: 정보수정은 어떻게 하나요?</h3>
                <p> 마이페이지에서 내정보에 내정보 수정하기에서 진행하실수 있습니다.
                  <br />
                  (소셜 로그인 사용자는 내정보 수정이 불가능 합니다.)
                </p>
              </div>
            </div>
          </section>

          <div className="header-buttons">
            <a className="header-button" onClick={InquiryClick}>문의하기</a>
            <a className="header-button" onClick={InquiryDetailClick}>내 문의내역</a>
          </div>
        </div>
      </main>
    </>
  );
};

export default InquiryFaq;
