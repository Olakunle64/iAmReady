export default function AddButton({text, onClick}) {
    return (
        <button onClick={onClick} className="add-button">{text}</button>
    )
}