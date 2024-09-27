import '../css/restaurantManagement.css';
import {useNavigate} from "react-router-dom";


const data = [
    {
        id: 1,
        name: '강남불백 신촌점',
        addr: '서울 서대문구 연세로4길 6',
        phone: '02-313-5988',
        createAt: '2024-01-15'
    },
    {
        id: 2,
        name: '한창희천하일면 신촌점',
        addr: '서울 서대문구 명물길 27-17',
        phone: '0507-1445-3133',
        createAt: '2024-01-15'
    }
]

const PlaceList = () => {
    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>음식점 ID</th>
                    <th>음식점 이름</th>
                    <th>위치</th>
                    <th>전화번호</th>
                    <th>등록일</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((row,index) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.addr}</td>
                            <td>{row.phone}</td>
                            <td>{row.createAt}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    );
}

const PlacesAdmin = () => {
    const navigate = useNavigate();
    return (
        <>
            <main>
                <div className="container">

                    <h2 className="main-title">음식점 목록</h2>

                    <div className="header-container">
                        <button type="button" onClick={()=>{
                            navigate('/admin/places/add');
                        }}>음식점 등록</button>
                        <div className="search-bar">
                            <select>
                                <option value="name">음식점 이름</option>
                                <option value="location">위치</option>
                            </select>
                            <input type="text" placeholder="검색어 입력..."/>
                            <button>검색</button>
                        </div>
                    </div>
                    <PlaceList />
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

export default PlacesAdmin;