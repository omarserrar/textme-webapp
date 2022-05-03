export function formatDate(date : Date) : string{
    let strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let d = date.getDate();
    let m = strArray[date.getMonth()];
    let y = date.getFullYear();
    let h = date.getHours();
    let min = date.getMinutes();
    return `${d} ${m} ${y} ${h}:${min} `;
}
