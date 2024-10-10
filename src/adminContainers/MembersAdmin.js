import {useNavigate} from "react-router-dom";
import '../css/memberList.css';
import React, {useEffect, useState} from "react";
import {FindByAll} from '../api/DataApi'
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
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [list, setList] = useState([])
    const [response, error] = FindByAll(host, page, pageSize); // 만들어 놓은 api Hook 사용.
    useEffect(() => {
        if(error) {
            console.log(error);
        }
        if(response.data) {
            setList(response.data.status ? response.data.results.content : []);
            setTotalPages(response.data.status ? response.data.results.totalPages : [])
        }
    }, [response, error]);


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
                        <select>
                            <option value="id">회원 ID</option>
                            <option value="name">이름</option>
                            <option value="email">권한</option>
                        </select>
                        <input type="text" placeholder="검색어 입력..."/>
                        <button>검색</button>
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
