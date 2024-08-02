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
import AddEducation from "./AddEducation";
import AddCertification from "./AddCertification";
import AddExperience from "./AddExperience";
import AddPortfolio from "./AddPortfolio";
import EditProfile from "./EditProfile";
import View from "./View";
import ReviewButton from "./ReviewButton";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

export default function ProfileSection({ jobSeeker }) {
    const [currentPageViews, setCurrentPageViews] = useState(1);
    const [currentPagePortfolios, setCurrentPagePortfolios] = useState(1);
    const itemsPerPage = 4; // Adjust this value for the number of items per page

    // Calculate total pages for views
    const totalPagesViews = Math.ceil((jobSeeker.view && jobSeeker.view.length) / itemsPerPage);
    const currentViews = jobSeeker.view ? jobSeeker.view.slice((currentPageViews - 1) * itemsPerPage, currentPageViews * itemsPerPage) : [];

    // Calculate total pages for portfolios
    const totalPagesPortfolios = Math.ceil((jobSeeker.portfolio && jobSeeker.portfolio.length) / itemsPerPage);
    const currentPortfolios = jobSeeker.portfolio ? jobSeeker.portfolio.slice((currentPagePortfolios - 1) * itemsPerPage, currentPagePortfolios * itemsPerPage) : [];

    const handleNextPageViews = () => {
        if (currentPageViews < totalPagesViews) {
            setCurrentPageViews(currentPageViews + 1);
        }
    };

    const handlePrevPageViews = () => {
        if (currentPageViews > 1) {
            setCurrentPageViews(currentPageViews - 1);
        }
    };

    const handleNextPagePortfolios = () => {
        if (currentPagePortfolios < totalPagesPortfolios) {
            setCurrentPagePortfolios(currentPagePortfolios + 1);
        }
    };

    const handlePrevPagePortfolios = () => {
        if (currentPagePortfolios > 1) {
            setCurrentPagePortfolios(currentPagePortfolios - 1);
        }
    };

    function camelCaseStr(str) {
        let newStr = str[0].toUpperCase() + str.slice(1).toLowerCase();
        return newStr;
    }

    let all_education = {};
    if (jobSeeker.education) {
        jobSeeker.education.forEach(element => {
            const education = `${element.degree} in ${element.fieldOfStudy} at ${element.school}`;
            all_education[element.id] = education;
        });
    }

    let all_certification = {};
    if (jobSeeker.certification) {
        jobSeeker.certification.forEach(element => {
            const certification = `${element.title} at ${element.issuingOrg} ON ${element.dateIssued}`;
            all_certification[element.id] = certification;
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
                                <p>{jobSeeker.job_seeker.jobName.split(",").join(' || ')}</p>
                                <p><b>Location:</b> {`${camelCaseStr(jobSeeker.job_seeker.city)}, ${camelCaseStr(jobSeeker.job_seeker.country)}`}</p>
                                <div className="message">
                                    <div className="phone">
                                        <FaPhone size="1.5em" />
                                        <span>{jobSeeker.job_seeker.phoneNumber}</span>
                                    </div>
                                    <div className="email">
                                        <MdEmail size="1.5em" />
                                        <a href={`mailto:${jobSeeker.job_seeker.email}`}>{jobSeeker.job_seeker.email}</a>
                                    </div>
                                    <div className="linkedin">
                                        <FaLinkedin size="1.5em" />
                                        <a href={jobSeeker.job_seeker.linkedIn}>LinkedIn</a>
                                    </div>
                                    {jobSeeker && jobSeeker.user === "JobSeeker" && (
                                        <div>
                                            <Logout />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {jobSeeker && jobSeeker.user === "JobSeeker" && (
                                <div>
                                    <EditProfile jobSeeker={jobSeeker} icon={<FaEdit size="2em" />} />
                                </div>
                            )}
                        </>
                    )}
                </div>
                {/* professional summary */}
                <div className="summary">
                    <div>
                        <h3>Professional Summary</h3>
                        {jobSeeker.job_seeker && (
                            <p>{jobSeeker.job_seeker.bio}</p>
                        )}
                    </div>
                </div>
                {/* education */}
                <ProfileBox
                    subheader={"Education"}
                    children={all_education}
                    icon={<GiGraduateCap size="2em" />} cls={"container-box"}
                    addButton={<AddEducation />} jobSeeker={jobSeeker}
                />
                {/* certification */}
                <ProfileBox
                    subheader={"Certification"}
                    children={all_certification}
                    icon={<BiSolidCertification size="2em" />} cls={"container-box"}
                    addButton={<AddCertification />} jobSeeker={jobSeeker}
                />
                {/* experience */}
                <div className="experience">
                    <h2>Experience</h2>
                    {jobSeeker.experience && (
                        jobSeeker.experience.map((element) => (
                            <ProfileBox
                                key={element.id}
                                subheader={element.company}
                                children={{ [element.id]: `${element.description} from ${element.startDate} to ${element.endDate} at ${element.location}` }}
                                icon={<IoBagAdd size="2em" />} cls={"container-box-ex"} jobSeeker={jobSeeker} />
                        ))
                    )}
                    {jobSeeker && jobSeeker.user === "JobSeeker" && (
                        <AddExperience />
                    )}
                </div>
                {/* portfolios with pagination */}
                <div className="portfolios">
                    <h2>Portfolios</h2>
                    <div className="many_portfolios">
                        {currentPortfolios.map((element) => (
                            <Portfolio
                                key={element.id}
                                description={element.description}
                                link={element.link}
                                title={element.title}
                                portfolioId={element.id}
                                jobSeeker={jobSeeker} />
                        ))}
                    </div>
                    <div className="pagination">
                        <button onClick={handlePrevPagePortfolios} disabled={currentPagePortfolios === 1}>Previous</button>
                        <span>Page {currentPagePortfolios} of {totalPagesPortfolios}</span>
                        <button onClick={handleNextPagePortfolios} disabled={currentPagePortfolios >= totalPagesPortfolios}>Next</button>
                    </div>
                    <div className="portfolio_container">
                        {jobSeeker && jobSeeker.user === "JobSeeker" && (
                            <div>
                                <AddPortfolio />
                            </div>
                        )}
                    </div>
                </div>
                {/* views with pagination */}
                <div className="portfolios">
                    <h2>Views ({jobSeeker.view && jobSeeker.view.length})</h2>
                    <div className="many_portfolios">
                        {currentViews.map((element, index) => (
                            <View key={index} view={element} />
                        ))}
                    </div>
                    <div className="pagination">
                        <button onClick={handlePrevPageViews} disabled={currentPageViews === 1}>Previous</button>
                        <span>Page {currentPageViews} of {totalPagesViews}</span>
                        <button onClick={handleNextPageViews} disabled={currentPageViews >= totalPagesViews}>Next</button>
                    </div>
                </div>
                {/* skills */}
                <div className="skills">
                    <h2>Skills</h2>
                    <div className="many_skills">
                        {jobSeeker.job_seeker && (
                            <>
                                {jobSeeker.job_seeker.skills.map((skill, index) => (
                                    <Skill key={index} name={skill} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className="profile-footer">
                    <h3>&copy; 2024 {jobSeeker.job_seeker && `${jobSeeker.job_seeker.firstName} ${jobSeeker.job_seeker.lastName}`}. All rights reserved</h3>
                </div>
            </div>
            {jobSeeker && jobSeeker.user === "JobSeeker" && (
                <ReviewButton url={"http://localhost:5000/api/v1/job_seeker/review"} />
            )}
        </>
    );
}
