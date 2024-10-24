import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import '../css/managerInquiryList.css';
import axiosInstance from '../context/AxiosInstance';
import { refreshToken, useAuth } from '../context/AuthContext';

const InquiresList = ({data}) => {
    const navigate = useNavigate();
    return (
        <>
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
                {data.length === 0 ? (
                    <tr></tr>
                ) : (
                    data.map((row) => (
                        <tr key={row.id} onClick={() => {
                            navigate(`/admin/inquiries/detail/${row.id}`)
                        }}>
                            <td>{row.id}</td>
                            <td>{row.title}</td>
                            <td>{row.user.name}</td>
                            <td>{row.createdAt}</td>
                            <td>{row.code.value}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </>
    );
}

const InquiriesAdmin = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [searchType, setSearchType] = useState('title');
    const [searchKeyword, setSearchKeyword] = useState('');
    const searchKeywordRef = useRef('');
    const [error, setError] = useState('');
    const {reissueToken} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            await axiosInstance.get(`/api/admin/inquiries?type=${searchType}&keyword=${searchKeyword}&page=${page}&size=${pageSize}`)
            .then(res => {
                refreshToken(res.data, reissueToken);
                setData(res.data.results.content);
                setTotalPages(res.data.results.totalPages);
            })
            .catch(error => setError(error));
        }
        fetchData();
    }, [page, pageSize, searchKeyword]);

    const submitEvent = (e) => {
        e.preventDefault();
        if(searchKeyword === null) {
            alert("검색어를 입력하세요.");
            return;
        }
        setPage(0);
        setSearchKeyword(searchKeywordRef.current.value);
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
            <main>
                <div className="container">

                    <h2 className="main-title">문의 사항 목록</h2>

                    <form onSubmit={submitEvent}>
                        <div className="search-container">
                            <div className="search-bar">
                                <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                    <option value="title">제목</option>
                                    <option value="date">날짜</option>
                                    <option value="user">작성자</option>
                                    <option value="status">답변 처리 여부</option>
                                </select>
                                <input type="text" placeholder="검색어 입력..." ref={searchKeywordRef}/>
                                <button type="submit">검색</button>
                            </div>
                        </div>
                    </form>
                    <InquiresList data={data} />
                    <div className="pagination">
                            <a href="#" onClick={(e) => { e.preventDefault();
                                   if(page > 0){
                                       setPage(page - 1);
                                    }
                               }}
                               disabled={page === 0} > 이전 </a>
                        {paginationNumbers.map((num) => (
                            <a key={num} href="#" className={num === page ? "active" : ""} onClick={(e) => {e.preventDefault(); setPage(num);}}> 
                            {num + 1} 
                            </a>
                        ))}
                            <a href="#" onClick={(e) => {e.preventDefault(); 
                                if(page < totalPages-1){
                                    setPage(page + 1);
                                }
                            }} disabled={page >= totalPages - 1}> 다음 </a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default InquiriesAdmin;