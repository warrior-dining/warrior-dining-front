import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axiosInstance from '../context/AxiosInstance';
import { useAuth, refreshToken } from "../context/AuthContext";
import '../css/InquiriesDetailAdmin.css';


const InquirieDtailsAdmin = () => {

    const { id } = useParams();
    const inquiriesId = Number(id);
    const [data, setData] = useState(null);
    const [content, setContent] = useState("");
    const {sub,reissueToken } = useAuth();

    useEffect(() => {
        axiosInstance.get(`/api/admin/inquiries/${inquiriesId}`)
            .then(res => {
                refreshToken(res.data, reissueToken);
                setData(res.data.results);
                setContent(res.data.results.answer ? res.data.results.answer.content : "");
            })
            .catch(error => console.log(error));
    }, [inquiriesId]);

    if (!data) {
        return <div>Loading...</div>;
    }

    const SubmitEvent = e => {
        e.preventDefault();
        const requestData = { content: content, email: sub };
        axiosInstance.post(`/api/admin/inquiries/${inquiriesId}`, requestData)
            .then(res => { 
                refreshToken(res.data, reissueToken);
                window.location.reload();
            })
            .catch(error => console.log("Error:", error.response));
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); 
            SubmitEvent(e); 
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
                                    placeholder="여기에 답변을 작성해주세요..." 
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
