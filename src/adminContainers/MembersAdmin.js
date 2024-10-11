import {useNavigate} from "react-router-dom";
import '../css/memberList.css';
import React, {useEffect, useRef, useState} from "react";
import {FindByAll, FindByKeyword} from '../api/DataApi'
import axios from "axios";

const host = "http://localhost:8080/api/admin/members/";

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
    const searchKeywordRef= useRef();

    // 검색어가 있을 때는 FindByKeyword, 없을 때는 FindByAll 사용
    useEffect(() => {
        const fetchData = async () => {
            const url = `${host}?type=${searchType}&keyword=${searchKeyword}&page=${0}&size=${pageSize}`;
            try {
                const result = await axios.get(url);
                setList(result.data.status ? result.data.results.content : []);
                setTotalPages(result.data.status ? result.data.results.totalPages : 0);
            } catch (error) {
                setError(error);
                console.log(error);
            }
        };
        fetchData();
    }, [page, pageSize, searchKeyword]);

    const searchEvent = async () => {
        if(searchKeyword === null) {
            alert("검색어를 입력하세요.");
            return;
        }
        setPage(0); // 검색할 때 페이지를 0으로 초기화
        setSearchKeyword(searchKeywordRef.current.value);
    };

    const getPaginationNumbers = () => {
        const maxPagesToShow = 5; // 화면에 보여줄 페이지 갯수
        const startPage = Math.max(0, page - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow);

        return Array.from({ length: endPage - startPage }, (_, index) => startPage + index);
    };

    const paginationNumbers = getPaginationNumbers();

    return (
        <>
            <main>
                <div className="container">

                    <h2 className="main-title">회원 목록</h2>

                    <div className="member-search-bar">
                        <select value={searchType} onChange={(e) => {setSearchType(e.target.value)}}>
                            <option value="email">회원 ID</option>
                            <option value="name">이름</option>
                            <option value="roles">권한</option>
                        </select>
                        <input type="text" placeholder="검색어 입력..." ref={searchKeywordRef} />
                        <button onClick={searchEvent}>검색</button>
                    </div>
                    <MemberList list={list}/>
                    <div className="pagination">
                        {page >= 1 && (
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page - 1);
                                }}
                            >
                                이전
                            </a>
                        )}
                        {paginationNumbers.map((num) => (
                            <a
                                key={num}
                                href="#"
                                className={num === page ? "active" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(num);
                                }}
                            >
                                {num + 1}
                            </a>
                        ))}
                        {page < totalPages - 1 && (
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                다음
                            </a>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

export default MembersAdmin;
