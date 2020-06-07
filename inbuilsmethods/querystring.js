const querysrting = require('querystring')

const q = querysrting.parse('message=Rinat&&birthday=1987')
console.log(JSON.stringify(q))