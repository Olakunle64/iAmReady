import { useNavigate } from "react-router-dom";

export default function RecruiterSearch() {
    const navigate = useNavigate();
    return (
        <>
            <div className="sub_re_profile">
                <div className="re_header">
                    <div className="pyramid-loader">
                        <div className="wrapper">
                            <span className="side side1"></span>
                            <span className="side side2"></span>
                            <span className="side side3"></span>
                            <span className="side side4"></span>
                            <span className="shadow"></span>
                        </div>  
                    </div>
                    <div className="re_text">
                        <h1>Welcome to iAmReady Website</h1>
                        <p>Enjoy the greatest matching algorithm</p>
                    </div>
                </div>
                <button className="custom-btn btn-2" onClick={() => {navigate("/search")}}>Search for Job Seekers</button>
            </div>
            <div className="profile_footer">
                <h3>&copy; 2024 All rights reserved</h3>
            </div>
        </>
    );
}
