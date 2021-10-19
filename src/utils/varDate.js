function getDateOnlyString() {
    const date = new Date().toLocaleDateString();
    return String(date).replace(/\./g, "-");
}

function getTimeOnlyString() {
    const date = new Date().toLocaleTimeString();
    return String(date);
}

module.exports = { getDateOnlyString, getTimeOnlyString };