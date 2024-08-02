import React from "react"
import { useState } from "react"
import EditEducation from "./EditEducation"
import EditCertification from "./EditCertification";
import EditExperience from "./EditExperience";

export default function ProfileBox({header, subheader, children, icon, cls, optional, addButton, jobSeeker, camelCase}) {
    const [showForm, setShowForm] = useState(false);
    const [objId, setobjId] = useState(null);

    function handleButtonDoubleClick(e) {
        setobjId(e.target.id);
        setShowForm(true);
    }

    return (
        <div className={cls}>
            <div className="profile-box">
                {header && <h3 style={{fontSize: "100px"}} >{header}</h3>}
                <div className="sub_logo">
                    {icon}
                    <h4>{subheader}</h4>
                </div>

                {optional && <p className="parag">{optional}</p>}
                <ul>
                    {
                        // children is a list of object so loop through it and display <li title="Double click to edit" onDoubleClick={handleButtonDoubleClick} key={each id of the object in the array} id={each id of the object in the array} tabIndex="0">the object value</li>
                        // children.map((child) => (
                        //     <li title="Double click to edit" onDoubleClick={handleButtonDoubleClick} key={child.id} id={child.id} tabIndex="0">
                        //         {child.value}
                        //     </li>
                        // ))
                        Object.keys(children).map((key, index) => (
                            <li title="Double click to edit" onDoubleClick={handleButtonDoubleClick} key={index} id={key} tabIndex="0">{children[key]}</li>
                        ))
                    }
                </ul>
                {
                    jobSeeker && jobSeeker.user === "JobSeeker" && addButton && (
                        addButton
                    )
                }
                
            </div>
            {showForm && subheader === "Education" && jobSeeker && jobSeeker.user === "JobSeeker" && (
                <EditEducation
                    showForm={showForm}
                    setShowForm={setShowForm}
                    jobSeeker={jobSeeker}
                    camelCase={camelCase}
                    objId={objId}
                />
            )}
            {showForm && subheader === "Certification" && jobSeeker && jobSeeker.user === "JobSeeker" && (
                <EditCertification
                    showForm={showForm}
                    setShowForm={setShowForm}
                    jobSeeker={jobSeeker}
                    camelCase={camelCase}
                    objId={objId}
                />
            )}
            {showForm && subheader !== "Certification" && subheader !== "Education" && jobSeeker && jobSeeker.user === "JobSeeker" && (
                <EditExperience
                    showForm={showForm}
                    setShowForm={setShowForm}
                    jobSeeker={jobSeeker}
                    camelCase={camelCase}
                    objId={objId}
                />
            )}
        </div>
    )
}
