import React, { useEffect, useState } from "react";
import '../css/default.css';
import '../css/inquiry.css';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const host = "http://localhost:8080/api/member/inquiries/"
const InquiryDetail = () => {
    const {id} = useParams();
    const inquiryId = Number(id);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(()=> {
        const url = host + inquiryId;
        axios.get(url)
        .then(res => {
            setData(res.data.results);
            setTitle(res.data.results.title);
            setContent(res.data.results.content);
        })
        .catch(error => console.log(error));
    }, [inquiryId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateData = {"title": title, "content": content}
        axios.put(`${host}${inquiryId}`, updateData)
        .then(res => {
        })
        .catch(error => console.log(error));
    };

    const handleCancel = () => {
        navigate('/mypage/inquiry'); // 리스트 화면으로 이동
    };

    return(
        <>
    <section className="contact-section">
    <h1 className="page-title">문의하기</h1>
    <p className="page-title2">궁금한 점이나 불편한 사항이 있으시면 아래 폼을 통해 문의해 주세요. 최대한 빠르게 답변 드리겠습니다.</p>

    <form onSubmit={handleSubmit}> 
    <div className="contact-form">
        <label htmlFor="subject">문의제목</label>
        <input 
            type="text" 
            id="subject" 
            name="subject" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />

        <label htmlFor="message">문의내용</label>
        <textarea 
            id="message" 
            name="message" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
        ></textarea>

        <button type="submit">수정</button>
        <button type="button" onClick={handleCancel}>취소</button>
        </div>
    </form>
    </section>
        
        </>
    );
}

export default InquiryDetail;
