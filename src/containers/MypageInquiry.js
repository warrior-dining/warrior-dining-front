import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {refreshToken, useAuth} from '../context/AuthContext';
import '../css/default.css';
import '../css/mypageMutual.css';
import '../css/inquiry.css';
import '../css/myPageInquiryHistory.css';
import MypageSidebar from "../components/MypageSidebar";
import axiosInstance from "../context/AxiosInstance";


const MypageInquiry = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize]  = useState(10);
    const {reissueToken} = useAuth();

    useEffect(()=> {
        axiosInstance.get(`/api/member/inquiries/?page=${page}&size=${pageSize}`)
        .then(res => {
            refreshToken(reissueToken);
            setData(res.data.results.content); 
            setTotalPages(res.data.results.totalPages);
        })
        .catch(error => console.log(error));
    }, [page, pageSize])

    const handleEdit = (id) => {
        navigate(`/inquiry/detail/${id}`); 
      };

    const getPaginationNumbers = () => {
        const maxPagesToShow = 5;
        const startPage = Math.max(0, page - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow);

        return Array.from({ length: endPage - startPage }, (_, index) => startPage + index);
    };

    const paginationNumbers = getPaginationNumbers();

return (
    <>
     <main className="mypage-container">
        <MypageSidebar />
            <div className="content">
                <section className="myReview">
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
                                {data.map((inquiry) => (
                                    <tr key={inquiry.id} onClick={() => handleEdit(inquiry.id)}>
                                        <td>{inquiry.id}</td>
                                        <td>{inquiry.title}</td>
                                        <td>{inquiry.createdAt}</td>
                                        <td className={`status ${inquiry.status}`}>
                                            {inquiry.code.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>    
                    </div>
                    </section>
                    <div className="inquiry-pagination-container">
                            <div className="inquiry-pagination">
                                <a href="#"
                                    onClick={(e) => {
                                    e.preventDefault();
                                        if (page > 0) { setPage(page - 1); }
                                    }}
                                disabled={page === 0}> 이전 </a>
                                {paginationNumbers.map((num) => (
                                    <a key={num} href="#" className={num === page ? "active" : ""}
                                        onClick={(e) => {
                                        e.preventDefault();
                                        setPage(num);
                                    }}> {num + 1} </a>
                                ))}
                                <a href="#"
                                    onClick={(e) => {
                                    e.preventDefault();
                                    if (page < totalPages - 1) { setPage(page + 1); }
                                }}
                                disabled={page >= totalPages - 1}> 다음 </a>
                            </div>
                </div>
            </div>
        </main>
    </>
);

}

export default MypageInquiry;
