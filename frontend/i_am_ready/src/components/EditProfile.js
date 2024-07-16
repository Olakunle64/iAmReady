import React, { useState } from 'react';


export default function EditProfile({icon, jobSeeker}) {
    const [showForm, setShowForm] = useState(false);
    const [updateJobSeeker, setupdateJobSeeker] = useState({
        firstName: '', LastName: '', email: '', phoneNumber: '', linkedin: '', country: '', city: ''
    });
    const [updateJobSeekerInfo, setupdateJobSeekerInfo] = useState({
        bio: '', skills: '', jobName: ''
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
        
        // Check if the updateJobSeeker object has been modified
        const modifiedJobSeekerKeys = Object.keys(updateJobSeeker).filter(
            (key) => updateJobSeeker[key] !== jobSeeker.job_seeker[key]
        );
        
        // Check if the updateJobSeekerInfo object has been modified
        const modifiedJobSeekerInfoKeys = Object.keys(updateJobSeekerInfo).filter(
            (key) => updateJobSeekerInfo[key] !== jobSeeker.jobSeekerInfo[key]
        );
        
        try {
            const [response1, response2] = await Promise.all([
            fetch("http://localhost:5000/api/v1/job_seeker", {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                "Cookie": JSON.stringify(cookies),
                "Authorization": JSON.stringify(cookies)
                },
                body: JSON.stringify(
                    modifiedJobSeekerKeys.reduce((acc, key) => {
                    acc[key] = updateJobSeeker[key];
                    return acc;
                    }, {})
                ),
            }),
            fetch("http://localhost:5000/api/v1/job_seeker/job_seeker_info", {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                "Cookie": JSON.stringify(cookies),
                "Authorization": JSON.stringify(cookies)
                },
                body: JSON.stringify(
                modifiedJobSeekerInfoKeys.reduce((acc, key) => {
                    acc[key] = updateJobSeekerInfo[key];
                    return acc;
                }, {})
                ),
            }),
            ]);
        
            if (!response1.ok || !response2.ok) {
            alert('Network response was not ok');
            } else {
            alert("Profile updated successfully");
            }
        
            setupdateJobSeeker({ firstName: '', LastName: '', email: '', phoneNumber: '', linkedin: '', country: '', city: '', skills: '' });
            setupdateJobSeekerInfo({ bio: '', jobName: '' });
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
    const handleJobSeekerInfoInputChange = (e) => {
        setupdateJobSeekerInfo({
            ...updateJobSeekerInfo,
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
                    value={updateJobSeeker.firstName || jobSeeker.job_seeker.firstName}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='First Name'
                    required
                />
                <label>Last Name</label>
                <input
                    type='text'
                    name='LastName'
                    value={updateJobSeeker.LastName || jobSeeker.job_seeker.lastName}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Last Name'
                    required
                />
                <label>Email</label>
                <input
                    type='email'
                    name='email'
                    value={updateJobSeeker.email || jobSeeker.job_seeker.email}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Email'
                    required
                />
                <label>Phone Number</label>
                <input
                    type='text'
                    name='phoneNumber'
                    value={updateJobSeeker.phoneNumber || jobSeeker.job_seeker.phoneNumber}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Phone Number'
                    // required
                />
                <label>Linkedin</label>
                <input
                    type='text'
                    name='linkedin'
                    value={updateJobSeeker.linkedin || jobSeeker.job_seeker.linkedin}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Linkedin'
                    // required
                />
                <label>Country</label>
                <input
                    type='text'
                    name='country'
                    value={updateJobSeeker.country || jobSeeker.job_seeker.country}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Country'
                    required
                />
                <label>City</label>
                <input
                    type='text'
                    name='city'
                    value={updateJobSeeker.city || jobSeeker.job_seeker.city}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='City'
                    required
                />
                <label>Professional Summary</label>
                <textarea
                    name='bio'
                    value={updateJobSeekerInfo.bio || jobSeeker.jobSeekerInfo.bio}
                    onChange={handleJobSeekerInfoInputChange}
                    // placeholder='Professional Summary'
                    required
                />
                <label>Skills</label>
                <input
                    type='text'
                    name='skills'
                    value={updateJobSeeker.skills || jobSeeker.job_seeker.skills.join(", ")}
                    onChange={handleJobSeekerInputChange}
                    // placeholder='Skills'
                    required
                />
                <label>Job Name</label>
                <input
                    type='text'
                    name='jobName'
                    value={updateJobSeekerInfo.jobName || jobSeeker.jobSeekerInfo.jobName}
                    onChange={handleJobSeekerInfoInputChange}
                    // placeholder='Job Name'
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
