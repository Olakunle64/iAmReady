import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const AddCertification = ({camelCase}) => {
    // const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [newCertification, setnewCertification] = useState({ title: '', issuingOrg: '', dateIssued: ''});
    // const [buttonRect, setButtonRect] = useState(null);
    const [cookies] = useState(() => {
        return document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {});
    });
    // write a function that takes in dictionary and change all value that starts with alphabet to capital letter
    // letter and the rest of the word must be in lowercase just like turning the first letter of a word to capital letter
    // and the rest of the word to lowercase

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(newCertification);
        const response = await fetch("http://localhost:5000/api/v1/job_seeker/certification", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Cookie": JSON.stringify(cookies),
            "Authorization": JSON.stringify(cookies)
        },
        body: JSON.stringify(camelCase(newCertification)),
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
    // const buttonRect = e.target.getBoundingClientRect();
    // setButtonRect(buttonRect);
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
