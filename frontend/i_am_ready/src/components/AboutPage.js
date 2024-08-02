import React from 'react';

const AboutPage = () => {
    return (
        <div className="about">
            <h1>About iAmReady</h1>
            <p>
                iAmReady is a platform designed to bridge the gap between recruiters and job seekers. 
                Our goal is to create a seamless experience where recruiters can easily search for candidates 
                that match their requirements and connect with them directly.
            </p>

            <h2>Mission Statement</h2>
            <p>
                Our mission is to simplify the recruitment process, making it easier for recruiters 
                to find the right talent and for job seekers to showcase their skills and experiences.
            </p>

            <h2>About the Developer</h2>
            <p>
                This project is a solo endeavor by <b>Salau Isiaka Olakunle</b>, who developed both the frontend 
                and backend functionalities of the platform. With a passion for connecting talent with opportunities, 
                Salau has dedicated significant effort to ensure a user-friendly experience for both recruiters 
                and job seekers.
            </p>
            <img src="/developer-picture.jpg" alt="Salau Isiaka Olakunle" className="developer-picture" />
            
            <h2>How It Works</h2>
            <p>
                Job seekers can create profiles that showcase their skills, experiences, and availability. 
                Recruiters can search through these profiles and will be notified when a job seeker views their 
                profile, fostering a more interactive and engaging recruitment process.
            </p>

            <h2>Vision for the Future</h2>
            <p>
                Our vision is to continually enhance the platform with new features that improve the 
                recruitment experience for both recruiters and job seekers. We aim to build a community 
                where talent meets opportunity effortlessly.
            </p>

            <h2>Contact Us</h2>
            <p>
                For inquiries or feedback, please reach out via email at <a href="mailto:olakunleisiaq50@gmail.com">olakunleisiaq50@gmail.com</a>.
            </p>
        </div>
    );
};

export default AboutPage;
