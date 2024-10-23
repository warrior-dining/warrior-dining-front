import React, {useState} from "react";
import '../css/default.css';
import '../css/inquiry.css';
import {refreshToken, useAuth} from '../context/AuthContext';
import axiosInstance from '../context/AxiosInstance';
import {useNavigate} from "react-router-dom";

const InquiryCreate = () => {
    const {reissueToken, sub} = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const host = "http://localhost:8080/api/member/inquiries/";
    const handleSubmit = (e) => {
        e.preventDefault();

        const createData = {title: title, content: content, email: sub};
        axiosInstance.post(`${host}`, createData)
            .then(res => {
                refreshToken(reissueToken);
                navigate(`/mypage/inquiry`);
            })
            .catch(error => console.log(error));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // 새 줄 추가 방지
            handleSubmit(e); // 폼 제출
        }
    };

    return (
        <>
            <section className="contact-section">
                <h1 className="page-title">문의하기</h1>
                <p className="page-title2">궁금한 점이나 불편한 사항이 있으시면 아래 폼을 통해 문의해 주세요. 최대한 빠르게 답변 드리겠습니다.</p>

                <form className="contact-form" onSubmit={handleSubmit}>

                    <label htmlFor="subject">제목</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label htmlFor="message">메시지</label>
                    <textarea
                        id="message"
                        name="message"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        required
                    ></textarea>

                    <button type="submit">보내기</button>
                </form>
            </section>

        </>
    );
}

export default InquiryCreate;
