import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const JobSeekerCard = ({ name, title, location, skills, id, bio }) => {
    const navigate = useNavigate();
    const truncateBio = (bio, maxLength = 30) => {
        if (!bio) return "";
        return bio.length > maxLength ? bio.slice(0, maxLength) + "..." : bio;
    };
    const [cookies] = useState(() => {
        return {
            session_id: localStorage.getItem("session_id") || "",
            user_type: localStorage.getItem("user_type") || "",
        };
    });
    async function handleViewProfile(e) {
        const id = e.target.id;
        try {
            const response = await fetch("https://iamready.onrender.com/api/v1/job_seeker/view", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "*",
                    "Cookie": JSON.stringify(cookies),
                    "Authorization": JSON.stringify(cookies)
                },
                body: JSON.stringify({job_seeker_id: id}),
            });
    
            if (!response.ok) {
                alert("view not created.");
                return;
            }
    
            // alert("View Created!");
    
            navigate(`/job-seeker-profile/${id}`);
    
        } catch (error) {
            console.error("Error logging in:", error);
            // Optionally, handle errors here
            navigate("/login");
        }
        
        
    }
    return (
        <div className="user-profile">
            <div className="icon-intro">
                <IoPerson size="5em" />
                <div className="user-profile-info">
                    <h3>{name}</h3>
                    <p>{title && title.split(",").join(" || ")}</p>
                    <p><b>Location:</b> {location}</p>
                </div>
            </div>
            <p><b>Bio:</b> {truncateBio(bio)}</p>
            <p className="experience"><b>Experienced in:</b> {skills.join(', ')}</p>
            <button id={id} onClick={handleViewProfile} >View Profile</button>
        </div>
    );
};

const SearchResults = ({ users, keywords }) => {

    return (
        <>
            {users.map((user, index) => {
                return (
                        <JobSeekerCard 
                            key={index} 
                            name={`${user.firstName} ${user.lastName}`}
                            title={user.jobName}
                            location={`${user.city}, ${user.country}`}
                            skills={user.skills}
                            id={user.id}
                            bio={user.bio}
                        />
                    );
                }
    )}
        </>
    );
};

export default SearchResults;
