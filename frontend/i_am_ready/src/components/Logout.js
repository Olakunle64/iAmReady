import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


export default function Logout() {
    const navigate = useNavigate();
    const [cookies] = useState(() => {
        return {
            session_id: localStorage.getItem("session_id") || "",
            user_type: localStorage.getItem("user_type") || "",
        };
    });

    function clearCookies() {
        localStorage.removeItem("session_id");
        localStorage.removeItem("user_type");
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
