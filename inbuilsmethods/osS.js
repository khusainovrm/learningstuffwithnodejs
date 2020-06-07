const os = require('os')

//console.log(Object.keys(os))
// for (let k of Object.keys(os)){
//     console.log(`Ключ ${k}, результат: `, os[k]())
// }

// console.log(os.type(), os.hostname(), os.cpus());
console.log(`Привет, ${os.userInfo().username.toUpperCase()}`);



