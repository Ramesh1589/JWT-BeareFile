var express = require('express');
var jwt = require('jsonwebtoken');

var app = express();

app.post('/api/login', function(req, res){
  const user ={ id: 3};
  const token = jwt.sign({ user}, 'my_secret_key');
  res.json({
      token: token
  });
});

app.get('/api/protected', ensureToken , function(req, res){

    jwt.verify(req.token,'my_secret_key', function(err, data){
        if(err){
            res.sendStatus(403);
        } else {
        res.json({text: 'This is protected route',
        data: data
        });
    
        }
    });
});


function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        req.sendStatus(403);
    }
}
app.listen(8880, function(req, res){
    console.log("App s listening on port no 8880   ");
});