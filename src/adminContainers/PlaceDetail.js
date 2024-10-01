import React, { useState, useEffect } from 'react';
import '../css/restaurantCreate.css';
import {useNavigate} from "react-router-dom";

const data = {
    onwer: "test",
    name: "강남불백 신촌점",
    addr: "서울 서대문구 연세로4길 6",
    phone: "02-313-5988",
    runtime: "08:00 ~ 21:00",
    comment: "맛있음당~"
}
const menuItems = [
    {
        menu: "불백정식",
        price: "12,000"
    },
    {
        menu: "우삼겹정식",
        price: "13,000"
    }
];

const PlaceDetail = () => {
    const navigate = useNavigate();
    const images = [];
    const clickEvent = () => {
        navigate("/admin/places/edit");
    }
    return (
        <>
            <main>
                <div className="container">

                    <h2 className="main-title">음식점 상세</h2>

                    <div className="form-container">
                            <div className="form-group">
                                <label htmlFor="owner">아이디</label>
                                <input type="text" id="owner" name="name" value={data.onwer} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">음식점 이름</label>
                                <input type="text" id="name" name="name" value={data.name} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="file">음식점 사진</label>
                                <div id="preview-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                                    {images.map((image, index) => (
                                        <div key={index} className="image-preview">
                                            <img src={image} alt={`Preview ${index}`} style={{ maxWidth: '150px', maxHeight: '150px' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group menu-container-wrapper">
                                <div id="menu-container">
                                    {menuItems.map((row, index) => (
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
                                <input type="text" id="location" name="location" value={data.addr} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">전화번호</label>
                                <input type="tel" id="phone" name="phone" value={data.phone} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="opening-hours">운영 시간</label>
                                <input type="text" id="opening-hours" name="opening-hours" value={data.runtime} readOnly />
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
