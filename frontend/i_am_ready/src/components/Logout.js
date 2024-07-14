import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";


export default function Logout() {
    const navigate = useNavigate();
    // const cookies = {
    //     session_id: document.cookie.split(";")[0].split("=")[1],
    //     user_type: document.cookie.split(";")[1].split("=")[1]
    // }
    // function deleteCookie() {
    //     document.cookie.split(";").forEach(function(c) {
    //         const cookie = c.trim().split("=");
    //         if (cookie[0] === "session_id" || cookie[0] === "user_type") {
    //             document.cookie = cookie[0] + "=;expires=" + new Date().toUTCString + ";PATH=/";
    //         }
    //     });
    // }
    async function handleLogout() {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/v1/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": JSON.stringify(cookies)
                },
                body: JSON.stringify({name: "olakunle"})
            });

            if (!response.ok) {
                navigate("/");
            }

            const data = await response.json();
            // deleteCookie();
            console.log(data);
            navigate("/login");
        } catch (err) {
            console.error("Error logging out:", err);
            navigate("/");
        }
    }

    return (
        <div className="logout" onClick={handleLogout}>
            <RiLogoutCircleLine size="2em" color="red"/>
            <h2>Logout</h2>
        </div>
    );
}
