import '../css/memberDetail.css';
import axios from "axios";
import { useP,useEffect, useState} from "react";
import { useParams } from "react-router-dom";


const openModal = (type) => {
    document.getElementById(type + 'Modal').style.display = 'flex';
}

const closeModal = (type) => {
    document.getElementById(type + 'Modal').style.display = 'none';
}

const Grant = () => {
    const grantRole = () => {
        // 권한 부여 로직 구현
        alert('권한이 부여되었습니다.');
        closeModal('grant');
    }
    return (
        <>
            <div id="grantModal" className="modal">
                <div className="modal-content">
                    <button className="modal-close" onClick={() => {closeModal('grant')}}>&times;</button>
                    <h2>권한 부여</h2>
                    <div className="form-group">
                        <label htmlFor="grantRole">권한 선택:</label>
                        <select id="grantRole">
                            <option value="ADMIN">관리자</option>
                            <option value="OWNER">오너</option>
                        </select>
                    </div>
                    <button onClick={grantRole}>부여하기</button>
                </div>
            </div>
        </>
    );
}

const Revoke = () => {
    const revokeRole = () => {
        // 권한 제거 로직 구현
        alert('권한이 제거되었습니다.');
        closeModal('revoke');
    }
    return (
        <>
            <div id="revokeModal" className="modal">
                <div className="modal-content">
                    <button className="modal-close" onClick={()=> {closeModal('revoke')}}>&times;</button>
                    <h2>권한 제거</h2>
                    <div className="form-group">
                        <label htmlFor="revokeRole">제거할 권한:</label>
                        <select id="revokeRole">
                            <option value="ADMIN">관리자</option>
                            <option value="OWNER">오너</option>
                        </select>
                    </div>
                    <button onClick={revokeRole}>제거하기</button>
                </div>
            </div>
        </>
    );
}
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

const FindById = (url) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await getUser(url);
            setData(res);
            // console.log(res);
        }
        fetchData();
    }, [url]);
    return data;
}

const MemberDetail = () => {
    const { id } = useParams();
    const userId = Number(id);
    const data = FindById(`http://localhost:8080/api/admin/members/info/${userId}`);
    if (!data || data.length === 0) {
        return <div>Loading...</div>; // 데이터가 로드 중일 때 로딩 표시
    }
    return (
        <>
            <main>
                <div className="container">
                    <div className="member-details-container">

                        <h2 className="main-title">회원 상세정보</h2>
                        <div className="info">
                            <p><label>회원 ID :</label> {data.id}</p>
                            <p><label>이름 :</label> {data.name}</p>
                            <p><label>성별 :</label> {data.gender.comment}</p>
                            <p><label>가입일 :</label>{data.createdAt}</p>
                            <p><label>권한 :</label>{data.roles[0].role}, {data.roles[1].role} </p>
                            <p><label>상태 :</label> {data.used? '활성':'비활성'}</p>
                        </div>
                        <div className="member-btn-container">
                            <button onClick={ ()=> { openModal('grant') }}>권한 부여</button>
                            <button onClick={ () => { openModal('revoke') }}>권한 제거</button>
                        </div>
                    </div>
                    <Grant />
                    <Revoke />
                </div>
            </main>
        </>
    );
}

export default MemberDetail;
