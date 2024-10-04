import React, { useState } from 'react';
import './styles.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message Sent Successfully!');
    // Handle form submission logic here, e.g., sending form data to backend.<Route path="/profile" element={<Profile />} />
  };

  return (
    <div className="contact-us-page">
      <h1 className="contact-header">Contact Us</h1>
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>If you have any questions or inquiries, feel free to reach out to us. We're here to help!</p>
          <div className="info-item">
            <i className="fas fa-phone"></i> 9092726117
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i> barath@OnePot.com
          </div>
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i> Musuri,Trichy
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                className="form-textarea"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
