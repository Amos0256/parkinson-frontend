
function padding(number) {
    return number > 9 ? `${number}` : `0${number}`
}
export default function formatTime(time) {
    return `${padding(time.getHours())}:${padding(time.getMinutes())}:${padding(time.getSeconds())}`;
}