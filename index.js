const fs = require('fs')

var shouldFail = false

module.exports = {
    hello: function() {
        if (process.env.FAIL || shouldFail) return 'nope!!'
        return 'hello world!'
    },


    writeFile: function() {
        let fname = 'File'+ Date.now() + '.dat'
        fs.writeFileSync(fname, 'MyFileData for ' + process.platform)
        return fname
    }
}