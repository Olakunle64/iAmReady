import React from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import RecruiterProfile from "./components/pages/RecruiterProfile";
import SearchPage from "./components/pages/SearchPage";
import LandingPage from "./components/pages/LandingPages";
import SignUp from "./components/pages/SignUp";
import LoginPage from "./components/pages/LoginPage";
import JobSeekerProfile from "./components/pages/JobSeekerProfile";


function App() {
  const reviews = [
  {"name": "John Doe", "description": "I found this website very useful because i got my first dream job here"},
  {"name": "Jane Doe", "description": "I found"},
  {"name": "James Doe", "description": "I found"},
  {"name": "Jill Doe", "description": "I found"}
  ]
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
