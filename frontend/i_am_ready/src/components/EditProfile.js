import React, { useState } from 'react';


export default function EditProfile({icon, jobSeeker}) {
    const [showForm, setShowForm] = useState(false);
    const [updateJobSeeker, setupdateJobSeeker] = useState({
        firstName: jobSeeker.job_seeker.firstName, LastName: jobSeeker.job_seeker.lastName,
        phoneNumber: jobSeeker.job_seeker.phoneNumber, linkedIn: jobSeeker.job_seeker.linkedIn,
        country: jobSeeker.job_seeker.country, city: jobSeeker.job_seeker.city, skills: jobSeeker.job_seeker.skills.join(','),
        bio: jobSeeker.job_seeker.bio, jobName: jobSeeker.job_seeker.jobName
    });
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
            const response = fetch("http://localhost:5000/api/v1/job_seeker", {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                "Cookie": JSON.stringify(cookies),
                "Authorization": JSON.stringify(cookies)
                },
                // in the updateJobSeeker try to convert skills to an array
                body: JSON.stringify({...updateJobSeeker, skills: updateJobSeeker.skills.split(',')}
                ),
            });
        
            if ((await response).status !== 200) {
                alert('Network response was not ok');
            } else {
                alert("Profile updated successfully");
            }
        
            setupdateJobSeeker({
                firstName: jobSeeker.job_seeker.firstName, LastName: jobSeeker.job_seeker.lastName,
                phoneNumber: jobSeeker.job_seeker.phoneNumber, linkedIn: jobSeeker.job_seeker.linkedIn,
                country: jobSeeker.job_seeker.country, city: jobSeeker.job_seeker.city, skills: jobSeeker.job_seeker.skills.join(','),
                bio: jobSeeker.job_seeker.bio, jobName: jobSeeker.job_seeker.jobName
            });
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
    const handleJobSeekerInputChange = (e) => {
        setupdateJobSeeker({
            ...updateJobSeeker,
            [e.target.name]: e.target.value,
        });
    };

    return (
    <div>
        <button onClick={handleButtonClick}>{icon}</button>
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
                <h3>Update Profile</h3>

                <label>First Name</label>
                <input
                    type='text'
                    name='firstName'
                    value={updateJobSeeker.firstName}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='First Name'
                    required
                />
                <label>Last Name</label>
                <input
                    type='text'
                    name='LastName'
                    value={updateJobSeeker.LastName}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Last Name'
                    required
                />
                <label>Phone Number</label>
                <input
                    type='text'
                    name='phoneNumber'
                    value={updateJobSeeker.phoneNumber}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Phone Number'
                    // required
                />
                <label>LinkedIn</label>
                <input
                    type='text'
                    name='linkedIn'
                    value={updateJobSeeker.linkedIn}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Linkedin'
                    // required
                />
                <label>Country</label>
                <input
                    type='text'
                    name='country'
                    value={updateJobSeeker.country}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Country'
                    required
                />
                <label>City</label>
                <input
                    type='text'
                    name='city'
                    value={updateJobSeeker.city}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='City'
                    required
                />
                <label>Professional Summary</label>
                <textarea
                    name='bio'
                    value={updateJobSeeker.bio}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Professional Summary'
                    // required
                />
                <label>Skills</label>
                <input
                    type='text'
                    name='skills'
                    value={updateJobSeeker.skills}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Skills'
                    required
                />
                <label>Job Name</label>
                <input
                    type='text'
                    name='jobName'
                    value={updateJobSeeker.jobName}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Job Name'
                    // required
                />
                <button type="submit">Save</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
            </form>
        </div>
        )}
    </div>
    );
};
