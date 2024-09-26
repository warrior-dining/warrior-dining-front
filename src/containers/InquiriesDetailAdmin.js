import React from "react";
import '../css/InquiriesDetailAdmin.css';


const InquirieDtailsAdmin = () => {
    return (
        <>
            <main>
                <div class="container">
                    <h2>문의 사항 상세</h2>
                    <div class="details-container">
                        <h3>문의 제목</h3>
                        <div class="info">
                            <p><label>작성자:</label> <span class="content">홍길동</span></p>
                            <p><label>날짜:</label> <span class="content">2024-08-21</span></p>
                        </div>
                        <div class="content">
                            <p><label>문의 내용:</label></p>
                            <p>여기에 문의 내용이 들어갑니다. 예를 들어, 고객이 음식점의 서비스에 대해 질문한 내용이 포함될 수 있습니다.</p>
                        </div>
                        <div class="reply-container">
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