import React, { useState, useEffect } from 'react';
import '../css/restaurantCreate.css';
import {useNavigate, useParams} from "react-router-dom";
import {FindById} from "../api/DataApi";

const host = "http://localhost:8080/api/admin/places/info/"


const PlaceDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const url = host + Number(id);
    const [response, error] = FindById(url);
    const [data, setData] = useState([]);
    useEffect(() => {
        if(error) {
            console.log(error);
        }
        if(response.data) {
            setData(response.data.status ? response.data.results : []);
            console.log(data);
        }
    }, [response, error]);
    const images = [];
    const clickEvent = () => {
        navigate("/admin/places/edit");
    }

    if (!data || data.length === 0) {
        return <div>Loading...</div>; // 데이터가 로드 중일 때 로딩 표시
    }
    return (
        <>
            <main>
                <div className="container">

                    <h2 className="main-title">음식점 상세</h2>

                    <div className="form-container">
                        <div className="form-group">
                            <label htmlFor="name">음식점 이름</label>
                            <input type="text" id="name" name="name" value={data.name} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="owner">사장님 아이디</label>
                            <input type="text" id="owner" name="name" value={data.user.email} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="file">음식점 사진</label>
                            <div id="preview-container"
                                 style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px'}}>
                                {data.placeFiles.map((image, index) => (
                                    <div key={image.id} className="image-preview">
                                        <img src={image.url} alt={`Preview ${image.id}`}
                                             style={{maxWidth: '150px', maxHeight: '150px'}}/>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group menu-container-wrapper">
                            <div id="menu-container">
                                {data.placeMenus.map((row, index) => (
                                    <div key={index} className="menu-item-container">
                                        <div className="menu-item">
                                            <label htmlFor={`menu-item-${index}`}>메뉴명</label>
                                            <input
                                                type="text"
                                                id={`menu-item-${index}`}
                                                value={row.menu}
                                                readOnly
                                            />
                                            <label htmlFor={`menu-price-${index}`}>가격</label>
                                            <input
                                                type="text"
                                                id={`menu-price-${index}`}
                                                value={row.price}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">위치</label>
                            <input type="text" id="location" name="location" value={data.addressNew} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">전화번호</label>
                            <input type="tel" id="phone" name="phone" value={data.phone} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="opening-hours">운영 시간</label>
                            <input type="text" id="opening-hours" name="opening-hours"
                                   value={data.startTime + " ~ " + data.endTime + " " + data.offDay } readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">설명</label>
                            <textarea id="description" name="description" value={data.comment} readOnly></textarea>
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={clickEvent}>수정하기</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default PlaceDetail;
