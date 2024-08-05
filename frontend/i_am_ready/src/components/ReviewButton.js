import React, { useState } from 'react';

export default function ReviewButton({url}) {
    const [showForm, setShowForm] = useState(false);
    const [newReview, setnewReview] = useState({ description: '', rating: ''});
    const [cookies] = useState(() => {
        return {
            session_id: localStorage.getItem("session_id") || "",
            user_type: localStorage.getItem("user_type") || "",
        };
    });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(newReview);
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Cookie": JSON.stringify(cookies),
            "Authorization": JSON.stringify(cookies)
        },
        body: JSON.stringify(newReview),
        });
        if (!response.ok) {
            alert('Failed to add review');
        } else {
            alert("Review added successfully")
        }
        setnewReview({ description: '', rating: ''});
        setShowForm(false);
    } catch (error) {
        console.error(error);
    }
    };

    const handleButtonClick = (e) => {
    setShowForm(true);
    };
    const handleEducationInputChange = (e) => {
        setnewReview({
            ...newReview,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <>
            <button onClick={handleButtonClick} className="button">
                Rate Us
            </button>
            {showForm && (
            <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '40px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                zIndex: 100,
                width: '500px',
                fontSize: '18px',
            }}
            >
                <form className='formEdu' onSubmit={handleSubmit}>
                    <h3>Review iAmReady Website</h3>

                    <textarea
                    name='description'
                    value={newReview.description}
                    onChange={handleEducationInputChange}
                    placeholder='Comment'
                    required
                    />
                    <input
                        type='number'
                        name='rating'
                        value={newReview.rating}
                        onChange={handleEducationInputChange}
                        placeholder='Rating (1-5)'
                        min='1'
                        max='5'
                        required
                    />
                    <button type="submit">Save</button>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            </div>
            )}
        </>
    )
}