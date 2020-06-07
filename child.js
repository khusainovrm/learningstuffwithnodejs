process.on('message', m => console.log('CHILD got message: ', m))

// Causes the parent to print: PARENT got message: {hello: world}
process.send({foo: 'bar', baz: null})