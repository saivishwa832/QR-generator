const express = require("express"); //express 
const app = express();
const port = 3000;
const bodyParser = require("body-parser") // bodyparser package 
const qr = require("qrcode"); //qr code package 

app.set("view engine", "ejs"); // linking the ejs
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json())

app.get("/", function(req,res){
    res.render("index.ejs");
})

app.post("/", function (req, res){
    const url = req.body.url
    if(url.length === 0){
        res.send("the url is invalid");
    }
        qr.toDataURL(url, function(err,src){
            if(err){
                res.send("error occured")
            }
            else {
                res.render("scan", {src})
            }
        })
})

app.listen(3000, function(req,res){
    console.log("server is started and running at port 3000")
})