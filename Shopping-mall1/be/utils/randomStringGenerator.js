const randomStringGenerator = () => {
    const randomString = Array.from(Array(10), () =>
        Math.floor(Math.random() * 36).toString(36)
    ).join("");

    console.log("randomString", randomString);
    return randomString;
}

module.exports = { randomStringGenerator };