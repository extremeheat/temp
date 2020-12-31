const test = require('./index')

if (test.hello() === 'hello world!') {
    
    let fname = test.writeFile()
    if (fname) {
        console.log('::set-output name=BUILT::' + fname)
    }
    
    process.exit(0)
} else {
    process.exit(1)
}