express = require('express');
app = express();
http=require('http');
fs=require('fs');

//mongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("mongo db connection OK.");
});

session=require('express-session');
FileStore=require('session-file-store')(session);
bodyParser=require('body-parser');

app.set('view engine','ejs');
app.set('views','public/js/views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

let user={
  user_id: "admin",
  user_pwd: 'admin_1234'
};

/*
app.get('/login',function(request, response){
  fs.readFile('public/login.html',function(error, data){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end(data);
  });
});
*/
app.get('/login', (request, response) => {
  if (request.session.logined){
    response.render('logout', {id: request.session.user_id});
  }else{
    response.render('login');
  }
});

app.post('/login',(request, response) => {
  if (request.body.id==user.user_id && request.body.pwd==user.user_pwd){
    request.session.logined=true;
    request.session.user_id=request.body.id;
    response.render('logout', {id: request.session.user_id});
  }else {
    response.render('fail');
  }
});

app.post('/logout',(request, response) => {
  request.session.destroy();
  response.redirect('/login');
});


var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);

app.get('/',function(request, response){
  fs.readFile('public/index.html',function(error, data){
    if(error){
      console.log(error);
    }
    else{

      response.writeHead(200, {'Content-Type':'text/html'});
      response.end(data);
    }
  });
});

app.get('/khuthon',function(request, response){
  fs.readFile('public/khuthon.html',function(error, data){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end(data);
  });
});

app.get('/ACM_ICPC',function(request, response){
  fs.readFile('public/ACM_ICPC.html',function(error, data){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end(data);
  });
});

app.get('/SW_Festival',function(request, response){
  fs.readFile('public/SW_Festival.html',function(error, data){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end(data);
  });
});

app.get('/Academic_Program',function(request, response){
  fs.readFile('public/Academic_Program.html',function(error, data){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end(data);
  });
});

app.get('/R&D',function(request, response){
  fs.readFile('public/R&D.html',function(error, data){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end(data);
  });
});

app.get('/notice',function(request, response){
  fs.readFile('public/notice.html',function(error, data){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end(data);
  });
});




app.listen(8000, function(){
  console.log('Start...');
});
