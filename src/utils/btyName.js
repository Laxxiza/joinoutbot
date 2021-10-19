function btyName(firstName, lastName) {
    let username = ([firstName, lastName].filter(name => name != null)).join(" ");
    return username;
}

module.exports = btyName;