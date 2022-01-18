const logInRed = (data => {
    console.log('\x1b[31m%s\x1b[0m', data);
});
const logInGreen = (data => {
    console.log('\x1b[32m%s\x1b[0m', data);
})

module.exports = { logInRed: logInRed, logInGreen: logInGreen }