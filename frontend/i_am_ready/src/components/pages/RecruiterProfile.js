import RecruiterBio from "../RecruiterBio"
import RecruiterSearch from "../RecruiterSearch"
import ReviewButton from "../ReviewButton"

export default function RecruiterProfile() {
    return (
        <>
            <RecruiterBio />
            <RecruiterSearch />
            <ReviewButton url={"https://iamready.onrender.com/api/v1/recruiter/review"} />
        </>
    )
}