import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";


export default function Logout() {
    const navigate = useNavigate();
    // const [cookies] = useState({
    //     session_id: document.cookie.split(";")[0].split("=")[1],
    //     user_type: document.cookie.split(";")[1].split("=")[1]
    //     // session_id: storedCookies.
    // });
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      }, {});

      function clearCookies() {
        const cookies = document.cookie.split(";");
      
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
      }
      
    // console.log(document.cookie);
    async function handleLogout() {
        try {
            // const cookies = localStorage.getItem("cookies");
            console.log(cookies);
            const response = await fetch("http://127.0.0.1:5000/api/v1/logout", {
                // mode: 'no-cors',
                method: "POST",
                credentials: "include",
                cookies: JSON.stringify(cookies),
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "*",
                    "Cookie": JSON.stringify(cookies),
                    "Authorization": JSON.stringify(cookies)
                },
                body: JSON.stringify({name: "olakunle"})
            });

            if (!response.ok) {
                // clearCookies();
                throw new Error("Failed to log out");
            }

            const data = await response.json();
            // localStorage.removeItem("cookies");
            clearCookies();
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
