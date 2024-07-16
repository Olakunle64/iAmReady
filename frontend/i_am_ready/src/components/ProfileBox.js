import React from "react"
export default function ProfileBox({header, subheader, children, icon, cls, optional, addButton}) {
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
                        
                        React.Children.toArray(children).map((child, index) => (
                            <li key={index}>{child}</li>
                        ))
                    }
                </ul>
                {/* render addButton if it is not empty */}
                {addButton && addButton}
                {/* {addButton } */}
            </div>
        </div>
        
    )
}