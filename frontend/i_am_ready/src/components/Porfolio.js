export default function Portfolio({description, link, title}) {
    return (
        <div className="portfolio">
            <h3>{title}</h3>
            <p>{description}</p>
            {/* put the link props in a link */}
            <a href={link} target="_blank" rel="noreferrer">Link to project</a>
        </div>
    )
}