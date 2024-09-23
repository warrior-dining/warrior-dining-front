import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Main from './containers/Main';
import TopReservation from './containers/TopReservation';
import MonthBest from './containers/MonthBest';
import InquiryFaq from './containers/InquiryFaq';
import RestaurantList from './containers/RestaurantList';
import './css/home.css';
import './css/default.css';


function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/TopReservation" element={<TopReservation />} /> 
        <Route path="/MonthBest" element={<MonthBest />} />
        <Route path="/RestaurantList" element={<RestaurantList />} />
        <Route path="/InquiryFaq" element={<InquiryFaq />} />
        {/* 다른 경로들도 여기 추가할 수 있습니다. */}
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
