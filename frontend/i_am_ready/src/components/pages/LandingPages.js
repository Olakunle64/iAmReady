import Button from "../Button";
import Feature from "../Feature";
import Testimonial from "../Testimonial";
import { IoPerson } from "react-icons/io5";
import { IoBagAdd } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";


export default function LandingPage({reviews}) {
    return (
      <>
        <div className="header">
          <h1><b>iAmReady</b></h1>
          <div className="links">
            <h3>Get Started</h3>
            <h3>How It Works</h3>
            <h3>Testimonials</h3>
            <h3>Login</h3>
          </div>
        </div>
        <div className="subHeader">
          <h2>Connecting Ambitious Talent with Top Recruiters</h2>
          <h2>Find Your Dream Job or Discover the Perfect Candidate Effortlessly</h2>
          <Button text={"Get Started"}/>
        </div>
        <div className="features">
          <Feature name={"Register"} description={"Create your account easily and quickly"} icon={<IoPerson size="4em"/>}/>
          <Feature name={"Profile Creation"} description={"Build and impressive profile or post your job openings"} icon={<IoBagAdd size="4em"/>}/>
          <Feature name={"Matching"} description={"Get matched with perfect job or candidate"} icon={<IoMdCheckmarkCircle size="4em"/>}/>
        </div>
        <div className="container">
          <h2>Testimonials</h2>
          <div className="testimonials">
            {
              reviews.map((review) => {
                return <Testimonial review={review}/>
              })
          }
          </div>
        </div>
        <div className="register">
          <h2>Are you ready to get started?</h2>
          <Button text={"Register Now"}/>
        </div>
        <footer>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
          </ul>
          <ul>
            <li>Github</li>
            <li>Linkedin</li>
            <li>Twitter</li>
          </ul>
        </footer>
        
      </>
    );
  }