import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RecruiterProfile from "./components/pages/RecruiterProfile";
import SearchPage from "./components/pages/SearchPage";
import LandingPage from "./components/pages/LandingPages";
import SignUp from "./components/pages/SignUp";
import LoginPage from "./components/pages/LoginPage";
import JobSeekerProfile from "./components/pages/JobSeekerProfile";
import { useNavigate } from "react-router-dom";
import AboutPage from "./components/AboutPage";

function App() {
    const navigate = useNavigate();
    const [review, setReview] = useState([]);

    useEffect(() => {
        async function getReview() {
            try {
                const response = await fetch("https://iamready.onrender.com/api/v1/reviews", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    setReview([]); // Clear review if fetch fails
                    return; // Exit if response is not ok
                }

                const data = await response.json();
                setReview(data); // Set the review data
            } catch (err) {
                console.error("Error occurred", err);
                navigate("/");
            }
        }

        getReview(); // Call the function
    },[navigate]); // Add dependencies

    return (
        <Routes>
            <Route path="/" element={<LandingPage reviews={review} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/recruiter-profile" element={<RecruiterProfile />} />
            <Route path="/job-seeker-profile" element={<JobSeekerProfile />} />
            <Route path="/job-seeker-profile/:id" element={<JobSeekerProfile />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
