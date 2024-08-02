// import React from 'react';
// // import JobSeekerCard from '../JobSeekerCard';
// import SearchResults from '../JobSeekerCard';
// import { IoSearchSharp } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// // import Image from 'react-image';

// const SearchPage = () => {
//     const [keywords, setKeywords] = useState("");
//     const navigate = useNavigate();
//     const [jobSeekers, setjobSeekers] = useState([]);
//     const [cookies] = useState(() => {
//         return document.cookie.split(";").reduce((acc, cookie) => {
//             const [key, value] = cookie.trim().split("=");
//             acc[key] = value;
//             return acc;
//         }, {});
//     });

//     useEffect(() => {
//         async function getJobSeekers() {
//             try {
//                 // const cookies = localStorage.getItem("cookies");
//                 const response = await fetch("http://127.0.0.1:5000/api/v1/job_seekers", {
//                     // mode: 'no-cors',
//                     method: "GET",
//                     credentials: "include",
//                     cookies: JSON.stringify(cookies),
//                     headers: {
//                         "Content-Type": "application/json",
//                         // "Access-Control-Allow-Origin": "*",
//                         "Cookie": JSON.stringify(cookies),
//                         "Authorization": JSON.stringify(cookies)
//                     },
//                     // body: JSON.stringify({name: "olakunle"})
//                 });
    
//                 if (!response.ok) {
//                     // throw new Error("Unable to fectch jobseeker details");
//                     navigate('/login');
//                 }
    
//                 localStorage.removeItem("cookies");
//                 return await response.json();
//             } catch (err) {
//                 console.error("Error occured", err);
//                 navigate("/");
//             }
//         }
//         getJobSeekers().then((data) => {
//             setjobSeekers(data)
//             // console.log("my Class: ", data)
//         });
//     });
//     return (
//     <>
//         <div className='search_page'>
//             <div className='search'>
//                 <div class="group">
//                     <IoSearchSharp size="3em" className='icon'/>
//                     <input placeholder="Search by skills, job titles, locations, etc" type="search" class="input" onChange={(e) => {setKeywords(e.target.value)}}/>
//             </div>
//                 {/* <IoSearchSharp size="3em"/>
//                 <input type="text" placeholder="Search by skills, job titles, locations, etc" onChange={(e) => {setKeywords(e.target.value)}}/> */}
//             </div>
//         </div>
//         {/* <JobSeekerCard name={"Salau Isiaka"} title={"Software Developer"} location={"Ogun, Nigeria"} skills={["python", "javascript"]}/> */}
//         <div className='job-cards'>
//             {jobSeekers && (
//                 <SearchResults users={jobSeekers} keywords={keywords}/>
//             )}
            
//         </div>
        
//     </>
//     );
// };

// export default SearchPage;

import React, { useEffect, useState } from 'react';
import SearchResults from '../JobSeekerCard';
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [keywords, setKeywords] = useState("");
    const [jobSeekers, setJobSeekers] = useState([]);
    const [filteredJobSeekers, setFilteredJobSeekers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(2);
    const navigate = useNavigate();
    const [cookies] = useState(() => {
        return document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {});
    });

    useEffect(() => {
        async function getJobSeekers() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/v1/job_seekers`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie": JSON.stringify(cookies),
                        "Authorization": JSON.stringify(cookies)
                    }
                });

                if (!response.ok) {
                    navigate('/login');
                }

                const data = await response.json();
                setJobSeekers(data);
            } catch (err) {
                console.error("Error occurred", err);
                navigate("/");
            }
        }
        getJobSeekers();
    }, [cookies, navigate]); // Fetch all job seekers once on component mount

    useEffect(() => {
        const keywordArray = keywords.toLowerCase().trim().split(/\s+/);
        const filtered = jobSeekers && jobSeekers.filter(user => {
            return keywordArray.some(keyword =>
                (user.firstName && user.firstName.toLowerCase().includes(keyword)) ||
                (user.lastName && user.lastName.toLowerCase().includes(keyword)) ||
                (user.jobName && user.jobName.toLowerCase().includes(keyword)) ||
                (user.city && user.city.toLowerCase().includes(keyword)) ||
                (user.country && user.country.toLowerCase().includes(keyword)) ||
                (user.bio && user.bio.toLowerCase().includes(keyword)) ||
                (user.skills && user.skills.join(', ').toLowerCase().includes(keyword))
            );
        });
        setFilteredJobSeekers(filtered);
        setCurrentPage(1); // Reset to page 1 when filtering
    }, [keywords, jobSeekers]); // Re-run when keywords or jobSeekers change

    const totalPages = Math.ceil(filteredJobSeekers && filteredJobSeekers.length / limit);
    const currentJobSeekers = filteredJobSeekers && filteredJobSeekers.slice((currentPage - 1) * limit, currentPage * limit);

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
            <div className='search_page'>
                <div className='search'>
                    <div className="group">
                        <IoSearchSharp size="3em" className='icon' />
                        <input 
                            placeholder="Search by skills, job titles, locations, etc" 
                            type="search" 
                            className="input" 
                            onChange={(e) => setKeywords(e.target.value)} // Update keywords
                        />
                    </div>
                </div>
            </div>
            <div className='job-cards'>
                {currentJobSeekers && (
                    <SearchResults users={currentJobSeekers} keywords={keywords} />
                )}
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</button>
            </div>
        </>
    );
};

export default SearchPage;
