import '../css/restaurantCreate.css';
import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { useAuth, refreshToken } from '../context/AuthContext';
import axiosInstance from '../context/AxiosInstance';


const PlaceAdd = () => {
    const {reissueToken} = useAuth();
    const [daum, setDaum] = useState(null);
    const navigator = useNavigate();
    const [viewImages, setViewImages] = useState([]);
    const [uploadImages, setUploadImages] = useState([]);
    const [error, setError] = useState('');
    const [menuItems, setMenuItems] = useState([{ id: 1, name: '', price: '' }]);
    const [placeInfo, setPlaceInfo] = useState({
            email: '',
            name: '',
            category: 5,
            location: '',
            phone: '',
            starttime: '',
            endtime: '',
            offday: '',
            description: ''
    });
    useEffect(() => {
        const loadDaumPostcode = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
                script.onload = () => {
                    resolve(window.daum);
                };
                document.body.appendChild(script);
            });
        };

        loadDaumPostcode().then((loadedDaum) => {
            setDaum(loadedDaum);
        });

        // 클린업 함수 (스크립트 제거)
        return () => {
            const scripts = document.querySelectorAll('script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]');
            scripts.forEach((script) => script.remove());
        };
    }, []);

    const openKakao = () => {
        if (daum) {
            new daum.Postcode({
                oncomplete: function (data) {
                    let addr = '';
                    let extraAddr = '';

                    if (data.userSelectedType === 'R') {
                        addr = data.roadAddress;
                    } else {
                        addr = data.jibunAddress;
                    }

                    if (data.userSelectedType === 'R') {
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddr += data.bname;
                        }
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        if (extraAddr !== '') {
                            extraAddr = ' (' + extraAddr + ')';
                        }
                    }

                    document.getElementById("location").value = addr;
                    document.getElementById("location").focus();
                    handlePlaceInfoChange('location', addr);
                }
            }).open();
        }
    }


    const previewImages = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setUploadImages([...uploadImages, ...files]);
        setViewImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (image) => {
        setViewImages(prev => prev.filter(img => img !== image));
        setUploadImages(prev => prev.filter(img => URL.createObjectURL(img) !== image));
    };

    const addMenuItem = () => {
        if (menuItems.length < 10) {
            setMenuItems(prev => [...prev, { id: prev.length + 1, menu: '', price: '' }]);
        } else  {
            alert('메뉴 항목은 최대 10개 까지 작성할 수 있습니다.');
        }
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

    const handlePlaceInfoChange = (field, value) => {
        setPlaceInfo(prev => ({ ...prev, [field]: value }));
    };

    const submitEvent = (e) => {
        e.preventDefault();
        const formData = new FormData();
        uploadImages.forEach(img => {
            formData.append("file", img );
        })
        formData.append("menu", JSON.stringify(menuItems) );
        formData.append("place", JSON.stringify(placeInfo) );

        axiosInstance.post("/api/admin/places/", formData)
            .then((res) => {
                refreshToken(res.data, reissueToken);
                if(res.data.status === true) {
                    alert('저장 되었습니다.');
                    navigator("/admin/places/info/" + res.data.results.id);
                }
            })
            .catch(error => {
                if (error.response) { setError(error.response.data.message);}
            });
    };

    return (
        <>
            <main>
                <div className="container">

                    <h2 className="main-title">음식점 등록</h2>

                    <div className="form-container">
                        <form onSubmit={submitEvent}>
                            <div className="form-group">
                                <label htmlFor="name">음식점 이름</label>
                                <input type="text" id="name" name="name" value={placeInfo.name} onChange={(e) => {
                                    handlePlaceInfoChange('name', e.target.value)
                                }} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="owner">사장님 아이디</label>
                                <input type="text" id="owner" name="email" value={placeInfo.email} onChange={(e) => {
                                    handlePlaceInfoChange('email', e.target.value)
                                }} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">카테고리</label>
                                <select id="category"
                                        value={placeInfo.category}
                                        onChange={(e) => {
                                            handlePlaceInfoChange('category', e.target.value)
                                        }}>
                                    <option value="5">한식</option>
                                    <option value="6">중식</option>
                                    <option value="7">일식</option>
                                    <option value="8">양식</option>
                                    <option value="9">분식</option>
                                    <option value="10">아시안</option>
                                    <option value="11">기타</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="file">음식점 사진</label>
                                <input type="file" id="file" name="file" accept="image/*" multiple required
                                       onChange={previewImages}/>
                                <div id="preview-container"
                                     style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px'}}>
                                    {viewImages.map((image, index) => (
                                        <div key={index} className="image-preview">
                                            <img src={image} alt={`Preview ${index}`}
                                                 style={{maxWidth: '150px', maxHeight: '150px'}}/>
                                            <button type="button" className="remove-btn"
                                                    onClick={() => removeImage(image)}>&times;</button>
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
                                                <button type="button" className="delete-menu-item"
                                                        onClick={() => deleteMenuItem(item.id)}>−
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">위치</label>
                                <input type="text" id="location" name="location" value={placeInfo.location} readOnly/>
                                <button type="button" onClick={openKakao}>주소찾기</button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">전화번호</label>
                                <input type="tel" id="phone" name="phone" value={placeInfo.phone}
                                       onChange={(e) => handlePlaceInfoChange('phone', e.target.value)} required/>
                            </div>
                            <div className="form-group opening-hour-container-wrapper">
                                <div className="opening-hour-header">
                                    <label htmlFor="openingHours">운영 시간 [HH:mm]</label>
                                </div>
                                <div className="opening-hour-container">
                                    <div className="opening-hour">
                                        <label htmlFor="starttime">오픈 시간</label>
                                        <input type="text" id="starttime" name="starttime"
                                               value={placeInfo.starttime}
                                               onChange={(e) => handlePlaceInfoChange('starttime', e.target.value)}/>
                                        <label htmlFor="endtime">마감 시간</label>
                                        <input type="text" id="endtime" name="endtime"
                                               value={placeInfo.endtime}
                                               onChange={(e) => handlePlaceInfoChange('endtime', e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="offday">휴무일</label>
                                <input type="text" id="offday" name="offday" value={placeInfo.offday}
                                       onChange={(e) => handlePlaceInfoChange('offday', e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">설명</label>
                                <textarea id="description" name="description" value={placeInfo.description}
                                          onChange={(e) => handlePlaceInfoChange('description', e.target.value)}></textarea>
                            </div>
                            <div className="form-actions">
                                <button type="submit">등록하기</button>
                            </div>
                            {error && <div className="error">{error}</div>}
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default PlaceAdd;
