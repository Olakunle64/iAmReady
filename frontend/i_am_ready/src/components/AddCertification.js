import React, { useState } from 'react';


const AddCertification = () => {
    const [showForm, setShowForm] = useState(false);
    const [newCertification, setnewCertification] = useState({ title: '', issuingOrg: '', dateIssued: ''});
    const [cookies] = useState(() => {
        return {
            session_id: localStorage.getItem("session_id") || "",
            user_type: localStorage.getItem("user_type") || "",
        };
    });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(newCertification);
        const response = await fetch("https://iamready.onrender.com/api/v1/job_seeker/certification", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Cookie": JSON.stringify(cookies),
            "Authorization": JSON.stringify(cookies)
        },
        body: JSON.stringify(newCertification),
        });
        if (!response.ok) {
            alert('Failed to add certification');
        } else {
            alert("Certification added successfully")
        }
        setnewCertification({ title: '', issuingOrg: '', dateIssued: ''});
        setShowForm(false);
    } catch (error) {
        console.error(error);
    }
    };

    const handleButtonClick = (e) => {
    setShowForm(true);
    };
    const handleEducationInputChange = (e) => {
        setnewCertification({
            ...newCertification,
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
                <h3>Add new certification</h3>

                <input
                    type='text'
                    name='title'
                    value={newCertification.title}
                    onChange={handleEducationInputChange}
                    placeholder='Title'
                    required
                />
                <input
                    type='text'
                    name='issuingOrg'
                    value={newCertification.issuingOrg}
                    onChange={handleEducationInputChange}
                    placeholder='Issuing Organization'
                    required
                />
                <label><em>Date Issued</em></label>
                <input
                    type='date'
                    name='dateIssued'
                    value={newCertification.dateIssued}
                    onChange={handleEducationInputChange}
                    placeholder='Date Issued'
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

export default AddCertification;
