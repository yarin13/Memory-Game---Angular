//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
//app.use(express.static(__dirname + '/dist/project'));


app.use(express.static('./dist/project'));

// app.get('/*', function(req,res) {
    
// res.sendFile(path.join(__dirname+'/dist/project/index.html'));
// });



app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/project/'}
  );
  });

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);