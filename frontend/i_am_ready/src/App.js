import React from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import RecruiterProfile from "./components/pages/RecruiterProfile";
import SearchPage from "./components/pages/SearchPage";
import LandingPage from "./components/pages/LandingPages";
import SignUp from "./components/pages/SignUp";
import LoginPage from "./components/pages/LoginPage";
import JobSeekerProfile from "./components/pages/JobSeekerProfile";
// import { useState } from "react";


function App() {
  const reviews = [
  {"name": "John Doe", "description": "I found this website very useful because i got my first dream job here"},
  {"name": "Jane Doe", "description": "I found"},
  {"name": "James Doe", "description": "I found"},
  {"name": "Jill Doe", "description": "I found"}
  ]
  // const [cookies] = useState({
  //   session_id: document.cookie.split(";")[0].split("=")[1],
  //   user_type: document.cookie.split(";")[1].split("=")[1]
  // });
  // const [jobSeeker, setJobSeeker] = useState({})
  //   async function handleJobseeker() {
  //       try {
  //           const response = await fetch("http://127.0.0.1:5000/api/v1/jobSeeker", {
  //               method: "GET",
  //               credentials: "include",
  //               headers: {
  //                   "Content-Type": "application/json",
  //                   "Authorization": JSON.stringify(cookies)
  //               },
  //           });

  //           if (!response.ok) {
  //               throw new Error("Failed to fetch JobSeeker details!");
  //           }

  //           return await response.json();
  //       } catch (err) {
  //           console.error("Error logging out:", err);
  //       }
  //   }
  //   handleJobseeker().then((data) => {
  //       console.log(data)
  //       setJobSeeker(data)
  //   })
  return (
    <Routes>
        <Route path="/" element={<LandingPage reviews={reviews} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/job-seeker-profile" element={<JobSeekerProfile />} />
        <Route path="/recruiter-profile" element={<RecruiterProfile />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
