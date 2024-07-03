import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import ProfileBox from "./ProfileBox";
import { GiGraduateCap } from "react-icons/gi";
import { BiSolidCertification } from "react-icons/bi";
import { IoBagAdd } from "react-icons/io5";
import Portfolio from "./Porfolio";
import Skill from "./Skill";

export default function ProfileSection() {
    return (
        <>
            <div className="profile">
                {/* bio */}
                <div className="bio">
                    <div class="profile-picture">
                        <h1>JD</h1>
                    </div>
                    <div className="info">
                        <h1>John Doe</h1>
                        <p>Software Developer</p>
                        <p>Location: Lagos, Nigeria</p>
                        <div className="message">
                            <div className="phone">
                                <FaPhone size="1.5em"/>
                                <h3>+2347062869135</h3>
                            </div>
                            <div className="email">
                                <MdEmail size="1.5em"/>
                                <h3>salauisiaka1998@gmail.com</h3>
                            </div>
                            <div className="linkedin">
                                <FaLinkedin size="1.5em"/>
                                <h3>Linkedin</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* professional summary */}
                <div className="summary">
                    <div>
                        <h3>Professional Summary</h3>
                        <p>I have 4 years of experience in software developer.
                            I have 4 years of experience in software developer.
                            I have 4 years of experience in software developer.
                            I have 4 years of experience in software developer.
                            I have 4 years of experience in software developer
                        </p>
                    </div>
                </div>
                {/* education */}
                <ProfileBox 
                    subheader={"Education"}
                    children={["Bachelor degree in Computer Science at University of Ibadan", "Bachelor degree in Computer Science at University of Ibadan"]}
                    icon={<GiGraduateCap size="2em" />} cls={"container-box"}
                />
                {/* certification */}
                <ProfileBox 
                    subheader={"Certification"}
                    children={["Workforce Development at University of Ibadan", "Workforce Development at University of Ibadan", "Workforce Development at University of Ibadan", "Workforce Development at University of Ibadan"]}
                    icon={<BiSolidCertification size="2em"/>} cls={"container-box"}
                />
                
                
                <div className="experience">
                    <h2>Experience</h2>
                    <ProfileBox 
                    subheader={"Senior Full Stack Developer"}
                    children={["Bachelor degree in Computer Science at University of Ibadan", "Bachelor degree in Computer Science at University of Ibadan"]}
                    icon={<IoBagAdd size="2em"/>} cls={"container-box-ex"}
                    />
                    <ProfileBox 
                    subheader={"Senior Full Stack Developer"}
                    children={["Bachelor degree in Computer Science at University of Ibadan", "Bachelor degree in Computer Science at University of Ibadan", "Bachelor degree in Computer Science at University of Ibadan", "Bachelor degree in Computer Science at University of Ibadan"]}
                    icon={<IoBagAdd size="2em"/>} cls={"container-box-ex"}
                    />
                    <ProfileBox 
                    subheader={"Senior Full Stack Developer"}
                    children={["Bachelor degree in Computer Science at University of Ibadan", "Bachelor degree in Computer Science at University of Ibadan"]}
                    icon={<IoBagAdd size="2em"/>} cls={"container-box-ex"}
                    />
                </div>
                <div className="portfolios">
                    <h2>Portfolios</h2>
                    <div className="many_portfolios">
                        <Portfolio 
                        description={"The website is for matching recruiters with job seekers"}
                        link={"https://www.google.com"}
                        title={"Job Seeker Website"}
                        />
                        <Portfolio 
                        description={"The website is for matching recruiters with job seekers"}
                        link={"https://www.google.com"}
                        title={"Job Seeker Website"}
                        />
                        <Portfolio 
                        description={"The website is for matching recruiters with job seekers"}
                        link={"https://www.google.com"}
                        title={"Job Seeker Website"}
                        />
                    </div>
                    
                </div>
                <div className="skills">
                    <h2>Skills</h2>
                    <div className="many_skills">
                        <Skill name={'Python'}/>
                        <Skill name={'Python'}/>
                        <Skill name={'Python'}/>
                        <Skill name={'Python'}/>
                        <Skill name={'Python'}/>
                        <Skill name={'Python'}/>
                        <Skill name={'Python'}/>
                    </div>
                </div>
                <div className="profile-footer">
                    <h3>&copy; 2024 John Doe. All right reserved</h3>
                </div>
            </div>

        </>
    )
}