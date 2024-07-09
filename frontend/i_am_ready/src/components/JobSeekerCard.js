import { IoPerson } from "react-icons/io5";

// import ButtonSub from "./ButtonSub";
const JobSeekerCard = ({ name, title, location, skills }) => {
    return (
        <div className="user-profile">
            <div className="icon-intro">
                <IoPerson size="5em" />
                <div className="user-profile-info">
                    <h3>{name}</h3>
                    <p>{title}</p>
                    <p>{location}</p>
                
                </div>
            </div>
            
            <p className="experience"><b>Experienced in:</b> {skills.join(', ')}</p>
            <button>View Profile</button>
            {/* <ButtonSub text={"View Profile"} color={"blue"}/> */}
        </div>
    );
};
// export default JobSeekerCard;
const SearchResults = () => {
    const users = [
        {
            name: 'John Doe',
            title: 'Software Engineer',
            location: 'San Francisco, CA',
            skills: ['JavaScript', 'React', 'Node.js'],
        },
        {
            name: 'Jane Smith',
            title: 'Data Scientist',
            location: 'New York, NY',
            skills: ['Python', 'Machine Learning', 'Data Analysis'],
        },
        {
            name: 'Michael Brown',
            title: 'Project Manager',
            location: 'Chicago, IL',
            skills: ['Agile', 'Scrum', 'Project Planning'],
            currentEmployer: 'Enterprise Inc.'
        },
        {
            name: 'John Doe',
            title: 'Software Engineer',
            location: 'San Francisco, CA',
            skills: ['JavaScript', 'React', 'Node.js'],
        },
        {
            name: 'John Doe',
            title: 'Software Engineer',
            location: 'San Francisco, CA',
            skills: ['JavaScript', 'React', 'Node.js'],
        }
    ];

    return (
        <>
        {users.map((user, index) => (
            <JobSeekerCard
            key={index}
            name={user.name}
            title={user.title}
            location={user.location}
            skills={user.skills}
            />
        ))}
        </>
    );
    };

export default SearchResults;
