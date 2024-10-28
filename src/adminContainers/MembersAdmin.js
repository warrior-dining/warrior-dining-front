import '../css/memberList.css';
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {refreshToken, useAuth} from "../context/AuthContext";
import axiosInstance from "../context/AxiosInstance";


const MemberList = ({list}) => {
    const navigate = useNavigate();

    return (
        <>
            <table className="member-list-table">
                <thead>
                <tr>
                    <th>No</th>
                    <th>회원 ID</th>
                    <th>이름</th>
                    <th>가입일</th>
                    <th>권한</th>
                </tr>
                </thead>
                <tbody>
                {
                    list.map((row, index) => (
                        <tr key={index} onClick={() => {
                            navigate(`/admin/members/info/${row.id}`);
                        }}>
                            <td>{index + 1}</td>
                            <td>{row.email}</td>
                            <td>{row.name}</td>
                            <td>{row.createdAt}</td>
                            <td>
                                {
                                    row.roles.map((row, index) => (
                                        row.role + ' '
                                    ))
                                }
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    );
}

const MembersAdmin = () => {
    const [searchType, setSearchType] = useState('email');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);
    const searchKeywordRef = useRef();
    const {reissueToken} = useAuth();

    // 검색어가 있을 때는 FindByKeyword, 없을 때는 FindByAll 사용
    useEffect(() => {
        const fetchData = async () => {
            await axiosInstance.get(`/api/admin/members/?type=${searchType}&keyword=${searchKeyword}&page=${page}&size=${pageSize}`)
                .then(res => {
                    refreshToken(res.data, reissueToken);
                    setList(res.data.status ? res.data.results.content : []);
                    setTotalPages(res.data.status ? res.data.results.totalPages : 0);
                })
                .catch(error => {
                    setError(error);
                })
        }
        fetchData();
    }, [page, pageSize, searchKeyword]);

    const searchEvent = (e) => {
        e.preventDefault();
        if (searchKeyword === null) {
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

        return Array.from({length: endPage - startPage}, (_, index) => startPage + index);
    };

    const paginationNumbers = getPaginationNumbers();

    return (
        <>
            <main>
                <div className="container">
                    <h2 className="main-title">회원 목록</h2>
                    <form onSubmit={searchEvent}>
                        <div className="member-search-bar">
                            <select value={searchType} onChange={(e) => {
                                setSearchType(e.target.value)
                            }}>
                                <option value="email">회원 ID</option>
                                <option value="name">이름</option>
                                <option value="roles">권한</option>
                            </select>
                            <input type="text" placeholder="검색어를 입력하세요" ref={searchKeywordRef}/>
                            <button type="submit">검색</button>
                        </div>
                    </form>
                    <MemberList list={list}/>
                    <div className="pagination">
                        <a href="#"
                           onClick={(e) => {
                               e.preventDefault();
                               if (page > 0) {
                                   setPage(page - 1);
                               }
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
                               if (page < totalPages - 1) {
                                   setPage(page + 1);
                               }
                           }}
                           disabled={page >= totalPages - 1}> 다음 </a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default MembersAdmin;
