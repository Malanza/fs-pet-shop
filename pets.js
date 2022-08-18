#!/usr/bin/env node
const subCommand = process.argv[2];
const fs = require('fs');


if (!subCommand) {
  console.log("Usage: node pets.js [read | create | update | destroy]")
  process.exit(8)
};


if (subCommand === 'read') {
  fs.readFile('./pets.json', 'utf-8', function (err, data) {
    const index = process.argv[3]
    const parsedData = JSON.parse(data)
    if (index >= parsedData.length) {
      console.error("Index out of range")
      return;
    } else if (index !== undefined && index <= parsedData.length) {
      console.log(parsedData[index])
      return;
    }
    err ? console.error(err) : console.log(JSON.parse(data))
  })
}

if (subCommand === 'create') {
  fs.readFile('./pets.json', 'utf-8', function (err, data) {
    if (err) return console.error(err)

    const age = parseInt(process.argv[3]) // 13
    const kind = process.argv[4]; // dog
    const name = process.argv[5]; // spot


    const pet = { age, kind, name }

    const parsedData = JSON.parse(data)
    console.log(parsedData)
    parsedData.push(pet)

    const JSONpets = JSON.stringify(parsedData)

    if (!age || !kind || !name) {
      console.log("Need all parameters for pet")
    } else {
      fs.writeFile('./pets.json', JSONpets, function (err) {
        if (err) return err
      })
    }

  })
  console.log("Usage: node pets.js create AGE KIND NAME")
}




// console.log("Usage:[read | create | update | destroy]");
//console.log(process.argv);

// fs.readFile('pets.json', 'utf8', function(error, usage){
//     if (error) {
//         console.log('error');
//     } else {
//         console.log(usage);
//     }
// })

// const usage = [read | create| update | destroy]
// console.log(usage);
// process.exit(1)