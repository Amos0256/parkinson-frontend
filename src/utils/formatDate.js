function padding(number) {
    return number > 9 ? `${number}` : `0${number}`
}

export default function formatDate(date) {

    return `${date.getFullYear()}-${padding(date.getMonth() + 1)}-${padding(date.getDate())}`
}