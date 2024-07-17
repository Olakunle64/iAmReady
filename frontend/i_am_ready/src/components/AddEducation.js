import React, { useState } from 'react';


const AddEducation = ({camelCase}) => {
    // const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [newEducation, setnewEducation] = useState({ degree: '', school: '', fieldOfStudy: '', startDate: '', endDate: ''});
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
        console.log(newEducation);
        const response = await fetch("http://localhost:5000/api/v1/job_seeker/education", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Cookie": JSON.stringify(cookies),
            "Authorization": JSON.stringify(cookies)
        },
        body: JSON.stringify(camelCase(newEducation)),
        });
        if (!response.ok) {
            alert('Network response was not ok');
        } else {
            alert("Education added successfully")
        }
        setnewEducation({ degree: '', school: '', fieldOfStudy: '', startDate: '', endDate: ''});
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
        setnewEducation({
            ...newEducation,
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
                <h3>Add new education</h3>

                <input
                    type='text'
                    name='degree'
                    value={newEducation.degree}
                    onChange={handleEducationInputChange}
                    placeholder='Degree'
                    required
                />
                <input
                    type='text'
                    name='fieldOfStudy'
                    value={newEducation.fieldOfStudy}
                    onChange={handleEducationInputChange}
                    placeholder='Field of Study'
                    required
                />
                <input
                    type='text'
                    name='school'
                    value={newEducation.school}
                    onChange={handleEducationInputChange}
                    placeholder='School'
                    required
                />
                <label><em>Start Date</em></label>
                <input
                    type='date'
                    name='startDate'
                    value={newEducation.startDate}
                    onChange={handleEducationInputChange}
                    placeholder='Start Date'
                    required
                />
                <label><em>End Date</em></label>
                <input
                    type='date'
                    name='endDate'
                    value={newEducation.endDate}
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

export default AddEducation;
