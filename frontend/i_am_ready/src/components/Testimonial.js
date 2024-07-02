export default function Testimonial({review}) {
    return (
        <div className="testimonial">
            <h3>"{review.description}"</h3>
            <h2><b>{review.name}</b></h2>
        </div>
    );
}