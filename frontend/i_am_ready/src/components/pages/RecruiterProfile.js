import RecruiterBio from "../RecruiterBio"
import RecruiterSearch from "../RecruiterSearch"
import ReviewButton from "../ReviewButton"

export default function RecruiterProfile() {
    return (
        <>
            <RecruiterBio />
            <RecruiterSearch />
            <ReviewButton url={"http://localhost:5000/api/v1/recruiter/review"} />
        </>
    )
}