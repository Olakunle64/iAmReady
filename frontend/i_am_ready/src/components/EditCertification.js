import React, { useState } from 'react';


const EditCertification = ({jobSeeker, showForm, setShowForm, objId}) => {
    const [newCertification, setnewCertification] = useState({
        title: "",
        issuingOrg: "",
        dateIssued: ""
    });
    // write a function that takes in a list of object and filter the list based on the id attribute and return the just one object with the id
    const certification = jobSeeker.certification.filter((cert) => cert.id === objId);
    
    const [cookies] = useState(() => {
        return document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {});
    });
    const deleteCertification = async (e) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/job_seeker/certification?certification_id=${objId}`, {
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
                alert("Certification deleted successfully")
            }
            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:5000/api/v1/job_seeker/certification?certification_id=${objId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Cookie": JSON.stringify(cookies),
            "Authorization": JSON.stringify(cookies)
        },
        body: JSON.stringify(newCertification),
        });
        if (response.status !== 200) {
            alert('Network response was not ok');
        } else {
            alert("Certification updated successfully")
        }
        setnewCertification({
            title: "",
            issuingOrg: "",
            dateIssued: ""
        });
        setShowForm(false);
    } catch (error) {
        console.error(error);
    }
    };

    const handleCertificationInputChange = (e) => {
        setnewCertification({
            ...newCertification,
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
                <h3>Update certification</h3>

                <label><em>Title</em></label>
                <input
                    type='text'
                    name='title'
                    value={newCertification.title || certification[0].title}
                    onChange={handleCertificationInputChange}
                    required
                />
                <label><em>Issuing Organization</em></label>
                <input
                    type='text'
                    name='issuingOrg'
                    value={newCertification.issuingOrg || certification[0].issuingOrg}
                    onChange={handleCertificationInputChange}
                    required
                />
                <label><em>Date Issued</em></label>
                <input
                    type='date'
                    name='dateIssued'
                    value={newCertification.dateIssued}
                    onChange={handleCertificationInputChange}
                    required
                />
                <button type="submit">Save</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
                <button onClick={deleteCertification}>Delete</button>
            </form>
        </div>
        )}
    </div>
    );
};

export default EditCertification;
