import {Link, useNavigate} from "react-router-dom";
import '../css/memberList.css';
import {useEffect, useState} from "react";
import axios from "axios";

async function getUser(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data.results);
        return res.data.results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const FindByAll = (url) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getUser(url);
            setList(data);
        }
        fetchData();
    }, [url]);
    return list;
}


const MemberList = () => {
    const navigate = useNavigate();
    const list = FindByAll("http://localhost:8080/api/admin/members/");

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
                            <td>{index+1}</td>
                            <td>{row.email}</td>
                            <td>{row.name}</td>
                            <td>{row.createdAt}</td>
                            <td>{row.roles[0].role}, {row.roles[1].role} </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    );
}


const MembersAdmin = () => {

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
                    <MemberList />
                    <div className="pagination">
                        <a href="#" className="active">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">다음</a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default MembersAdmin;
