import React, { useState } from 'react';

export default function EditProfile({ icon, jobSeeker }) {
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [updateJobSeeker, setUpdateJobSeeker] = useState({
        firstName: jobSeeker.job_seeker.firstName,
        lastName: jobSeeker.job_seeker.lastName,
        phoneNumber: jobSeeker.job_seeker.phoneNumber || "",
        linkedIn: jobSeeker.job_seeker.linkedIn || "",
        country: jobSeeker.job_seeker.country,
        city: jobSeeker.job_seeker.city,
        skills: jobSeeker.job_seeker.skills.join(','),
        bio: jobSeeker.job_seeker.bio || "",
        jobName: jobSeeker.job_seeker.jobName || "",
        resume: jobSeeker.job_seeker.resume || ""
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
            setLoading(true); // Set loading to true

            const response = await fetch("http://localhost:5000/api/v1/job_seeker", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Cookie": JSON.stringify(cookies),
                    "Authorization": JSON.stringify(cookies)
                },
                body: JSON.stringify({
                    ...updateJobSeeker,
                    skills: updateJobSeeker.skills.split(',')
                }),
            });

            if (response.status !== 200) {
                alert('Network response was not ok');
            } else {
                alert("Profile updated successfully");
            }

            setUpdateJobSeeker({
                firstName: jobSeeker.job_seeker.firstName,
                lastName: jobSeeker.job_seeker.lastName,
                phoneNumber: jobSeeker.job_seeker.phoneNumber || "",
                linkedIn: jobSeeker.job_seeker.linkedIn || "",
                country: jobSeeker.job_seeker.country,
                city: jobSeeker.job_seeker.city,
                skills: jobSeeker.job_seeker.skills.join(','),
                bio: jobSeeker.job_seeker.bio || "",
                jobName: jobSeeker.job_seeker.jobName || "",
                resume: jobSeeker.job_seeker.resume || ""
            });
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleJobSeekerInputChange = (e) => {
        setUpdateJobSeeker({
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
                            required
                        />
                        <label>Last Name</label>
                        <input
                            type='text'
                            name='lastName'
                            value={updateJobSeeker.lastName}
                            onChange={handleJobSeekerInputChange}
                            required
                        />
                        <label>Phone Number</label>
                        <input
                            type='text'
                            name='phoneNumber'
                            value={updateJobSeeker.phoneNumber}
                            onChange={handleJobSeekerInputChange}
                        />
                        <label>LinkedIn</label>
                        <input
                            type='text'
                            name='linkedIn'
                            value={updateJobSeeker.linkedIn}
                            onChange={handleJobSeekerInputChange}
                        />
                        <label>Country</label>
                        <input
                            type='text'
                            name='country'
                            value={updateJobSeeker.country}
                            onChange={handleJobSeekerInputChange}
                            required
                        />
                        <label>City</label>
                        <input
                            type='text'
                            name='city'
                            value={updateJobSeeker.city}
                            onChange={handleJobSeekerInputChange}
                            required
                        />
                        <label>Professional Summary</label>
                        <textarea
                            name='bio'
                            value={updateJobSeeker.bio}
                            onChange={handleJobSeekerInputChange}
                        />
                        <label>Skills</label>
                        <input
                            type='text'
                            name='skills'
                            value={updateJobSeeker.skills}
                            onChange={handleJobSeekerInputChange}
                            required
                        />
                        <label>Job Name</label>
                        <input
                            type='text'
                            name='jobName'
                            value={updateJobSeeker.jobName}
                            onChange={handleJobSeekerInputChange}
                        />
                        <label>Resume Link</label>
                        <input
                            type='text'
                            name='resume'
                            value={updateJobSeeker.resume}
                            onChange={handleJobSeekerInputChange}
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Save'}
                        </button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                    </form>
                    {loading && (
                        <div className="loading-icon">
                            <p>Loading...</p> {/* Replace with your loading spinner or icon */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
