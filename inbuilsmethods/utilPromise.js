const fs = require('fs')
const util = require('util')

fs.stat('.', (err, stats) => console.log('Stat with call back', stats))
const stat = util.promisify(fs.stat)

stat('.').then(stats => console.log('Stat with promise', stats))