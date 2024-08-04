import React, { useState } from "react";
import ButtonSub from "../ButtonSub";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
// import "./LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user_type, setUserType] = useState("");
    const [isUserTypeSelected, setIsUserTypeSelected] = useState(false);

    const handleRadioChange = (e) => {
        setUserType(e.target.value);
        setIsUserTypeSelected(true);
    };

    function clearCookies() {
        const cookies = document.cookie.split(";");
      
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isUserTypeSelected) {
            alert("Please select a user type.");
            return;
        }

        const dataToSend = {
            email,
            password,
            user_type,
        };

        try {
            clearCookies();
            const response = await fetch("https://iamready.onrender.com/api/v1/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
            

            if (!response.ok) {
                alert("Invalid email or password.");
                return;
            }

            alert("Login successful!");

            if (user_type === "j") {
                navigate('/job-seeker-profile', { replace: true });
            } else {
                navigate('/recruiter-profile', { replace: true });
            }

        } catch (error) {
            console.error("Error logging in:", error);
            navigate("/login");
        }
    };

    return (
        <div className="login">
            
            <form className="sub_login" onSubmit={handleSubmit}>
            <IoArrowBackCircle onClick={() => navigate('/')} 
                style={{ cursor: 'pointer', color: '#2563eB'}} size="2em" />
                <h1>iAmReady</h1>
                <h2>Bridging Talent with Opportunities</h2>
                <input
                    htmlFor="email"
                    type="email"
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    htmlFor="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            name="user_type"
                            value="j"
                            checked={user_type === "j"}
                            onChange={handleRadioChange}
                        />
                        Job Seeker
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="user_type"
                            value="r"
                            checked={user_type === "r"}
                            onChange={handleRadioChange}
                        />
                        Recruiter
                    </label>
                </div>
                <ButtonSub text={"Sign in"} color={"#2563eb"} />
                <div className="links">
                    <a href="/forgot-password">Forgot Password?</a>
                    <a href="/signup">Sign Up</a>
                </div>
            </form>
        </div>
    );
}

// import React, { useState } from "react";
// import ButtonSub from "../ButtonSub";
// import { useNavigate } from "react-router-dom";
// import { IoArrowBackCircle } from "react-icons/io5";
// // import "./LoginPage.css";

// export default function LoginPage() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [user_type, setUserType] = useState("");
//     const [isUserTypeSelected, setIsUserTypeSelected] = useState(false);
//     const [loading, setLoading] = useState(false); // Loader state

//     const handleRadioChange = (e) => {
//         setUserType(e.target.value);
//         setIsUserTypeSelected(true);
//     };

//     const waitForCookies = (callback) => {
//         const interval = setInterval(() => {
//             if (document.cookie) {
//                 clearInterval(interval);
//                 setLoading(false); // Hide loader when cookies are set
//                 callback();
//             }
//         }, 100); // Check every 100ms
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!isUserTypeSelected) {
//             alert("Please select a user type.");
//             return;
//         }

//         const dataToSend = {
//             email,
//             password,
//             user_type,
//         };

//         try {
//             const response = await fetch("https://iamready.onrender.com/api/v1/login", {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(dataToSend),
//             });

//             if (!response.ok) {
//                 alert("Invalid email or password.");
//                 return;
//             }

//             alert("Login successful!");
//             setLoading(true); // Show loader while waiting for cookies

//             // Add a slight delay before checking for cookies
//             setTimeout(() => {
//                 waitForCookies(() => {
//                     // Navigate based on user type
//                     if (user_type === "j") {
//                         navigate('/job-seeker-profile', { replace: true });
//                     } else {
//                         navigate('/recruiter-profile', { replace: true });
//                     }
//                 });
//             }, 3000); // 500ms delay

//         } catch (error) {
//             console.error("Error logging in:", error);
//             navigate("/login");
//         }
//     };

//     return (
//         <div className="login">
//             {loading && <div className="loader">Loading...</div>} {/* Loader */}
//             <form className="sub_login" onSubmit={handleSubmit}>
//                 <IoArrowBackCircle onClick={() => navigate('/')} 
//                     style={{ cursor: 'pointer', color: '#2563eB'}} size="2em" />
//                 <h1>iAmReady</h1>
//                 <h2>Bridging Talent with Opportunities</h2>
//                 <input
//                     htmlFor="email"
//                     type="email"
//                     placeholder="Email address"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     htmlFor="password"
//                     type="password"
//                     placeholder="Password"
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <div className="radio">
//                     <label>
//                         <input
//                             type="radio"
//                             name="user_type"
//                             value="j"
//                             checked={user_type === "j"}
//                             onChange={handleRadioChange}
//                         />
//                         Job Seeker
//                     </label>
//                     <label>
//                         <input
//                             type="radio"
//                             name="user_type"
//                             value="r"
//                             checked={user_type === "r"}
//                             onChange={handleRadioChange}
//                         />
//                         Recruiter
//                     </label>
//                 </div>
//                 <ButtonSub text={"Sign in"} color={"#2563eb"} />
//                 <div className="links">
//                     <a href="/forgot-password">Forgot Password?</a>
//                     <a href="/signup">Sign Up</a>
//                 </div>
//             </form>
//         </div>
//     );
// }
