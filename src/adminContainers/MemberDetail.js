import '../css/memberDetail.css';
import axiosInstance from '../context/AxiosInstance';
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useAuth, refreshToken } from '../context/AuthContext';


const openModal = (type) => {
    document.getElementById(type+'Modal').style.display = 'flex';
}

const closeModal = (type) => {
    document.getElementById(type+'Modal').style.display = 'none';
}

const Grant = ({callback, data}) => {
    const { id } = useParams();

    const initialRole = () => {
        const hasAdmin = data.roles.some(r => r.role === 'ADMIN');
        const hasOwner = data.roles.some(r => r.role === 'OWNER');
        // ADMIN과 OWNER 둘 다 있으면 빈 문자열, 아니면 없는 것 중 하나를 초기값으로 설정
        if (hasAdmin && hasOwner) {
            return ''; // 빈 문자열
        }
        return hasAdmin ? 'OWNER' : 'ADMIN'; // 둘 중 하나 선택
    };

    const [selectedRole, setSelectedRole] = useState(initialRole());
    const {reissueToken} = useAuth();

    const grantRole = () =>{
        const role = {
            type: true,
            role: selectedRole
        };
        axiosInstance.post(`/api/admin/members/info/${id}`,  role)
            .then(res => {
                refreshToken(res.data, reissueToken);
                callback();
            })
            .catch(error => console.log(error));
                alert('권한이 부여되었습니다.');
                closeModal('grant');
    }
    return (
        <>
            <div id="grantModal" className="modal-role">
                <div className="modal-role-content">
                    <button className="modal-role-close" onClick={() => {closeModal('grant')}}>&times;</button>
                    <h2>권한 부여</h2>
                    <div className="form-group">
                        <label htmlFor="grantRole">권한 선택:</label>
                        <select id="grantRole"
                                value={selectedRole}
                                onChange={(e) => {setSelectedRole(e.target.value)}}>
                            {['ADMIN', 'OWNER'].map((role) => (
                                !data.roles.some(r => r.role === role) && ( // data.roles에 포함되지 않은 경우만 렌더링
                                    <option key={role} value={role}>
                                        {role === 'ADMIN' ? 'ADMIN' : 'OWNER'}
                                    </option>
                                )
                            ))}
                        </select>
                    </div>
                    <button onClick={grantRole}>부여하기</button>
                </div>
            </div>
        </>
    );
}

const Revoke = ({callback , data}) => {
    const { id } = useParams();

    const userRoles = data.roles.map(row => row.role);
    const hasOnlyUserRole = userRoles.length === 1 && userRoles[0] === 'USER';
    // 초기값 설정
    const initialRole = () => {
        // USER 권한을 제외한 나머지 권한만 필터링
        const rolesWithoutUser = userRoles.filter(role => role !== 'USER');
        // 권한이 있으면 첫 번째 권한을 초기값으로 설정, 없으면 빈 문자열
        return rolesWithoutUser.length > 0 ? rolesWithoutUser[0] : '';
    };
    const [selectedRole, setSelectedRole] = useState(initialRole());

    const revokeRole = () => {

        const role = {
            type: false,
            role: selectedRole
        };
        axiosInstance.post(`/api/admin/members/info/${id}`, role)
            .then(() => {
                callback();
            })
            .catch(error => console.log(error));
                alert('권한이 제거되었습니다.');
                closeModal('revoke');
    }
    return (
        <>
            <div id="revokeModal" className="modal-role">
                <div className="modal-role-content">
                    <button className="modal-role-close" onClick={()=> {closeModal('revoke')}}>&times;</button>
                    <h2>권한 제거</h2>
                    <div className="form-group">
                        <label htmlFor="revokeRole">제거할 권한:</label>
                        <select id="revokeRole"
                                value={selectedRole}
                                onChange={(e) => {setSelectedRole(e.target.value)}}>
                            {!hasOnlyUserRole ? (
                                data.roles.map((row) => (
                                    row.role !== 'USER' && (
                                        <option key={row.id} value={row.role}>{row.role}</option>
                                    )
                                ))
                            ) : (
                                ''
                            )}
                        </select>
                    </div>
                    <button onClick={revokeRole}>제거하기</button>
                </div>
            </div>
        </>
    );
}

const MemberDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [load, setLoad] = useState(false);

    const callback = () => {
        setLoad(!load);
    }

    useEffect(() => {
        const fetchData = async () => {
            await axiosInstance.get(`/api/admin/members/info/${id}?q=${load}`)
                .then(res => {
                    setData(res.data.status ? res.data.results : []);
                })
                .catch
                setError(error);
            }
            fetchData();
        }, [id, load]); 

    if (error) {
        console.log(error);
        return <div>Error: {error.message}</div>;
    }

    if (!data || data.length === 0) {
        return <div>Loading...</div>; 
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
                    <Grant callback={callback} data={data}/>
                    <Revoke callback={callback} data={data}/>
                </div>
            </main>
        </>
    );
}

export default MemberDetail;
