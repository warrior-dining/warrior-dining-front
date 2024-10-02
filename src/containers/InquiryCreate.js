import React from "react";
import '../css/default.css';
import '../css/inquiry.css';

const InquiryCreate = () => {
    return(
        <>
    <section className="contact-section">
    <h1 className="page-title">문의하기</h1>
    <p className="page-title2">궁금한 점이나 불편한 사항이 있으시면 아래 폼을 통해 문의해 주세요. 최대한 빠르게 답변 드리겠습니다.</p>

    <form action="/submit-contact-form" method="post" className="contact-form">

        <label for="subject">제목</label>
        <input type="text" id="subject" name="subject" required />

        <label for="message">메시지</label>
        <textarea id="message" name="message" required></textarea>

        <button type="submit">보내기</button>
    </form>
    </section>
        
        </>
    );
}

export default InquiryCreate;
