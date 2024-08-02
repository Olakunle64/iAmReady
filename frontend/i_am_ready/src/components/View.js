export default function View({view}) {
    return (
        <>
            <div className="view">
                <p><b>Company Name:</b> {view.companyName}</p>
                <p><b>Company Description:</b> {view.companyDesc}</p>
                <p><b>Date Viewed:</b> {view.dateViewed}</p>
            </div>
        </>
    )
}