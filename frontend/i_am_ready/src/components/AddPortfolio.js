import React, { useState } from 'react';


const AddPortfolio = () => {
    const [showForm, setShowForm] = useState(false);
    const [newPortfolio, setnewPortfolio] = useState({
        title: '', link: '', description: ''
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
        const response = await fetch("http://localhost:5000/api/v1/job_seeker/portfolio", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Cookie": JSON.stringify(cookies),
            "Authorization": JSON.stringify(cookies)
        },
        body: JSON.stringify(newPortfolio),
        });
        if (!response.ok) {
            alert('Failed to add portfolio');
        } else {
            alert("Portfolio added successfully")
        }
        setnewPortfolio({ title: '', link: '', description: ''});
        setShowForm(false);
    } catch (error) {
        console.error(error);
    }
    };
    const handleButtonClick = (e) => {
    setShowForm(true);
    };
    const handleEducationInputChange = (e) => {
        setnewPortfolio({
            ...newPortfolio,
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
                <h3>Add new portfolio</h3>

                <input
                    type='text'
                    name='title'
                    value={newPortfolio.title}
                    onChange={handleEducationInputChange}
                    placeholder='Title'
                    required
                />
                <input
                    type='text'
                    name='description'
                    value={newPortfolio.description}
                    onChange={handleEducationInputChange}
                    placeholder='Description'
                    required
                />
                <input
                    type='text'
                    name='link'
                    value={newPortfolio.link}
                    onChange={handleEducationInputChange}
                    placeholder='Link  (optional)'
                />
                
                <button type="submit">Save</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
            </form>
        </div>
        )}
    </div>
    );
};

export default AddPortfolio;
