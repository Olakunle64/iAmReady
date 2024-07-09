import React from "react"
export default function ProfileBox({header, subheader, children, icon, cls, optional}) {
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
            </div>
        </div>
        
    )
}