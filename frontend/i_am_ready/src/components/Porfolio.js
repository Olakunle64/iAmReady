export default function Portfolio({description, link, title}) {
    return (
        <div className="portfolio">
            <h3>{title}</h3>
            <p>{description}</p>
            <a href={link} target="_blank" rel="noreferrer">Link to project</a>
        </div>
    )
}