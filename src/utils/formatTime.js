
function padding(number) {
    return number > 9 ? `${number}` : `0${number}`
}
export default function formatTime(time) {
    return `${(time.getHours())}:${(time.getMinutes())}:${(time.getSeconds())}`;
}