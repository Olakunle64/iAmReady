export default function ButtonSub({text, color, onClick}) {
    return (
        // strip the # character at the beginning of the color value
        <button type="submit" className={`btn_${color.slice(1)}`} onClick={onClick}>
            {text}
        </button>
    )
}