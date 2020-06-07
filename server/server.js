const http = require('http')

const hello = require('./hello.json')
const bye = require('./bye.json')

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')

  if (req.url === '/hello'){
    return res.end(JSON.stringify(hello))
  }

  if (req.url === '/bye'){
    return res.end(JSON.stringify(bye))
  }

  res.statusCode = 404
  return res.end(JSON.stringify({error: "Not found"}))
}).listen(3000)