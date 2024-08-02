import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../Button";
import Feature from "../Feature";
import Testimonial from "../Testimonial";
import { IoPerson } from "react-icons/io5";
import { IoBagAdd } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useState } from "react";

export default function LandingPage({ reviews }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Number of testimonials per page

    const totalPages = Math.ceil(reviews.length / itemsPerPage);
    const currentReviews = reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();
    const location = useLocation();
    const linkStyle = {
        color: 'white',
        textDecoration: 'underline',
    };

    const handleNavigation = (sectionId) => {
        navigate(`${location.pathname}#${sectionId}`, { behavior: 'smooth' });
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="header">
                <h1>
                    <img src="/logo.png" alt="Logo" className="logo" />
                    <b>iAmReady</b>
                </h1>
                <div className="hamburger" onClick={handleToggle}>
                    {/* Hamburger Icon */}
                    <div className={`bar ${isOpen ? "open" : ""}`}></div>
                    <div className={`bar ${isOpen ? "open" : ""}`}></div>
                    <div className={`bar ${isOpen ? "open" : ""}`}></div>
                </div>
                <div className={`links ${isOpen ? "open" : ""}`}>
                    <h3><Link to="/signup" style={linkStyle}>Get Started</Link></h3>
                    <h3><Link to="/about" style={linkStyle}>About</Link></h3>
                    <h3 onClick={() => handleNavigation('test')}>Testimonials</h3>
                    <h3><Link to="/login" style={linkStyle}>Login</Link></h3>
                </div>
            </div>
            <div className="subHeader">
                <h2>Connecting Ambitious Talent with Top Recruiters</h2>
                <h2>Find Your Dream Job or Discover the Perfect Candidate Effortlessly</h2>
                <Link to="/signup"><Button text={"Get Started"} /></Link>
            </div>
            <div className="features">
                <Feature name={"Register"} description={"Create your account easily and quickly"} icon={<IoPerson size="1.5em" />} />
                <Feature name={"Profile Creation"} description={"Build an impressive profile or post your job openings"} icon={<IoBagAdd size="1.5em" />} />
                <Feature name={"Matching"} description={"Get matched with the perfect job or candidate"} icon={<IoMdCheckmarkCircle size="1.5em" />} />
            </div>
            <div className="container">
                <h2 id="test">Testimonials</h2>
                <div className="testimonials">
                    {currentReviews.map((review, index) => (
                        <Testimonial review={review} key={index} />
                    ))}
                </div>
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</button>
                </div>
            </div>
            <div className="register">
                <h2>Are you ready to get started?</h2>
                <Link to="/signup"><Button text={"Register Now"} /></Link>
            </div>
            <footer>
                <ul>
                    <li><Link to="https://wa.me/message/NHNDDNF4HKG3A1" style={linkStyle}>Contact Us</Link></li>
                    <li><Link to="/about" style={linkStyle}>About Us</Link></li>
                    <li><Link to="" style={linkStyle}>Privacy Policy</Link></li>
                    <li><Link to="" style={linkStyle}>Terms and Conditions</Link></li>
                </ul>
                <ul>
                    <li><Link to="https://github.com/Olakunle64/" style={linkStyle} target="_blank" rel="noopener noreferrer">Github</Link></li>
                    <li><Link to="https://www.linkedin.com/in/salauolakunle?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" style={linkStyle} target="_blank" rel="noopener noreferrer">Linkedin</Link></li>
                    <li><Link to="https://twitter.com/SalauIsiaka1?t=oNUQcJRgsTj6gwVig51LYQ&s=09" style={linkStyle} target="_blank" rel="noopener noreferrer">Twitter</Link></li>
                </ul>
            </footer>
        </>
    );
}
