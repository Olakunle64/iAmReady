import { useNavigate } from "react-router-dom";


const Feature = ({name, description, icon}) => {
    const navigate = useNavigate();
    return (
        <div className="feature" onClick={() => { name === "Register" ? navigate('/signup') : navigate('/login')}}>
            {icon}
            <h2>{name}</h2>
            <h3>{description}</h3>
        </div>
    );
}

export default Feature;