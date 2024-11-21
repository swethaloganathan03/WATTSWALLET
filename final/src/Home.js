import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Home.css';
import homeImage from './electricity1.png';
import aboutUsImage from './payimage.png';
import payImage from './accmanage.png';
import transactionLogImage from './notification.png';
import BillCal from './BillCal'; 

const Home = ({ isLoggedIn, handleLogout }) => {
  const homeRef = useRef(null);
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);
  const billRef = useRef(null);

  const handleScrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('Ref not found:', ref);
    }
  };

  return (
    <div className="content-container">
      {/* Navbar */}
      <nav className="navbar">
        <ul className="navbar-list">
          <li onClick={() => handleScrollToSection(homeRef)}>Home</li>
          <li onClick={() => handleScrollToSection(aboutUsRef)}>About Us</li>
          <li onClick={() => handleScrollToSection(servicesRef)}>Services</li>
          <li onClick={() => handleScrollToSection(billRef)}>Bill Calculator</li>
          <li>
            <Link to="/admin">Admin Login</Link> {/* Link to Admin Login */}
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link> {/* Link to Login */}
            </li>
          )}
        </ul>
      </nav>

      {/* Welcome Section */}
      <div className="welcome-section" ref={homeRef}>
        <div className="image-container">
          <img src={homeImage} alt="Electricity" />
        </div>
        <div className="center-content">
          <h2 className="welcome-text">WELCOME TO WATTWALLET</h2>
          <p className="slogan-text">Efficient power, seamless bill calculation.</p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us-section" ref={aboutUsRef}>
        <img src={aboutUsImage} alt="About Us" className="side-image" />
        <div className="about-us-content">
          <h2>About Us</h2>
          <p>
            At WattWallet, we are committed to revolutionizing the way people manage their electricity payments. 
            Our mission is to provide a seamless and user-friendly platform that simplifies the billing process 
            for customers. With our innovative technology, we aim to empower users to take control of their energy 
            consumption and payments. Founded by a team of passionate energy enthusiasts, WattWallet brings together 
            expertise in technology and electricity management. We believe that transparency and accessibility are 
            key to enhancing customer experience. Our goal is to create a sustainable future by promoting energy 
            efficiency and responsible usage.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="chin" ref={servicesRef}>
        <h2>Our Services</h2>
        <div className="bbb">
          <div className="aaa">
            <img src={payImage} alt="Pay" className="service-image" />
            <h3>Pay</h3>
            <p>
              Our payment service offers an easy and secure way to pay your electricity bills online. 
              Experience hassle-free transactions with instant confirmations and multiple payment options.
            </p>
            <Link to="/login">
              <button className="see-more-btn">See More</button> {/* Navigates to Login */}
            </Link>
          </div>
          
        </div>
      </div>

      {/* Bill Calculator Section */}
      <div className="bill-cal-section" ref={billRef}>
        <BillCal />
      </div>
    </div>
  );
};

export default Home;
