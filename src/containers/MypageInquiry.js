import React from "react";
import '../css/default.css';
import '../css/mypageMutual.css';
import '../css/inquiry.css';
import '../css/myPageInquiryHistory.css';
import { Link } from 'react-router-dom';
import MypageSidebar from "../components/MypageSidebar";


const MypageInquiry = () => {
    const inquiries = [
        {
            id: 3,
            title: "문의 제목 1",
            date: "2024-08-20",
            status: "처리중",
            link: "/inquiry/detail",
        },
        {
            id: 2,
            title: "문의 제목 2",
            date: "2024-08-18",
            status: "완료",
            link: "/inquiry/detail",
        },
        {
            id: 1,
            title: "문의 제목 3",
            date: "2024-08-15",
            status: "대기중",
            link: "/inquiry/detail",
        },
    ];
return (
    <>
     <main className="mypage-container">
        <MypageSidebar />
            <div className="content">
                <h1>내 문의내역</h1>
                <div className="inquiries-container">
                    <div className="inquiry-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>문의 제목</th>
                                    <th>문의 날짜</th>
                                    <th>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiries.map((inquiry) => (
                                    <tr key={inquiry.id}>
                                        <td>{inquiry.id}</td>
                                        <td>
                                        <Link to={inquiry.link}>{inquiry.title}</Link>
                                        </td>
                                        <td>{inquiry.date}</td>
                                        <td className={`status ${inquiry.status}`}>
                                            {inquiry.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </>
);

}

export default MypageInquiry;
