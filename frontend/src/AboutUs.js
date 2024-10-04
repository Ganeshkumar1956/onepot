import React from 'react';
import './styles.css';

function AboutUs() {
  return (
    <div className="about-us-page">
      <h1 className="about-header">About Us</h1>
      <div className="about-container">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At OnePot, our mission is to inspire and empower home cooks of all levels
            to explore, create, and share delicious recipes from around the world. 
            We believe that cooking is an art, a science, and a way to bring people together.
          </p>
        </div>
        <div className="about-section">
          <h2>Join Us</h2>
          <p>
            We invite you to join our community! Whether you're a seasoned chef or a 
            kitchen novice, there’s a place for you at OnePot. Share your recipes, 
            connect with fellow food lovers, and discover new culinary adventures!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
