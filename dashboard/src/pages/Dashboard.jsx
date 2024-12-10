import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Dashboard.css';
import Navbar from './Navbar';

function Dashboard() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };

  const [values, setValues] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    // Retrieve products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setValues(storedProducts);
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className='main-section'>
        <h2>Welcome to the Bookly!</h2>
        <p>
          Bookly is a digital library platform that provides easy access to a wide collection of e-books.
        </p>
      </div>

      <div className="menu">
        <h1>Books</h1>
        <div className="menu-container">
          {values.length === 0 ? (
            <p>No books available. Add books in Manage Products.</p>
          ) : (
            values.map((pro) => (
              <div key={pro?._id} className="card">
                <div className="image-container">
                  <img src={pro?.image} alt={pro?.name} />
                </div>
                <div className="label">
                  <h3>{pro?.name}</h3>
                </div>
                <div className="description">
                  <p>{pro?.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
