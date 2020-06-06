for (let i =0; i<10; i++){
    const str = new Array(i).fill('cool').join(' ')
    console.log(`Вот этот текст ${str}`)

    if (i===3) process.exit(1)
}

