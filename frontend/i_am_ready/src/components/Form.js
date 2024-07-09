import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { IoBagAdd } from "react-icons/io5";
import ButtonSub from "./ButtonSub";

export default function Form(props) {
    const navigate = useNavigate();
    const [jobSeekerData, setjobSeekerData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        skills: "",
        country: "",
        city: "",
        // resume: null,
    });

    const [recruiterData, setRecruiterData] = useState({
        email: "",
        companyName: "",
        companyDesc: "",
        password: "",
        country: "",
        city: "",
    });

    const handleJobSeekerInputChange = (e) => {
        setjobSeekerData({
            ...jobSeekerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRecruiterInputChange = (e) => {
    setRecruiterData({
        ...recruiterData,
        [e.target.name]: e.target.value,
        });
    };

    const handleJobSeekerSubmit = async (e) => {
        e.preventDefault();
        const skillsArray = jobSeekerData.skills.split(",").map((skill) => skill.trim());
        const dataToSend = {
            ...jobSeekerData,
            skills: skillsArray,
            user_type: "j",
            // resume: jobSeekerData.resume,
        };

    // send the data to the backend with a post request to create an account
        async function fetchJobSeekerData() {
            const response = await fetch("http://localhost:5000/api/v1/register/job_seeker", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
            });
            if (response.status !== 201) {
            alert("Email already exists");
            } else {
                setjobSeekerData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    skills: "",
                    country: "",
                    city: "",
                    // resume: null,
                });
                alert("You have successfully signed up");
                navigate("/login");
            }
            
            return response.json();
        }
        await fetchJobSeekerData();
        };

        const handleRecruiterSubmit = async (e) => {
            e.preventDefault();
            const dataToSend = {
                ...recruiterData,
                user_type: "r",
            };

        // send the data to the backend with a post request to create an account
        async function fetchRecruiterData() {
            const response = await fetch("http://localhost:5000/api/v1/register/recruiter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
            });
            if (response.status !== 201) {
                alert("Email already exists");
            } else {
                setRecruiterData({
                    email: "",
                    companyName: "",
                    companyDesc: "",
                    password: "",
                    country: "",
                    city: "",
                });
                alert("You have successfully signed up");
                navigate("/login");
            }
            return response.json();
        }
            await fetchRecruiterData();
        };

    // const handleFileChange = (e) => {
    // setjobSeekerData({
    //     ...jobSeekerData,
    //     resume: e.target.files[0],
    // });
    // };

return (
    <div className="signupform">
        {props.user_type ? (
        // Render recruiter-specific form fields
        <form onSubmit={handleRecruiterSubmit}>
            <div className="form-header">
                <IoBagAdd size="3em" />
                <h2>Are you hiring?</h2>
            </div>

            <div className="labels">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={recruiterData.email} onChange={handleRecruiterInputChange} />

                <label htmlFor="company-name">Company Name</label>
                <input type="text" id="company-name" name="companyName" value={recruiterData.companyName} onChange={handleRecruiterInputChange} />

                <label htmlFor="company-description">Company Description</label>
                <textarea id="company-description" name="companyDesc" value={recruiterData.companyDesc} onChange={handleRecruiterInputChange}></textarea>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={recruiterData.password} onChange={handleRecruiterInputChange} />

                <label htmlFor="country">Country</label>
                <input type="text" name="country" value={recruiterData.country} onChange={handleRecruiterInputChange} />

                <label htmlFor="city">City</label>
                <input type="text" name="city" value={recruiterData.city} onChange={handleRecruiterInputChange} />
                <ButtonSub text={"Sign Up as Recruiter"} color={"#22c55e"} />
            </div>
        </form>
        ) : (
        // Render job seeker-specific form fields
        <form onSubmit={handleJobSeekerSubmit}>
            <div className="form-header">
                <IoPerson size="3em" />
                <h2>Are you looking for a job?</h2>
            </div>
            <div className="labels">
                <label htmlFor="name">First Name</label>
                <input
                    type="text"
                    id="name"
                    name="firstName"
                    value={jobSeekerData.firstName}
                    onChange={handleJobSeekerInputChange}
                    required
                />

                <label htmlFor="last-name">Last Name</label>
                <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={jobSeekerData.lastName}
                    onChange={handleJobSeekerInputChange}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={jobSeekerData.email}
                    onChange={handleJobSeekerInputChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={jobSeekerData.password}
                    onChange={handleJobSeekerInputChange}
                    required
                />

                <label htmlFor="skills">Skills</label>
                <input
                    type="text"
                    id="skills"
                    name="skills"
                    placeholder="Python, Javascript, C++"
                    value={jobSeekerData.skills}
                    onChange={handleJobSeekerInputChange}
                    required
                />

                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={jobSeekerData.country}
                    onChange={handleJobSeekerInputChange}
                    required
                />

                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={jobSeekerData.city}
                    onChange={handleJobSeekerInputChange}
                    required
                />

                <label htmlFor="resume">Resume</label>
                <input type="file" id="resume" name="resume" />
                <ButtonSub text={"Sign Up as Job Seeker"} color={"#3b82f6"} />
            </div>
        </form>
        )}
    </div>
    );
    }
