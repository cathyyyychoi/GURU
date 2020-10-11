var http = require('http');
var fs = require('fs'); // 파일 읽기, 쓰기 등 을 할 수 있는 모듈
var ejs = require('ejs');
var url = require('url');
var express = require('express');
var app = express();

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);
// 404 error message : 페이지 오류가 발생했을때,
function send404Message(response){
  response.writeHead(404,{"Content-Type":"text/plain"}); // 단순한 글자 출력
  response.write("404 ERROR... "); response.end();
} // 200 Okay : 정상적인 요청


function doRequest(request, response){
  if(request.method == 'GET' && request.url == '/'){
    response.writeHead(200,{"Content-Type":"text/html"}); // 웹페이지 출력
    fs.readFile('public/index.html', 'UTF-8',
      function(err, data){
        response.write(data);
        response.end();
      });// 같은 디렉토리에 있는 index.html를 response 함
  } else if (request.url =='/khuthon'){
    response.writeHead(200, {'Content-Type':"text/html"});
    fs.readFile('public/khuthon.html', 'UTF-8',
      function(err, data){
        response.write(data);
        response.end();
      });
    }
    else {
    // file이 존재 하지않을때,
    send404Message(response);
  }
}


http.createServer(doRequest).listen(3000);
console.log("Server Started...");
