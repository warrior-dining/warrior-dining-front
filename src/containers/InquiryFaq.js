import React from 'react';
import '../css/default.css';
import '../css/inquiry.css';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const InquiryFaq = () => {
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();

  const InquiryClick = () => {
    if(!isLoggedIn) {
      alert("로그인 후 이용가능한 서비스입니다.");
      navigate('/signin'); 
    }else {
      navigate('/inquirycreate');
    }
  };

  const InquiryDetailClick = () => {
    if(!isLoggedIn) {
      alert("로그인 후 이용가능한 서비스입니다.");
      navigate('/signin');
    }else {
      navigate('/mypage/inquiry')
    }
  }

    return (
        <>
        <main className="container">
  <div className="main-content">

    <section>
      <h2 className="section-title">자주 묻는 질문</h2>
      <div className="faq-container">
        <div className="faq-item">
          <h3>Q1: 서비스 이용 방법은?</h3>
          <p>서비스 이용 방법에 대한 상세한 설명이 여기에 들어갑니다. 사용자는 여기를 통해 어떻게 서비스를 이용하는지 알 수 있습니다.</p>
        </div>
        <div className="faq-item">
          <h3>Q2: 결제는 어떻게 하나요?</h3>
          <p>결제 방법에 대한 상세한 설명이 여기에 들어갑니다. 사용자는 여기를 통해 결제 방법을 알 수 있습니다.</p>
        </div>
        <div className="faq-item">
          <h3>Q3: 예약 변경/취소는 어떻게 하나요?</h3>
          <p>예약 변경 및 취소 방법에 대한 상세한 설명이 여기에 들어갑니다. 사용자는 여기를 통해 예약 변경 및 취소 방법을 알 수 있습니다.</p>
        </div>
        <div className="faq-item">
          <h3>Q4: 회원 가입은 어떻게 하나요?</h3>
          <p>회원 가입 방법에 대한 상세한 설명이 여기에 들어갑니다. 사용자는 여기를 통해 회원 가입 방법을 알 수 있습니다.</p>
        </div>
        <div className="faq-item">
          <h3>Q5: 문의는 어떻게 하나요?</h3>
          <p>문의 방법에 대한 상세한 설명이 여기에 들어갑니다. 사용자는 여기를 통해 문의 방법을 알 수 있습니다.</p>
        </div>
        <div className="faq-item">
          <h3>Q4: 회원 가입은 어떻게 하나요?</h3>
          <p>회원 가입 방법에 대한 상세한 설명이 여기에 들어갑니다. 사용자는 여기를 통해 회원 가입 방법을 알 수 있습니다.</p>
        </div>
        <div className="faq-item">
          <h3>Q5: 문의는 어떻게 하나요?</h3>
          <p>문의 방법에 대한 상세한 설명이 여기에 들어갑니다. 사용자는 여기를 통해 문의 방법을 알 수 있습니다.</p>
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
