import React from "react";
import Form from "../Form";
import { BsBellFill } from "react-icons/bs";

export default function SignUp() {
    return (
        <div className="signup">
            <div className="top">
                <h2>iAmReady</h2>
                <h3>Connecting Talent with Opportunities</h3>
            </div>
            <div className="form-container">
                <h2>Join iAmReady Today</h2>
                <div className="two-forms">
                    <Form user_type={0} />
                    <Form user_type={1} />
                </div>
                <div className="notify">
                    <BsBellFill size="2em"/>
                    <h2>You will receive a confirmation email to verify your account</h2>
                </div>
            </div>
            <div className="foot">
                <h2>&copy; 2024 All right reserved </h2>
                <ul>
                    <li>Contact Us</li>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                    <li>Terms and Conditions</li>
                </ul>
            </div>
        </div>
        
    )
}