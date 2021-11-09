const http = require("http");
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';

const port = 3000;

const server = http.createServer((req,res) => {
    console.log("Request for "+ req.url + " by method " + req.method);

    if(req.method == 'GET'){
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);  // yahan public mention kiya h issiliye public folder ke andar daalna h 
        const fileExt = path.extname(filePath);

        if(fileExt == '.html'){
            fs.exists(filePath , (exists) => {
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader('Content-Type' , 'text/html');
                    res.end("<html><body><h1>Error 404 : " + fileUrl + " Not Found </h1></body></html>");
                    return ;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type' , 'text/html');
                fs.createReadStream(filePath).pipe(res);   //read the file and put that in the response pipe
            });
        }else{
            res.statusCode = 404;
            res.setHeader('Content-Type' , 'text/html');
            res.end("<html><body><h1> Error 404 : " + fileUrl + " is not an HTML file. </h1></body></html>");
        }
    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type' , 'text/html');
        res.end("<html><body><h1> Error 404 : " + req.method + " is not supported </h1></body></html>");
    }
});


server.listen(port , 'localhost' , () => {
    console.log(`Server running at http://${hostname}:${port}`)
})