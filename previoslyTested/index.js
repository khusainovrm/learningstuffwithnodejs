const http = require('http')
const https = require('https')
const path = require('path')
const express = require('express')
const axios = require('axios')


// const app = express()
// app.use(express.static(path.resolve(__dirname)))
// app.get('*', (req,res) => {
//     res.sendFile(path.resolve(__dirname, 'page.html'))
// })
//app.listen(3000, ()=> console.log('Server has been started...'))


// native method without express how to start server

const filePath = path.resolve(__dirname, 'page.html')
http.createServer((req,res) => {
    res.writeHead(200, {
        'Content-Type':'text/html'
    })
    res.end('Endd')
}).listen(3000, ()=> console.log('Server has been started...'))


// function compute() {
//     for (let i = 0; i < 1000; i ++) {
//         console.log(`This is comptued i = ${i}`);
//     }
//     setImmediate(compute)  // - не блокирует сервер
//     // Promise.resolve().then(compute)   // - блокирует сервер, является микротаском, нет хард ограничения в Eventloop
// }

// compute()




// Первый вариант
// https.get('https://jsonplaceholder.typicode.com/todos/1', response => {
//     let todo = ''
//     response.on('data', (chunk) => {
//         todo += chunk
//     })
//     response.on('end', () => {
//         console.log(JSON.parse(todo))
//     })
// }).on('error', (error) => console.log('Error' + error.message))

// Второй вариант с axios
// axios.get('https://jsonplaceholder.typicode.com/todos/1').then(res => console.log(res.data))