import React,  {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import '../css/managerInquiryList.css';
import axios from 'axios';

const host = "http://localhost:8080/api/admin/inquiries/";
const data = [
    {
        id: 1,
        title: '제목 1',
        username: '홍길동',
        createAt: '2024-08-21',
        status: '처리됨'
    },
    {
        id: 2,
        title: '제목 2',
        username: '김철수',
        createAt: '2024-08-21',
        status: '미처리'
    }
];

const InquiresList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(host)
            .then(res => {
                setData(res.data.data); // 전체 데이터 배열을 설정
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        console.log(data); // data가 변경될 때마다 로그 출력
    }, [data]);

    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleRowClick = () => {
        navigate(`/admin/inquiries/`); // 클릭 시 이동할 경로
    };

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
                    <InquiresList />
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
