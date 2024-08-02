import EditPortfolio from "./EditPortfolio";
import { useState } from "react";

export default function Portfolio({ description, link, title, jobSeeker, portfolioId}) {
    const [showForm, setShowForm] = useState(false);
    const [objId, setobjId] = useState(null);
    // console.log("portfolioId", portfolioId)
    // console.log("element", element)
    function handleButtonDoubleClick(e) {
        setobjId(e.target.id);
        setShowForm(true);
    }

    return (
        <>
            <div
                title="Double click to edit"
                onClick={handleButtonDoubleClick}
                id={portfolioId}
                className="portfolio-card"
            >
                <h3 className="portfolio-title">{title}</h3>
                <p className="portfolio-description">{description}</p>
                <a
                    className="portfolio-link"
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                >
                    Link to project
                </a>
            </div>
            {showForm && jobSeeker && jobSeeker.user === "JobSeeker" && (
                <EditPortfolio
                    showForm={showForm}
                    setShowForm={setShowForm}
                    jobSeeker={jobSeeker}
                    objId={objId}
                />
            )}
        </>
    );
}
