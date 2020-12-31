const express = require('express');
const path = require('path');
const app = express();

app.use(express.static( '/dist/project'));

app.get('/*', function(req,res){
    res.sendFile(path.join('/dist/project/index.html'));});



app.listen(process.env.PORT || 8080);