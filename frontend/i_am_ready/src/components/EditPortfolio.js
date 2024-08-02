import React, { useState } from 'react';


const EditPortfolio = ({jobSeeker, showForm, setShowForm, objId}) => {
    const portfolio = jobSeeker.portfolio.filter((port) => port.id === objId);
    const [newPortfolio, setnewPortfolio] = useState(portfolio[0] ? {
        title: portfolio[0].title,
        description: portfolio[0].description,
        link: portfolio[0].link
    } : {
        title: "",
        description: "",
        link: ""
    });
    // write a function that takes in a list of object and filter the list based on the id attribute and return the just one object with the id

    const [cookies] = useState(() => {
        return document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {});
    });
    const deletePortfolio = async (e) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/job_seeker/portfolio?portfolio_id=${objId}`, {
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
                alert("Portfolio deleted successfully")
            }
            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:5000/api/v1/job_seeker/portfolio?portfolio_id=${objId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Cookie": JSON.stringify(cookies),
            "Authorization": JSON.stringify(cookies)
        },
        body: JSON.stringify(newPortfolio),
        });
        if (response.status !== 200) {
            alert('Network response was not ok');
        } else {
            alert("Portfolio updated successfully")
        }
        setnewPortfolio({
            title: "",
            description: "",
            link: ""
        });
        setShowForm(false);
    } catch (error) {
        console.error(error);
    }
    };


    const handlePortfolioInputChange = (e) => {
        setnewPortfolio({
            ...newPortfolio,
            [e.target.name]: e.target.value,
        });
    };

    return (
    <div>
        {showForm && jobSeeker && jobSeeker.user === "JobSeeker" && (
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
                <h3>Update portfolio</h3>

                <label><em>title</em></label>
                <input
                    type='text'
                    name='title'
                    value={newPortfolio.title || portfolio[0].title}
                    onChange={handlePortfolioInputChange}
                    required
                />
                <label><em>Description</em></label>
                <input
                    type='text'
                    name='description'
                    value={newPortfolio.description || portfolio[0].description}
                    onChange={handlePortfolioInputChange}
                    required
                />
                <label><em>Link</em></label>
                <input
                    type='text'
                    name='link'
                    value={newPortfolio.link || portfolio[0].link}
                    onChange={handlePortfolioInputChange}
                    required
                />
                <button type="submit">Save</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
                <button onClick={deletePortfolio}>Delete</button>
            </form>
        </div>
        )}
    </div>
    );
};

export default EditPortfolio;
