import React, { useState } from 'react';
import '../css/restaurantCreate.css';

const PlaceAdd = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [menuItems, setMenuItems] = useState([{ id: 1, name: '', price: '' }]);

    const previewImages = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setUploadedImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (image) => {
        setUploadedImages(prev => prev.filter(img => img !== image));
    };

    const addMenuItem = () => {
        setMenuItems(prev => [...prev, { id: prev.length + 1, name: '', price: '' }]);
    };

    const deleteMenuItem = (id) => {
        if (menuItems.length > 1) {
            setMenuItems(prev => prev.filter(item => item.id !== id));
        } else {
            alert('최소 1개의 메뉴 항목이 필요합니다.');
        }
    };

    const handleMenuItemChange = (id, field, value) => {
        setMenuItems(prev => 
            prev.map(item => 
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 추가적인 폼 제출 처리 로직을 여기에 작성
        alert('폼이 제출되었습니다!'); // 예시
    };

    return (
        <>
            <main>
                <div className="container">
                    <h2>음식점 등록</h2>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
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
                                <input type="file" id="file" name="file" accept="image/*" multiple required onChange={previewImages} />
                                <div id="preview-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                                    {uploadedImages.map((image, index) => (
                                        <div key={index} className="image-preview">
                                            <img src={image} alt={`Preview ${index}`} style={{ maxWidth: '150px', maxHeight: '150px' }} />
                                            <button type="button" className="remove-btn" onClick={() => removeImage(image)}>&times;</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="form-group menu-container-wrapper">
                                <div className="menu-header">
                                    <label>메뉴 추가</label>
                                    <button type="button" className="add-menu-item" onClick={addMenuItem}>+</button>
                                </div>
                                <div id="menu-container">
                                    {menuItems.map(item => (
                                        <div key={item.id} className="menu-item-container">
                                            <div className="menu-item">
                                                <label htmlFor={`menu-item-${item.id}`}>메뉴명</label>
                                                <input
                                                    type="text"
                                                    id={`menu-item-${item.id}`}
                                                    value={item.name}
                                                    onChange={(e) => handleMenuItemChange(item.id, 'name', e.target.value)}
                                                    placeholder="메뉴명을 입력하세요"
                                                    required
                                                />
                                                <label htmlFor={`menu-price-${item.id}`}>가격</label>
                                                <input
                                                    type="number"
                                                    id={`menu-price-${item.id}`}
                                                    value={item.price}
                                                    onChange={(e) => handleMenuItemChange(item.id, 'price', e.target.value)}
                                                    placeholder="가격을 입력하세요"
                                                    required
                                                />
                                                <button type="button" className="delete-menu-item" onClick={() => deleteMenuItem(item.id)}>−</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">위치</label>
                                <input type="text" id="location" name="location" required />
                                <button type="button" >주소찾기</button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">전화번호</label>
                                <input type="tel" id="phone" name="phone" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="opening-hours">운영 시간</label>
                                <input type="text" id="opening-hours" name="opening-hours" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">설명</label>
                                <textarea id="description" name="description"></textarea>
                            </div>
                            <div className="form-actions">
                                <button type="submit">등록하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default PlaceAdd;
