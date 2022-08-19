'use strict';
var http = require('http');
var port = process.env.PORT || 8000;
const fs = require('fs');

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/pets') {
    res.setHeader('Content-Type', 'application/json');
    
    fs.readFile('./pets.json', 'utf-8', function (err, data){ 
        //var petsJSON = JSON.stringify(guests);
        //const parsedData = JSON.parse(data)
        res.statusCode = 200;
        res.end(data)
       
        if (err) {
            console.log('error')
        }
    })
    
  }
  const items = req.url.split('/')
  const index = items[items.length - 1]
  if (items.length > 2 && req.url === `/pets/${index}`) {
      console.log(index)
      fs.readFile('./pets.json', 'utf-8', (err, data) => {
          const petsData = data;
          console.log(items)
          if (err) {
              console.log('error')
          
          } else if (index < 0) {
            
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain')
            res.end('not found')
        
        } else if (index > 1) {
            
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain')
            res.end('not found')
        
        }
        else {
              const obj = JSON.parse(petsData)
              const returnPet = obj[index]
              const returnJson = JSON.stringify(returnPet)
              res.end(returnJson)
          }
      })
  }
  
})



 server.listen(port, function() {
  console.log('Listening on port', port);
});