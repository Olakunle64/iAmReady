import React, { useState } from 'react';


const EditExperience = ({jobSeeker, showForm, setShowForm, objId}) => {

    const experience = jobSeeker.experience.filter((exp) => exp.id === objId);
    const [newExperience, setnewExperience] = useState(experience[0] || {
        company: "",
        location: "",
        description: "",
        startDate: "",
        endDate: "",
    });
    // write a function that takes in a list of object and filter the list based on the id attribute and return the just one object with the id
    
    
    const [cookies] = useState(() => {
        return document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {});
    });
    const deleteExperience = async (e) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/job_seeker/experience?experience_id=${objId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Cookie": JSON.stringify(cookies),
                    "Authorization": JSON.stringify(cookies)
                },
            });
            if (response.status !== 200) {
                alert('Network response was not ok');
            } else {
                alert("Experience deleted successfully")
            }
            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`https://iamready.onrender.com/api/v1/job_seeker/experience?experience_id=${objId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Cookie": JSON.stringify(cookies),
            "Authorization": JSON.stringify(cookies)
        },
        body: JSON.stringify(newExperience),
        });
        if (response.status !== 200) {
            alert('Network response was not ok');
        } else {
            alert("Experience updated successfully")
        }
        setnewExperience({
            company: "",
            location: "",
            description: "",
            startDate: "",
            endDate: ""
        });
        setShowForm(false);
    } catch (error) {
        console.error(error);
    }
    };

    const handleExperienceInputChange = (e) => {
        setnewExperience({
            ...newExperience,
            [e.target.name]: e.target.value,
        });
    };

    return (
    <div>
        {/* <button className='btn_add' onClick={handleButtonClick}>Add</button> */}
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
                <h3>Update experience</h3>

                <label><em>Company</em></label>
                <input
                    type='text'
                    name='company'
                    value={newExperience.company || experience[0].company}
                    onChange={handleExperienceInputChange}
                    required
                />
                <label><em>Location</em></label>
                <input
                    type='text'
                    name='location'
                    value={newExperience.location || experience[0].location}
                    onChange={handleExperienceInputChange}
                    required
                />
                <label><em>Description</em></label>
                <input
                    type='text'
                    name='description'
                    value={newExperience.description || experience[0].description}
                    onChange={handleExperienceInputChange}
                    required
                />
                <label><em>Start Date</em></label>
                <input
                    type='date'
                    name='startDate'
                    value={newExperience.startDate}
                    onChange={handleExperienceInputChange}
                    required
                />
                <label><em>End Date</em></label>
                <input
                    type='date'
                    name='endDate'
                    value={newExperience.endDate}
                    onChange={handleExperienceInputChange}
                    required
                />
                <button type="submit">Save</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
                <button onClick={deleteExperience}>Delete</button>
            </form>
        </div>
        )}
    </div>
    );
};

export default EditExperience;
