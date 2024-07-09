import React, { useState } from "react";
import ButtonSub from "../ButtonSub";
import { useNavigate } from "react-router-dom";

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
            const response = await fetch("http://localhost:5000/api/v1/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
            // console.log(typeof password)
            if (!response.ok) {
                alert("Invalid email or password.");
                return
            }
            // console.log(response)

            // const cookies = response.headers.get("Set-Cookie");
            alert("Login successful!");

            // localStorage.setItem("cookies", cookies);

            user_type === "j" ? navigate("/job-seeker-profile") : navigate("/recruiter-profile");

        } catch (error) {
            console.error("Error logging in:", error);
            navigate("/login");
        }
    };

    return (
        <div className="login">
            <form className="sub_login" onSubmit={handleSubmit}>
                <h1>iAmReady</h1>
                <h2>Bridging Talent with Opportunities</h2>
                <input
                    type="email"
                    placeholder="Email address"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
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
            </form>
        </div>
    );
}
