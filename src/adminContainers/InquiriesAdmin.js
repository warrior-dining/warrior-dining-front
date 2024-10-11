import React,  {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import '../css/managerInquiryList.css';
import axios from 'axios';

const host = "http://localhost:8080/api/admin/inquiries/";

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
                {
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
                }
                </tbody>
            </table>
        </>
    );
}

const InquiriesAdmin = () => {
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    let url = host+`?page=${page}&size=10`;

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setData(res.data.data.content); // 전체 데이터 배열을 설정
                setTotalPages(res.data.data.totalPages);
            })
            .catch(error => console.log(error));
    }, [page]);

    useEffect(() => {
        console.log(data); // data가 변경될 때마다 로그 출력
    }, [data]);

    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleRowClick = () => {
        navigate(`/admin/inquiries/`); // 클릭 시 이동할 경로
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

                    <div className="search-container">
                        <div className="search-bar">
                            <select>
                                <option value="title">제목</option>
                                <option value="date">날짜</option>
                            </select>
                            <input type="text" placeholder="검색어 입력..."/>
                            <button>검색</button>
                        </div>
                    </div>
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