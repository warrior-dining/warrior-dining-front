import {Link, useNavigate} from "react-router-dom";
import '../css/memberList.css';

const MembersAdmin = () => {

    const data = [
        {
            no: '1',
            id: 'hong@example.com',
            name: '홍길동',
            createAt: '2024-01-15',
            role: '관리자, 사용자'
        },
        {
            no: '2',
            id: 'kim@example.com',
            name: '김철수',
            createAt: '2024-01-15',
            role: '오너, 사용자'
        }
    ];

    const MemberList = () => {
        const navigate = useNavigate();
        console.log(data);
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
                                data.map((row, index) => (
                                    <tr key={index} onClick={() => {
                                        navigate('/admin/members/info');
                                    }}>
                                        <td>{row.no}</td>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.createAt}</td>
                                        <td>{row.role}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                </table>
            </>
        );
    }

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