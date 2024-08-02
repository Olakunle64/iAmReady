import React from 'react';

export default function Testimonial({ review }) {
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span key={i} className="star filled">★</span>); // Filled star
            } else {
                stars.push(<span key={i} className="star">☆</span>); // Empty star
            }
        }
        return stars;
    };

    return (
        review && (
            <div className="testimonial-card">
                <h3 className="testimonial-description">"{review.description}"</h3>
                <h2 className="testimonial-name"><b>{review.companyName || `${review.firstName} ${review.lastName}`}</b></h2>
                <div className="testimonial-rating">
                    {renderStars(review.rating)}
                </div>
            </div>
        )
    );
}
