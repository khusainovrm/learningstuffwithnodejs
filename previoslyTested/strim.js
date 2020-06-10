const fs = require('fs')

const server = require('http').createServer((req,res) => res.end('From file'))

server.on('emitedEvent', (req, res) => {
  fs.readFile('./key.txt', (err, data) => {
    console.log('Data is: ' + data);
    if (err) throw err
    res.end(data)
    })
})

server.emit('emitedEvent', {a:'b'})
server.listen(8000, () => console.log("Server on port 8000 has been started..."))