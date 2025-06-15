import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaTwitter
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    message: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('sending');

    try {
      await axios.post('https://desire4travels-1.onrender.com/contact-us', formData);
      setFormData({ name: '', email: '', phoneNo: '', message: '' });
      setSubmissionStatus('success');
      setTimeout(() => setSubmissionStatus(null), 5000);
    } catch (error) {
      setSubmissionStatus('error');
      setTimeout(() => setSubmissionStatus(null), 5000);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Desire4Travels – Get in Touch with Our Travel Experts</title>
        <meta
          name="description"
          content="Have questions or need help planning your trip? Contact Desire4Travels today and connect with our travel experts for personalized support and quick responses."
        />
        <meta
          name="keywords"
          content="contact Desire4Travels, travel support, get in touch, plan your trip, Desire4travels customer service, travel agency contact, contact travel experts, trip assistance, D4T, Desire4travels phone number, connect with travel planner, travel consultation"
        />
        <meta property="og:title" content="Contact Desire4Travels – Get in Touch with Our Travel Experts" />
        <meta
          property="og:description"
          content="Have questions or need help planning your trip? Contact Desire4Travels today and connect with our travel experts for personalized support and quick responses."
        />
      </Head>

      <header className="w-screen bg-gradient-to-r from-[#0F172A] to-[#5B76D6] py-16 text-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] text-center">
        <div className="max-w-4xl mx-auto px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Contact Desire4Travels</h1>
          <p className="text-xl">We're here to help you plan your perfect trip!</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 my-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
            <h2 className="flex items-center justify-center gap-2 text-2xl text-gray-800 mb-6">
              <FaEnvelope /> Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg text-lg"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg text-lg"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="Your Mobile Number"
                  pattern="[0-9]{10,15}"
                  title="Please enter a valid mobile number"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg text-lg"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="5"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg text-lg min-h-[140px]"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={submissionStatus === 'sending'}
                className={`w-full py-3 px-8 rounded-md text-white font-medium text-lg ${
                  submissionStatus === 'sending' ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                } transition-colors`}
              >
                {submissionStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {submissionStatus === 'success' && (
                <div className="mt-4 p-3 rounded bg-green-100 text-green-800 font-semibold text-center">
                  Message sent successfully!
                </div>
              )}
              {submissionStatus === 'error' && (
                <div className="mt-4 p-3 rounded bg-red-100 text-red-800 font-semibold text-center">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-6 text-gray-800">
                <div className="flex flex-col items-center text-center">
                  <FaWhatsapp className="text-green-500 text-3xl mb-2" />
                  <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                  <a 
                    href="https://wa.me/+917977022583" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Chat Now
                  </a>
                  <p>+91 7977022583</p>
                </div>

                <div className="border-t border-gray-200 pt-6 flex flex-col items-center text-center">
                  <FaPhone className="text-blue-500 text-3xl mb-2" />
                  <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                  <p>+91 7977022583</p>
                  <p>+91 7409030585</p>
                </div>

                <div className="border-t border-gray-200 pt-6 flex flex-col items-center text-center">
                  <FaMapMarkerAlt className="text-blue-500 text-3xl mb-2" />
                  <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                  <p className="text-gray-600">
                    Desire4Travels A-84/B,<br />
                    Street No. 9 New Ashok Nagar<br />
                    New Delhi – 110096<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex justify-center gap-6 text-2xl">
                <a 
                  href="https://facebook.com/desire4travels" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#3b5998] hover:scale-110 transition-transform"
                >
                  <FaFacebook />
                </a>
                <a 
                  href="https://instagram.com/desire4travels" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#e1306c] hover:scale-110 transition-transform"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="https://x.com/desire4travels" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#1da1f2] hover:scale-110 transition-transform"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;