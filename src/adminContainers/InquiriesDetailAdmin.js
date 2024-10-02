import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../css/InquiriesDetailAdmin.css';

const host = "http://localhost:8080/admin/inquiries/";
const InquirieDtailsAdmin = ({ inquiryId }) => {
    const {id} = useParams();
    const inquiriesId = Number(id);
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get(host + inquiriesId)
        .then(res => {
            console.log(res);
            setData(res.data.results);

        })
        .catch(error => console.log(error));
    }, []);

    if (!data) {
        return <div>Loading...</div>; // 데이터가 로드되기 전까지 로딩 메시지 표시
    }

    return (
        <>
            <main>
                <div className="container">

                    <h2 className="main-title">문의 사항 상세</h2>

                    <div className="details-container">
                        <h3>{data.title}</h3>
                        <div className="info">
                            <p><label>작성자:</label> <span className="content">{data.user.name}</span></p>
                            <p><label>날짜:</label> <span className="content">{data.createdAt}</span></p>
                        </div>
                        <div className="info">
                            <p><label>문의 내용:</label></p>
                            <p>{data.content}</p>
                        </div>
                        <div className="reply-container">
                            <h4>답변 작성</h4>
                            <form>
                                <textarea placeholder="여기에 답변을 작성하세요..."></textarea>
                                <button type="submit">답변 저장</button>
                            </form> 
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default InquirieDtailsAdmin;
