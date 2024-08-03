import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


export default function Logout() {
    const navigate = useNavigate();
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

    async function handleLogout() {
        try {
            // console.log(cookies);
            const response = await fetch("https://iamready.onrender.com/api/v1/logout", {
                method: "POST",
                credentials: "include",
                cookies: JSON.stringify(cookies),
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": JSON.stringify(cookies),
                    "Authorization": JSON.stringify(cookies)
                },
                body: JSON.stringify({name: "olakunle"})
            });

            if (!response.ok) {
                throw new Error("Failed to log out");
            }

            // const data = await response.json();
            
            clearCookies();
            // console.log(data);
            navigate("/");
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
