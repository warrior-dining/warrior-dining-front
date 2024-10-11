import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../css/InquiriesDetailAdmin.css';

const host = "http://localhost:8080/api/admin/inquiries/";

const InquirieDtailsAdmin = () => {
    const { id } = useParams();
    const inquiriesId = Number(id);
    const [data, setData] = useState(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        axios.get(host + inquiriesId)
            .then(res => {
                console.log(res);
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
        axios.post(host + inquiriesId, { "content": content })
            .then(res => {
                console.log(res.data);
                // 필요 시 추가 로직
                window.location.reload();
            })
            .catch(error => console.log(error));
    }

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
                                <textarea placeholder="여기에 답변을 작성하세요..." value={content} name="text" onChange={(e) => setContent(e.target.value)} readOnly={isAnswered}/>
                                {!isAnswered ? <button type="submit">답변 저장</button> : null}
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default InquirieDtailsAdmin;
