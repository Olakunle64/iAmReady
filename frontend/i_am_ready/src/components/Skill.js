import { FaRegStar } from "react-icons/fa6";
export default function Skill({name}) {
    return (
        <div className="skill">
            <FaRegStar size="2em"/>
            <h4>{name}</h4>
        </div>
    )
}