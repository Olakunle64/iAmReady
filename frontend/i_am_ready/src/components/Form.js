import React from "react";
import { IoPerson } from "react-icons/io5";
import { IoBagAdd } from "react-icons/io5";
import ButtonSub from "./ButtonSub";

export default function Form(props) {
    // if user_type is true that means it's a recruiter component, otherwise it's a job seeker component
    return (
    <div className="signupform">
        {props.user_type ? (
        // Render recruiter-specific form fields
        <form>
            <div className="form-header">
                <IoBagAdd size="3em"/>
                <h2>Are you hiring?</h2>
            </div>

            <div className="labels">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="company-name">Company Name</label>
                <input type="text" id="company-name" name="companyName" />

                <label htmlFor="company-description">Company Description</label>
                <textarea id="company-description" name="companyDesc"></textarea>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />

                <label htmlFor="country">Country</label>
                <input type="text" id="country" name="country" />

                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" />
                <ButtonSub text={"Sign Up as Recruiter"} color={"#22c55e"}/>
            </div>
        </form>
        ) : (
        // Render job seeker-specific form fields
        <form>
            <div className="form-header">
                <IoPerson size="3em"/>
                <h2>Are you looking for a job?</h2>
            </div>
        <div className="labels">
            <label htmlFor="name">First Name</label>
            <input type="text" id="name" name="firstName" />

            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="lastName" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="skills">Skills</label>
            <input type="text" id="skills" name="skills" placeholder="Python, Javascript, C++"/>

            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" />

            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" />

            <label htmlFor="resume">Resume</label>
            <input type="file" id="resume" name="resume" />
            <ButtonSub text={"Sign Up as Job Seeker"} color={"#3b82f6"}/>
        </div>
        {/* <button type="submit">Submit</button> */}
        
        </form>
        )}
    </div>
    );
    }
