const express = require('express');
const app = express();
const fs = require('fs');

// GET ALL 
app.get('/pets', function(req, res){
   
    fs.readFile('./pets.json', 'utf-8', function (err, data){ 
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log('error')
        }
        res.send(data)
        res.statusCode = 200;
      
    })
})

app.get('/pets/:id', function(req, res){
   
    fs.readFile('./pets.json', 'utf-8', function (err, data){ 
        res.setHeader('Content-Type', 'text/plain');
        
        const id = req.params.id
        const parseData = JSON.parse(data)
        if (id >= parseData.length || id < 0 ) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.send('Not Found')
           
        } else {
        const jsonData = JSON.stringify(parseData[id])
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(jsonData)
        
        }
    })
})

app.post('/pets', (req, res) => {

    fs.readFile('pets.json', 'utf-8', (err, data) => {
        if (err) {
            console.log("trash")
            process.exit(1)
        }

        const age = req.body.age
        const kind = req.body.kind
        const name = req.body.name

        const pet = { age, kind, name }
        const parsedData = JSON.parse(data)
        parsedData.push(pet)

        const petJSON = JSON.stringify(parsedData)
        res.send(petJSON)
        if (!age || !kind || !age) {
            console.log("need all arguements for creating pet...")
        } else {
            fs.writeFile('pets.json', petJSON, function (error) {
                if (error) {
                    console.log('something went wrong')
                    process.exit(1)
                }
            })
        }
    })
})



app.listen(3000, function(){
    console.log('server is running');
    })
























// GET ONE 
// app.get('/pets/:id', function(req, res){
//     res.send('this is to get one that require an id')
// })

//create a route 
// app.post('/pets', function(req, res){
//     res.send('this is the post / create route for pets')
// })
// edit route: needs id 
// app.put('/pets/:id', function(req, res){
//     res.send('this is the edit route for /pets ... this route requires an id')
// })
//delete one route
// app.delete('/pets/:id', function(req,res){
//     res.send('delete specific one')
// })
