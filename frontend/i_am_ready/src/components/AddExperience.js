import React, { useState } from 'react';
// import { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const AddExperience = ({camelCase}) => {
    // const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [newExperience, setnewExperience] = useState({
        company: '', location: '', description: '', startDate: '', endDate: ''
    });
    // const [buttonRect, setButtonRect] = useState(null);
    const [cookies] = useState(() => {
        return document.cookie.split(";").reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split("=");
          acc[key] = value;
          return acc;
        }, {});
      });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // console.log(newCertification);
        const response = await fetch("http://localhost:5000/api/v1/job_seeker/experience", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Cookie": JSON.stringify(cookies),
            "Authorization": JSON.stringify(cookies)
        },
        body: JSON.stringify(camelCase(newExperience)),
        });
        if (!response.ok) {
            alert('Failed to add experience');
        } else {
            alert("Experience added successfully")
        }
        setnewExperience({ company: '', location: '', description: '', startDate: '', endDate: ''});
        setShowForm(false);
    } catch (error) {
        console.error(error);
    }
    };
    const handleButtonClick = (e) => {
    // const buttonRect = e.target.getBoundingClientRect();
    // setButtonRect(buttonRect);
    setShowForm(true);
    };
    const handleEducationInputChange = (e) => {
        setnewExperience({
            ...newExperience,
            [e.target.name]: e.target.value,
        });
    };

    return (
    <div>
        <button className='btn_add' onClick={handleButtonClick}>Add</button>
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
                <h3>Add new experience</h3>

                <input
                    type='text'
                    name='company'
                    value={newExperience.company}
                    onChange={handleEducationInputChange}
                    placeholder='Company'
                    required
                />
                <input
                    type='text'
                    name='location'
                    value={newExperience.location}
                    onChange={handleEducationInputChange}
                    placeholder='Location'
                    required
                />
                <input
                    type='text'
                    name='description'
                    value={newExperience.description}
                    onChange={handleEducationInputChange}
                    placeholder='Description'
                    required
                />
                <label><em>Start Date</em></label>
                <input
                    type='date'
                    name='startDate'
                    value={newExperience.startDate}
                    onChange={handleEducationInputChange}
                    placeholder='Start Date'
                    required
                />
                <label><em>End Date</em></label>
                <input
                    type='date'
                    name='endDate'
                    value={newExperience.endDate}
                    onChange={handleEducationInputChange}
                    placeholder='End Date'
                    required
                />
                <button type="submit">Save</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
            </form>
        </div>
        )}
    </div>
    );
};

export default AddExperience;
