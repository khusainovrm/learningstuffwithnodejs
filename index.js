const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const {join} = require('path')
const process = require('process')
require('dotenv').config()


const fileHome = path.resolve(__dirname, './public/home.html')
const fileAbout = path.resolve(__dirname, './public/about.html')

let writableStream = fs.createWriteStream('hello.txt')
writableStream.write(`Hello from NodeJS at ${new Date().toLocaleString()}`)

let newWritableStream = fs.createWriteStream('some.txt')
let newWritableStreamUsingPipe = fs.createWriteStream('someForPipe.txt')

let readableStream = fs.createReadStream('hello.txt', 'utf8')
readableStream.on('data', chunk => newWritableStream.write(chunk));
readableStream.pipe(newWritableStreamUsingPipe)

// static files, using middleware
app.use(express.static(join(__dirname, 'public')))
app.use('/about',(req,res,next) => {
  console.log('It was a middleware', new Date().toLocaleString())
  console.log('Selected page is ABOUT');
  next()
  }
)

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

app.get('/stuff', (req, res) => {
  fs.readFile(path.resolve(__dirname, 'hello.txt'), (err, data) => {
    if (err) throw err
    // res.sendFile(path.resolve(__dirname, 'hello.txt'))
    res.send('<h1>Something new</h1>')

  })
})

process.env.foo = 'bar'
console.log('Using script with cross-env: ', process.env.NODE_ENV);
console.log('Using dotenv: ', process.env.myKey);



app.listen(3000, () => console.log('Server has been started at', new Date().toLocaleTimeString()));
