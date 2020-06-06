const fs = require('fs')
const path = require('path')

const way = path.resolve('./text.txt')
fs.watchFile(way, (file) => {
    fs.readFile(way, 'utf8', (err, data)=> {
        if (err) {
            throw err
        }
        console.log(file.size, data)
    })
})