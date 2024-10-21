import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axiosInstance from '../context/AxiosInstance';
import { useAuth } from "../context/AuthContext";
import '../css/InquiriesDetailAdmin.css';

const host = "http://localhost:8080/api/admin/inquiries/";

const InquirieDtailsAdmin = () => {

    const { id } = useParams();
    const inquiriesId = Number(id);
    const [data, setData] = useState(null);
    const [content, setContent] = useState("");
    const {sub} = useAuth();

    useEffect(() => {
        axiosInstance.get(host + inquiriesId)
            .then(res => {
                setData(res.data.results);
                setContent(res.data.results.answer ? res.data.results.answer.content : ""); // 초기 content 설정
            })
            .catch(error => console.log(error));
    }, [inquiriesId]);

    if (!data) {
        return <div>Loading...</div>; // 데이터가 로드되기 전까지 로딩 메시지 표시
    }

    const SubmitEvent = e => {
        e.preventDefault();
        axiosInstance.post(host + inquiriesId, { content: content, email: sub })
            .then(res => {
                // 필요 시 추가 로직
                window.location.reload();
            })
            .catch(error => console.log(error));
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // 새 줄 추가 방지
            SubmitEvent(e); // 폼 제출
        }
    };

    const isAnswered = data.answer && data.answer.content;

    return (
        <>
            <main>
                <div className="container">
                    <h2 className="main-title">문의 사항 상세</h2>
                    <div className="details-containers">
                        <h3>{data.title}</h3>
                        <div className="info">
                            <p><label>작성자:</label> <span className="contents">{data.user.name}</span></p>
                            <p><label>날짜:</label> <span className="contents">{data.createdAt}</span></p>
                        </div>
                        <div className="info">
                            <p><label>문의 내용:</label></p>
                            <p>{data.content}</p>
                        </div>
                        <div className="reply-containers">
                            <h4>답변 작성</h4>
                            <form onSubmit={SubmitEvent}>
                                <textarea 
                                    placeholder="여기에 답변을 작성하세요..." 
                                    value={content} name="text" 
                                    onChange={(e) => setContent(e.target.value)} 
                                    onKeyDown={handleKeyDown} 
                                    readOnly={isAnswered}
                                />
                                <div className="backList">
                                    {!isAnswered ? <button type="submit">답변 저장</button> : null}
                                    <button type="button" onClick={() => {
                                        window.location.href = '/admin/inquiries';
                                    }}>돌아가기</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default InquirieDtailsAdmin;
