import React from "react"
import { useState } from "react"
import EditEducation from "./EditEducation"

export default function ProfileBox({header, subheader, children, icon, cls, optional, addButton, jobSeeker, camelCase}) {
    const [showForm, setShowForm] = useState(false);
    const [educationId, setEducationId] = useState(null);

    function handleButtonDoubleClick(e) {
        setEducationId(e.target.id);
        setShowForm(true);
    }

    return (
        <div className={cls}>
            <div className="profile-box">
                {header && <h3>{header}</h3>}
                <div className="sub_logo">
                    {icon}
                    <h4>{subheader}</h4>
                </div>

                {optional && <p className="parag">{optional}</p>}
                <ul>
                    {
                        Object.keys(children).map((key, index) => (
                            <li onDoubleClick={handleButtonDoubleClick} key={index} id={key}>{children[key]}</li>
                        ))
                    }
                </ul>
                {addButton && addButton}
            </div>
            {showForm && subheader === "Education" && (
                <EditEducation
                    showForm={showForm}
                    setShowForm={setShowForm}
                    jobSeeker={jobSeeker}
                    camelCase={camelCase}
                    educationId={educationId}
                />
            )}
        </div>
    )
}
