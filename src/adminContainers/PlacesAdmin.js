import '../css/restaurantManagement.css';
import {useNavigate} from "react-router-dom";
import {FindByAll} from "../api/DataApi";
import {useEffect, useState} from "react";

const host = "http://localhost:8080/api/admin/places/";

const PlaceList = () => {
    const navigate = useNavigate();
    const [list, setList] = useState([])
    const [response, error] = FindByAll(host); // 만들어 놓은 api Hook 사용.
    useEffect(() => {
        if(error) {
            console.log(error);
        }
        if(response.data) {
            setList(response.data.status ? response.data.results : []);
        }
    }, [response, error]);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>No</th>
                    <th>음식점 이름</th>
                    <th>위치</th>
                    <th>전화번호</th>
                    <th>등록일</th>
                </tr>
                </thead>
                <tbody>
                {
                    list.map((row,index) => (
                        <tr key={index} onClick={() => {
                            navigate("/admin/places/info/"+ row.id)
                        }}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.addressNew}</td>
                            <td>{row.phone}</td>
                            <td>{row.createdAt}</td>
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
