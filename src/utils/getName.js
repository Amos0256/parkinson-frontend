export function getExamName(id) {
    const list = ["手部抓握", "手指捏握", "手掌翻面", "抬腳"]
    return list[id - 1]
}