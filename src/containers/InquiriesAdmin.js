import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import '../css/managerInquiryList.css';


const InquiriesAdmin = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleRowClick = (id) => {
        navigate(`/admin/inquiries/detail`); // 클릭 시 이동할 경로
    };

    return (
        <>
            <main>
                <div className="container">
                    <h2>문의 사항 목록</h2>
                    <div className="search-container">
                        <div className="search-bar">
                            <select>
                                <option value="title">제목</option>
                                <option value="date">날짜</option>
                            </select>
                            <input type="text" placeholder="검색어 입력..." />
                            <button>검색</button>
                        </div>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>글번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>날짜</th>
                            <th>답변 처리 여부</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr onClick={() => handleRowClick(1)}> {/* 클릭 시 handleRowClick 호출 */}
                            <td>1</td>
                            <td>문의 제목 1</td>
                            <td>홍길동</td>
                            <td>2024-08-21</td>
                            <td>처리됨</td>
                        </tr>
                        <tr onClick={() => handleRowClick(2)}> {/* 클릭 시 handleRowClick 호출 */}
                            <td>2</td>
                            <td>문의 제목 2</td>
                            <td>김철수</td>
                            <td>2024-08-22</td>
                            <td>미처리</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="pagination">
                        <a href="#">« 이전</a>
                        <a href="#" className="active">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">다음 »</a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default InquiriesAdmin;