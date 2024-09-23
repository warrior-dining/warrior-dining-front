import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Main from './containers/Main';
import TopReservation from './containers/TopReservation';
import MonthBest from './containers/MonthBest';

import './css/default.css';
import './css/mainAdmin.css';
import MembersAdmin from './containers/MembersAdmin';
import PlacesAdmin from './containers/PlacesAdmin';
import ReviewsAdmin from './containers/ReviewsAdmin';
import InquiriesAdmin from './containers/InquiriesAdmin';
import NavBarAdmin from './components/NavBarAdmin';
import MainAdmin from './containers/MainAdmin';



function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <NavBarAdmin />
          <Routes>
            {/* 다른 경로들도 여기 추가할 수 있습니다. */}
            <Route path="/admin/members" element={<MembersAdmin />} /> 
            <Route path="/admin/places" element={<PlacesAdmin />} />
            <Route path="/admin/reviews" element={<ReviewsAdmin />} />
            <Route path="/admin/reservations" element={<ReviewsAdmin/>} />
            <Route path="/admin/inquiries" element={<InquiriesAdmin />} />  
            <Route path="/" element={<MainAdmin />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  </>
  );
}

export default App;
