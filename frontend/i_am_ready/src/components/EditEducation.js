import React, { useState } from 'react';


const EditEducation = ({jobSeeker, showForm, setShowForm, objId}) => {
    const [newEducation, setnewEducation] = useState({
        degree: "",
        school: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: ""
    });
    // write a function that takes in a list of object and filter the list based on the id attribute and return the just one object with the id
    const education = jobSeeker.education.filter((edu) => edu.id === objId);
    
    const [cookies] = useState(() => {
        return document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {});
    });
    const deleteEducation = async (e) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/job_seeker/education?education_id=${objId}`, {
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
                alert("Education deleted successfully")
            }
            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:5000/api/v1/job_seeker/education?education_id=${objId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Cookie": JSON.stringify(cookies),
            "Authorization": JSON.stringify(cookies)
        },
        body: JSON.stringify(newEducation),
        });
        if (response.status !== 200) {
            alert('Network response was not ok');
        } else {
            alert("Education updated successfully")
        }
        setnewEducation({
            degree: "",
            school: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: ""
        });
        setShowForm(false);
    } catch (error) {
        console.error(error);
    }
    };

    const handleEducationInputChange = (e) => {
        setnewEducation({
            ...newEducation,
            [e.target.name]: e.target.value,
        });
    };

    return (
    <div>
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
                <h3>Update education</h3>

                <label><em>Degree</em></label>
                <input
                    type='text'
                    name='degree'
                    value={newEducation.degree || education[0].degree}
                    onChange={handleEducationInputChange}
                    required
                />
                <label><em>Field of Study</em></label>
                <input
                    type='text'
                    name='fieldOfStudy'
                    value={newEducation.fieldOfStudy || education[0].fieldOfStudy}
                    onChange={handleEducationInputChange}
                    required
                />
                <label><em>School</em></label>
                <input
                    type='text'
                    name='school'
                    value={newEducation.school || education[0].school}
                    onChange={handleEducationInputChange}
                    required
                />
                <label><em>Start Date</em></label>
                <input
                    type='date'
                    name='startDate'
                    value={newEducation.startDate}
                    onChange={handleEducationInputChange}
                    required
                />
                <label><em>End Date</em></label>
                <input
                    type='date'
                    name='endDate'
                    value={newEducation.endDate}
                    onChange={handleEducationInputChange}
                    // placeholder='End Date'
                    required
                />
                <button type="submit">Save</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
                <button onClick={deleteEducation}>Delete</button>
            </form>
        </div>
        )}
    </div>
    );
};

export default EditEducation;
