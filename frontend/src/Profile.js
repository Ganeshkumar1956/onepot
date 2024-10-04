import React from 'react';
import './styles.css'; // Make sure to create a CSS file for additional styling

function Profile() {
  return (
    <div className="profile-page">
        <h1 className="prof">Your Profile</h1>
      <div className="profile-header">
        <img src="profile-image.jpeg" alt=" Your Profile" className="profile-image" />
        <div className="profile-info">
          <p className="profile-name">Name: Name</p>
          <p className="profile-name">Email: onepot@gmail.com</p>
          <p className="profile-bio">
            Passionate cook and recipe creator. Loves exploring different cuisines and sharing them with others.
          </p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">11</span>
          <span className="stat-label">Recipes Created</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">10M</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">68M</span>
          <span className="stat-label">Likes</span>
        </div>
      </div>

      <div className="profile-footer">
        <button className="edit-profile-btn">Edit Profile</button>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
