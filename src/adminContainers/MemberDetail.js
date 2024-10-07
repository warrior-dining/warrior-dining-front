import '../css/memberDetail.css';
import axios from "axios";
import { useP,useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { FindById } from '../api/DataApi';

const host = "http://localhost:8080/api/admin/members/info/";

const openModal = (type) => {
    document.getElementById(type + 'Modal').style.display = 'flex';
}

const closeModal = (type) => {
    document.getElementById(type + 'Modal').style.display = 'none';
}

const Grant = ({callback}) => {
    const { id } = useParams();
    const url = host + Number(id);
    const [selectedRole, setSelectedRole] = useState('ADMIN');
    const role = {
        type: true,
        role: selectedRole
    };
    const grantRole = () =>{
        // 권한 부여,제거 로직 구현
        axios.post(url,  role)
            .then(() => {
                console.log("권한 부여 성공");
                callback();
            })
            .catch(error => console.log(error));
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
                        <select id="grantRole"
                                value={selectedRole}
                                onChange={(e) => {setSelectedRole(e.target.value)}}>
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

const Revoke = ({callback}) => {
    const { id } = useParams();
    const url = host + Number(id);
    const [selectedRole, setSelectedRole] = useState('ADMIN');
    const role = {
        type: false,
        role: selectedRole
    };
    const revokeRole = () => {
        // 권한 제거 로직 구현
        axios.post(url,  role)
            .then(() => {
                callback();
            })
            .catch(error => console.log(error));

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
                        <select id="revokeRole"
                                value={selectedRole}
                                onChange={(e) => {setSelectedRole(e.target.value)}}>
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

const MemberDetail = () => {
    const [load, setLoad] = useState(false);
    const { id } = useParams();
    const url = host + Number(id) +`?q=${load}`;
    const [response, error] = FindById(url);
    const [data, setData] = useState([]);
    const callback = () => {
        setLoad(!load);
    }
    useEffect(() => {
        if(error) {
            console.log(error);
        }
        if(response.data) {
            setData(response.data.status ? response.data.results : []);
        }
    }, [response, error]);
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
                            <p><label>회원 ID :</label> {data.email}</p>
                            <p><label>이름 :</label> {data.name}</p>
                            <p><label>성별 :</label> {data.gender.comment}</p>
                            <p><label>가입일 :</label>{data.createdAt}</p>
                            <p><label>권한 :</label>
                                {
                                    data.roles.map((row,index)=> {
                                        return(
                                            row.role+' '
                                        );
                                    })
                                }
                            </p>
                            <p><label>상태 :</label> {data.used? '활성':'비활성'}</p>
                        </div>
                        <div className="member-btn-container">
                            <button onClick={ ()=> { openModal('grant') }}>권한 부여</button>
                            <button onClick={ () => { openModal('revoke') }}>권한 제거</button>
                        </div>
                    </div>
                    <Grant callback={callback} />
                    <Revoke callback={callback} />
                </div>
            </main>
        </>
    );
}

export default MemberDetail;
