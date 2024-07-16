import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import ProfileBox from "./ProfileBox";
import { GiGraduateCap } from "react-icons/gi";
import { BiSolidCertification } from "react-icons/bi";
import { IoBagAdd } from "react-icons/io5";
import Portfolio from "./Porfolio";
import Skill from "./Skill";
import Logout from "./Logout";
// import AddButton from "./AddButton";
import AddEducation from "./AddEducation";
import AddCertification from "./AddCertification";
import AddExperience from "./AddExperience";
import AddPortfolio from "./AddPortfolio";
import EditProfile from "./EditProfile";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function ProfileSection() {
    const navigate = useNavigate();
    const [jobSeeker, setjobSeeker] = useState([])
    // const [cookies] = useState({
    //     session_id: document.cookie.split(";")[0].split("=")[1],
    //     user_type: document.cookie.split(";")[1].split("=")[1]
    //     // session_id: storedCookies.
    // });
    const [cookies] = useState(() => {
        return document.cookie.split(";").reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split("=");
          acc[key] = value;
          return acc;
        }, {});
      });
      function camelCase(dict) {
        let newDict = {};
        for (let key in dict) {
            let value = dict[key];
            if (key !== 'title' && key !== 'company') {
                let newValue = value[0].toUpperCase() + value.slice(1).toLowerCase();
                newDict[key] = newValue;
                continue;
            } 
            newDict[key] = value;
        }
        return newDict;
    }
    function camelCaseStr(str) {
        let newStr = str[0].toUpperCase() + str.slice(1).toLowerCase();
        return newStr;
    }
    useEffect(() => {
        async function getJobSeekerDetails() {
            try {
                console.log(cookies)
                // const cookies = localStorage.getItem("cookies");
                const response = await fetch("http://127.0.0.1:5000/api/v1/jobSeeker", {
                    // mode: 'no-cors',
                    method: "GET",
                    credentials: "include",
                    cookies: JSON.stringify(cookies),
                    headers: {
                        "Content-Type": "application/json",
                        // "Access-Control-Allow-Origin": "*",
                        "Cookie": JSON.stringify(cookies),
                        "Authorization": JSON.stringify(cookies)
                    },
                    // body: JSON.stringify({name: "olakunle"})
                });
    
                if (!response.ok) {
                    // throw new Error("Unable to fectch jobseeker details");
                    navigate('/login');
                }
    
                localStorage.removeItem("cookies");
                return await response.json();
            } catch (err) {
                console.error("Error occured", err);
                navigate("/");
            }
        }
        getJobSeekerDetails().then((data) => {
            setjobSeeker(data)
            // console.log("my Class: ", jobSeeker)
        });
    })
    
    // console.log(jobSeeker)
    // return jsonify({
    //     "job_seeker": job_seeker.to_dict(),
    //     "education": [education.to_dict() for education in job_seeker.educations],
    //     "certification": [certification.to_dict() for certification in job_seeker.certifications],
    //     "experience": [experience.to_dict() for experience in job_seeker.experiences],
    //     "payment": payments,
    //     "portfolio": [portfolio.to_dict() for portfolio in job_seeker.portfolios],
    //     "review": [review.to_dict() for review in job_seeker.reviews],
    //     "view": [view.to_dict() for view in job_seeker.views],
    //     "jobSeekerInfo": job_seeker_infos
    // })
    let all_education = []
    if (jobSeeker.education) {
        jobSeeker.education.forEach(element => {
            const education = `${element.degree} in ${element.fieldOfStudy} at ${element.school}`;
            all_education.push(education)
        });
    }

    let all_certification = []
    if (jobSeeker.certification) {
        jobSeeker.certification.forEach(element => {
            const certification = `${element.title} at ${element.issuingOrg} ON ${element.dateIssued}`;
            all_certification.push(certification)
        });
    }
    return (
        <>
            <div className="profile">
                {/* bio */}
                <div className="bio">
                    {jobSeeker.job_seeker && (
                        <>
                            <div className="profile-picture">
                                <h1>{`${jobSeeker.job_seeker.firstName && jobSeeker.job_seeker.firstName[0].toUpperCase()}${jobSeeker.job_seeker.lastName && jobSeeker.job_seeker.lastName[0].toUpperCase()}`}</h1>
                            </div>
                            <div className="info">
                                <h1>{`${camelCaseStr(jobSeeker.job_seeker.firstName)} ${camelCaseStr(jobSeeker.job_seeker.lastName)}`}</h1>
                                <p>{jobSeeker.jobSeekerInfo.jobName}</p>
                                <p>Location: {`${camelCaseStr(jobSeeker.job_seeker.city)}, ${camelCaseStr(jobSeeker.job_seeker.country)}`}</p>
                                <div className="message">
                                    <div className="phone">
                                        <FaPhone size="1.5em"/>
                                        <span>+2347062869135</span>
                                    </div>
                                    <div className="email">
                                        <MdEmail size="1.5em"/>
                                    <a href={`mailto:${jobSeeker.job_seeker.email}`}>{jobSeeker.job_seeker.email}</a>
                                    </div>
                                    <div className="linkedin">
                                        <FaLinkedin size="1.5em"/>
                                        <a href="google.com">Linkedin</a>
                                    </div>
                                    <div>
                                        <Logout/>
                                    </div>
                                </div>
                                
                            </div>
                            <div>
                                <EditProfile jobSeeker={jobSeeker} icon={<FaEdit size="2em"/>} camelCase={camelCase}/>
                            </div>
                        </>
                    )}
                    
                </div>
                {/* professional summary */}
                <div className="summary">
                    <div>
                        <h3>Professional Summary</h3>
                        {
                            jobSeeker.jobSeekerInfo && (
                                <>
                                    <p>
                                        {jobSeeker.jobSeekerInfo.bio}
                                    </p>
                                    
                                </>
                            )
                        }
                    </div>
                </div>
                {/* education */}
                <ProfileBox 
                    subheader={"Education"}
                    children={all_education}
                    icon={<GiGraduateCap size="2em" />} cls={"container-box"}
                    addButton={<AddEducation camelCase={camelCase}/>}
                />
                {/* certification */}
                <ProfileBox 
                    subheader={"Certification"}
                    children={all_certification}
                    // addButton={<AddButton text={"Add Certification"} onClick={() => navigate("/addCertification")} />}
                    icon={<BiSolidCertification size="2em"/>} cls={"container-box"}
                    addButton={<AddCertification camelCase={camelCase}/>}
                />
                
                
                <div className="experience">
                    <h2>Experience</h2>
                    {
                        jobSeeker.experience && (
                            jobSeeker.experience.map((element) => (
                                <ProfileBox 
                                subheader={element.company}
                                children={[`${element.description} from ${element.startDate} to ${element.startDate} at ${element.location}`]}
                                icon={<IoBagAdd size="2em"/>} cls={"container-box-ex"}
                                />
                            ))
                        )
                    }
                    <AddExperience camelCase={camelCase}/>
                </div>
                <div className="portfolios">
                    <h2>Portfolios</h2>
                    <div className="many_portfolios">
                        {
                            jobSeeker.portfolio && (
                                jobSeeker.portfolio.map((element) => (
                                    <Portfolio 
                                    description={element.description}
                                    link={element.link}
                                    title={element.title}
                                    />
                                ))
                            )
                        }
                    </div>
                    <div className="portfolio_container">
                        <AddPortfolio camelCase={camelCase}/>
                    </div>
                    
                    
                    
                </div>
                <div className="skills">
                    <h2>Skills</h2>
                    <div className="many_skills">
                        {
                            jobSeeker.job_seeker && (
                                <>
                                    {jobSeeker.job_seeker.skills.map((skill) => (
                                        <Skill name={skill}/>
                                    ))}
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="profile-footer">
                    <h3>&copy; 2024 {jobSeeker.job_seeker && `${jobSeeker.job_seeker.firstName} ${jobSeeker.job_seeker.lastName}`}. All right reserved</h3>
                </div>
            </div>

        </>
    )
}