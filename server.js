var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');

function normalizeString(str){
  if(!str){
    return;
  }
  str = str.toLowerCase();
  strList = str.split('-');
  var strNormalized=[];
  strList.forEach(function(item){
    strNormalized.push(item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
  });
  return strNormalized.join(' ');
}



function generatePaths(cb){
  var files = [];
  var index = 0;

  fs.readdir(__dirname+'/games',function(err,list){
  list.forEach(function(gameDir){
    var gameName=normalizeString(gameDir);
    files.push({
      id:index,
      gameUrl:gameDir,
      name:gameName,
      image:gameDir+'/icon-256.png'
    });
      index+=1;
    });
  cb(files);
  });
}

app.use(cors());
app.use(express.static('games'));

app.get('/api/games',function(req,res){
  generatePaths(function(files){
    res.send(files);
  });
})

app.listen(8888,function(){
  console.log("Connection established on port 5000");
});


