import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { TbWorld } from "react-icons/tb";
import Logout from "./Logout";
import EditProfileR from "./EditProfileR";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecruiterBio() {
    const navigate = useNavigate();
    const [Recruiter, setRecruiter] = useState([]);
    const [cookies] = useState(() => {
        return document.cookie.split(";").reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split("=");
          acc[key] = value;
          return acc;
        }, {});
      });
      function camelCaseStr(str) {
        if (str) {
            let newStr = str[0].toUpperCase() + str.slice(1).toLowerCase();
            return newStr;
        } else {
            return "";
        }
    }
    useEffect(() => {
        async function getRecruiterDetails() {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/v1/recruiter", {
                    method: "GET",
                    credentials: "include",
                    cookies: JSON.stringify(cookies),
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie": JSON.stringify(cookies),
                        "Authorization": JSON.stringify(cookies)
                    },
                });
    
                if (!response.ok) {
                    navigate('/login');
                }
    
                localStorage.removeItem("cookies");
                return await response.json();
            } catch (err) {
                console.error("Error occured", err);
                navigate("/");
            }
        }
        getRecruiterDetails().then((data) => {
            setRecruiter(data)
        });
    })
    return (
        <div className="bio">
            <div className="profile-picture">
                <FcManager size="5em"/>
            </div>
            {Recruiter && (
                <>
                    <div className="info">
                        <h1>{Recruiter.companyName}</h1>
                        <p><b>Company Description:</b> {Recruiter.companyDesc}</p>
                        <p><b>Location:</b> {`${camelCaseStr(Recruiter.city)}, ${camelCaseStr(Recruiter.country)}`}</p>
                        <div className="message">
                            <div className="phone">
                                <FaPhone size="1.5em"/>
                                <span>{Recruiter.phoneNumber}</span>
                            </div>
                            <div className="email">
                                <MdEmail size="1.5em"/>
                                <a href={`mailto:${Recruiter.email}`}>{Recruiter.email}</a>
                            </div>
                            <div className="linkedin">
                                <FaLinkedin size="1.5em"/>
                                <a href="google.com">Linkedin</a>
                            </div>
                            <div className="website">
                                <TbWorld size="1.5em"/>
                                <a href={Recruiter.websiteUrl}>Website</a>
                            </div>
                            <div>
                                <Logout/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <EditProfileR icon={<FaEdit size="2em"/>} Recruiter={Recruiter}/>
                    </div>
                </>
            )}
        </div>
    )
}