import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { TbWorld } from "react-icons/tb";
import Logout from "./Logout";

export default function RecruiterBio() {
    return (
        <div className="bio">
            <div className="profile-picture">
                {/* <h1>JD</h1> */}
                <FcManager size="5em"/>
            </div>
            <div className="info">
                <h1>ALX Software Engineering</h1>
                <p><b>Company Description:</b> Experienced recruiter with a decade of expertise in IT and Healthcare industries. Passionate
                    Experienced recruiter with a decade of expertise in IT and Healthcare industries. Passionate 
                    Experienced recruiter with a decade of expertise in IT and Healthcare industries. Passionate 
                </p>
                <p><b>Location:</b> Lagos, Nigeria</p>
                <div className="message">
                    <div className="phone">
                        <FaPhone size="1.5em"/>
                        <span>+2347062869135</span>
                    </div>
                    <div className="email">
                        <MdEmail size="1.5em"/>
                        <a href="mailto:salauisiaka1998@gmail.com">salauisiaka1998@gmail.com</a>
                    </div>
                    <div className="linkedin">
                        <FaLinkedin size="1.5em"/>
                        <a href="google.com">Linkedin</a>
                    </div>
                    <div className="website">
                        <TbWorld size="1.5em"/>
                        <a href="google.com">Website</a>
                    </div>
                    <div>
                        <Logout/>
                    </div>
                </div>
            </div>
        </div>
    )
}