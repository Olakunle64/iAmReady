const Feature = ({name, description, icon}) => {
    return (
        <div className="feature">
            {icon}
            <h2>{name}</h2>
            <h3>{description}</h3>
        </div>
    );
}

export default Feature;