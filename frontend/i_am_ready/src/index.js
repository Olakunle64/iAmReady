import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/signup_pages/top.css';
import './styles/landing_pages/header.css';
import './styles/landing_pages/subHeader.css';
import './styles/landing_pages/button.css';
import './styles/landing_pages/feature.css';
import './styles/landing_pages/testimonial.css';
import './styles/landing_pages/register.css';
import './styles/landing_pages/footer.css';
import './styles/signup_pages/form.css';
import './styles/login_pages/login.css'
import './styles/job_seeker_profile/bio.css'
import './styles/job_seeker_profile/summary.css'
import './styles/job_seeker_profile/profile_box.css'
import './styles/job_seeker_profile/portfolio.css'
import './styles/job_seeker_profile/skills.css'
import './styles/searchPage/search.css'
import './styles/searchPage/user_card.css'
import './styles/job_seeker_profile/add_education.css'
import './styles/recruiter_profile/recruiter_search.css'
import './styles/job_seeker_profile/review_button.css'
import './styles/job_seeker_profile/view.css'
import './styles/landing_pages/about.css'
import './styles/login_pages/loader.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
