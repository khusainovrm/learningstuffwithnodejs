const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const {join} = require('path')


const fileHome = path.resolve(__dirname, './public/home.html')
const fileAbout = path.resolve(__dirname, './public/about.html')

let writableStream = fs.createWriteStream('hello.txt')
writableStream.write('\nHello from NodeJS')
writableStream.write("That's it!")
writableStream.end('End of the note')
let readableStream = fs.createReadStream('hello.txt', 'utf8')

readableStream.on('data', chunk => console.log(chunk));


app.use(express.static(join(__dirname, 'public')))

app.get('/home', (req, res) => {
  fs.readFile(fileHome, (err, data) => {
    if (err) throw err
    res.sendFile(fileHome)
  })
})

app.get('/about', (req, res) => {
  fs.readFile(fileAbout, (err, data) => {
    if (err) throw err
    res.sendFile(fileAbout)
  })
})



app.listen(3000, () => console.log('Server has been started at', new Date().toLocaleTimeString()));
