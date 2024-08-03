// import ProfileSection from "../ProfileSection";
// import { useNavigate } from "react-router-dom";
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from "react";

// export default function JobSeekerProfile() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [jobSeeker, setjobSeeker] = useState([])
//     const [cookies] = useState(() => {
//         return document.cookie.split(";").reduce((acc, cookie) => {
//             const [key, value] = cookie.trim().split("=");
//             acc[key] = value;
//             return acc;
//         }, {});
//     });
//     let url = "";
//     if (!id) {
//         url = "https://iamready.onrender.com/api/v1/jobSeeker"
//     } else {
//         url = `https://iamreadyy.onrender.com/api/v1/jobSeeker?job_seeker_id=${id}`
//     }
//     useEffect(() => {
//         async function getJobSeekerDetails() {
//             try {
//                 const response = await fetch(url, {
//                     method: "GET",
//                     credentials: "include",
//                     cookies: JSON.stringify(cookies),
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Cookie": JSON.stringify(cookies),
//                         "Authorization": JSON.stringify(cookies)
//                     },
//                 });
    
//                 if (!response.ok) {
//                     navigate('/login');
//                 }
    
//                 localStorage.removeItem("cookies");
//                 return await response.json();
//             } catch (err) {
//                 console.error("Error occured", err);
//                 navigate("/");
//             }
//         }
//         getJobSeekerDetails().then((data) => {
//             setjobSeeker(data)
//         });
//     });
//     return (
//         <>
//             <ProfileSection jobSeeker={jobSeeker} />
//         </>
//     )
// }


import ProfileSection from "../ProfileSection";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function JobSeekerProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jobSeeker, setJobSeeker] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [cookies] = useState(() => {
        return document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {});
    });

    let url = "";
    if (!id) {
        url = "https://iamready.onrender.com/api/v1/jobSeeker";
    } else {
        url = `https://iamready.onrender.com/api/v1/jobSeeker?job_seeker_id=${id}`;
    }

    useEffect(() => {
        async function getJobSeekerDetails() {
            setLoading(true); // Start loading
            try {
                const response = await fetch(url, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie": JSON.stringify(cookies),
                        "Authorization": JSON.stringify(cookies)
                    },
                });

                if (!response.ok) {
                    navigate('/login');
                    return;
                }

                const data = await response.json();
                setJobSeeker(data);
            } catch (err) {
                console.error("Error occurred", err);
                navigate("/");
            } finally {
                setLoading(false); // End loading
            }
        }

        getJobSeekerDetails();
    }, [url, navigate, cookies]);

    return (
        <>
            {loading ? (
                <div className="loader">Loading...</div> // Loader
            ) : (
                <ProfileSection jobSeeker={jobSeeker} />
            )}
        </>
    );
}
