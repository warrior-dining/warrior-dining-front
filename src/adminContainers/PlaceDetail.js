import React, { useState, useEffect } from 'react';
import '../css/restaurantCreate.css';
import {useNavigate} from "react-router-dom";

const PlaceDetail = () => {
    const navigate = useNavigate();
    const images = [];
    const menuItems = [];
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
                                <input type="text" id="owner" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">음식점 이름</label>
                                <input type="text" id="name" name="name" required />
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
                                    {menuItems.map(item => (
                                        <div key={item.id} className="menu-item-container">
                                            <div className="menu-item">
                                                <label htmlFor={`menu-item-${item.id}`}>메뉴명</label>
                                                <input
                                                    type="text"
                                                    id={`menu-item-${item.id}`}
                                                    value={item.name}
                                                    readOnly
                                                />
                                                <label htmlFor={`menu-price-${item.id}`}>가격</label>
                                                <input
                                                    type="number"
                                                    id={`menu-price-${item.id}`}
                                                    value={item.price}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">위치</label>
                                <input type="text" id="location" name="location" readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">전화번호</label>
                                <input type="tel" id="phone" name="phone" readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="opening-hours">운영 시간</label>
                                <input type="text" id="opening-hours" name="opening-hours" readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">설명</label>
                                <textarea id="description" name="description" readOnly></textarea>
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
