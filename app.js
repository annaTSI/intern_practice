const http=require("http");

const server = http.createServer((req,res)=>{

    const url=req.url;
    if (url==='/'){
    res.setHeader('Content-type','text/html');
    res.write('<html>')
    res.write('<head><title>Enter the form details</title></head>')
    res.write('<body><form action="/message" method="POST">');
    res.write('<input type="text" name="message">');
    res.write('<input type="submit" value="send">');
    res.write('</form></body>');
    res.write('</html>')
    return res.end();
    }

    if (url=='/message'&& method=='POST'){
        res.setHeader('Location','/')
        res.statuscode =302;
    }

   res.setHeader('Content-type','text/html');
   res.write('<html>')
   res.write('<head><title>JVL Code Tutorial</title></head>')
   res.write('<body><h1>Hello from node.js Server!</h1></body>')
   res.write('</html>')
   res.end();
   });
   server.listen(3001);    