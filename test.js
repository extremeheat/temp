const test = require('./index')

if (test.hello() === 'hello world!') {
    process.exit(0)
} else {
    process.exit(1)
}