import React, { useState } from 'react';


export default function EditProfileR({icon, Recruiter}) {
    const [showForm, setShowForm] = useState(false);
    // console.log(Recruiter)
    const [updateRecruiter, setupdateRecruiter] = useState({
        companyName: Recruiter.companyName, phoneNumber: Recruiter.phoneNumber,
        linkedIn: Recruiter.linkedIn, country: Recruiter.country, city: Recruiter.city,
        companyDesc: Recruiter.companyDesc, websiteUrl: Recruiter.websiteUrl
    });
    const [cookies] = useState(() => {
        return {
            session_id: localStorage.getItem("session_id") || "",
            user_type: localStorage.getItem("user_type") || "",
        };
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = fetch("https://iamready.onrender.com/api/v1/recruiter", {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                "Cookie": JSON.stringify(cookies),
                "Authorization": JSON.stringify(cookies)
                },
                // in the updateRecruiter try to convert skills to an array
                body: JSON.stringify(updateRecruiter),
            });
        
            if ((await response).status !== 200) {
                alert('Network response was not ok');
            } else {
                alert("Profile updated successfully");
            }
        
            setupdateRecruiter({
                companyName: Recruiter.companyName, phoneNumber: Recruiter.phoneNumber,
                linkedIn: Recruiter.linkedIn, country: Recruiter.country, city: Recruiter.city,
                companyDesc: Recruiter.companyDesc, websiteUrl: Recruiter.websiteUrl
            });
            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
        };
        

    const handleButtonClick = (e) => {
    setShowForm(true);
    };
    const handleRecruiterInputChange = (e) => {
        setupdateRecruiter({
            ...updateRecruiter,
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

                <label><em>Company Name</em></label>
                <input
                    type='text'
                    name='companyName'
                    value={updateRecruiter.companyName || Recruiter.companyName}
                    onChange={handleRecruiterInputChange}
                    required
                />
                <label><em>Company Description</em></label>
                <textarea
                    name='companyDesc'
                    value={updateRecruiter.companyDesc || Recruiter.companyDesc}
                    onChange={handleRecruiterInputChange}
                    required
                />
                <label><em>Phone Number</em></label>
                <input
                    type='text'
                    name='phoneNumber'
                    value={updateRecruiter.phoneNumber || Recruiter.phoneNumber}
                    onChange={handleRecruiterInputChange}
                />
                <label><em>LinkedIn</em></label>
                <input
                    type='text'
                    name='linkedIn'
                    value={updateRecruiter.linkedIn || Recruiter.linkedIn}
                    onChange={handleRecruiterInputChange}
                />
                <label><em>Country</em></label>
                <input
                    type='text'
                    name='country'
                    value={updateRecruiter.country || Recruiter.country}
                    onChange={handleRecruiterInputChange}
                    required
                />
                <label><em>City</em></label>
                <input
                    type='text'
                    name='city'
                    value={updateRecruiter.city || Recruiter.city}
                    onChange={handleRecruiterInputChange}
                    required
                />
                <label><em>Website URL</em></label>
                <input
                    type='text'
                    name='websiteUrl'
                    value={updateRecruiter.websiteUrl || Recruiter.websiteUrl}
                    onChange={handleRecruiterInputChange}
                />

                <button type="submit">Save</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
            </form>
        </div>
        )}
    </div>
    );
};
