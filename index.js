var shouldFail = false

module.exports = {
    hello: function() {
        if (process.env.FAIL || shouldFail) return 'nope!!'
        return 'hello world!'
    }
}