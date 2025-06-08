'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Review = () => {
  const reviews = [
    {
      id: 1,
      text: "Desire4Travels made our Himachal trip absolutely seamless – from stays to sightseeing, everything was perfectly arranged!",
      author: "Abu Sarfaraz",
      image: "/assets/abu sarfaraz.webp",
      rating: 5
    },
    {
      id: 2,
      text: "Had the best time in Goa with my friends, all thanks to Desire4Travels for curating such a fun and hassle-free itinerary!",
      author: "Shikha",
      image: "/assets/Shikha.webp",
      rating: 4
    },
    {
      id: 3,
      text: "Professional, friendly, and super responsive – our Kerala getaway couldn't have been better planned!",
      author: "Ananya",
      image: "/assets/ananya.webp",
      rating: 5
    },
    {
      id: 4,
      text: "From the first call to the final day of the trip, Desire4Travels took care of every detail. Highly recommended!",
      author: "Deepak",
      image: "/assets/deepak.webp",
      rating: 4
    },
    {
      id: 5,
      text: "Incredible service and thoughtful planning – they turned our group trip into an unforgettable experience!",
      author: "Shivam",
      image: "/assets/shivam.webp",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(goToNext, 5000);
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToReview = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? 'star filled' : 'star'}>
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );

  return (
    <div className="review-carousel-container">
      <div className="background-overlay"></div>
      <h2 className="section-title">What Our Travelers Say</h2>

      {!isMobile && (
        <>
          <button className="carousel-button prev outside" onClick={goToPrev}>
            &#10094;
          </button>
          <button className="carousel-button next outside" onClick={goToNext}>
            &#10095;
          </button>
        </>
      )}

      <div className="review-carousel">
        <div className="reviews-wrapper">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`review-card ${index === currentIndex ? 'active' : ''}`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
                opacity: index === currentIndex ? 1 : 0,
                transition: 'all 0.5s ease-in-out'
              }}
            >
              <div className="review-content">
                {renderStars(review.rating)}
                <p className="review-text">"{review.text}"</p>
                <div className="review-author">
                  <Image
                    src={review.image}
                    alt={review.author}
                    width={100}
                    height={100}
                    className="author-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100";
                    }}
                  />
                  <span className="author-name">{review.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isMobile && (
        <div className="mobile-controls">
          <button className="carousel-button prev" onClick={goToPrev}>
            &#10094;
          </button>
          <button className="carousel-button next" onClick={goToNext}>
            &#10095;
          </button>
        </div>
      )}

      <div className="carousel-indicators">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToReview(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
