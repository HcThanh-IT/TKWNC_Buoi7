// const express =require('express');
// // const cors = require("cors");
// const app = express();
// // app.use(cors());
// const port = 3000;

// const dssv=require("./DSSV.json")

// app.get("/",(req, res)=>{
//     res.send("Xin chào đến với EXPRESS Backend");
// });

const express = require('express');
const fs = require('fs');
const cors = require("cors");
const app = express();
let corsOptions = {
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
};
app.use(cors(corsOptions));

/////////////
// body-parser
var bodyparser = require('body-parser');
var urlParser = bodyparser.urlencoded({ extended: false });

const port = 3000;

const dssv = require('./DSSV.json');

app.get('/', (req, res) => {
    res.send('Welecome to EXPRESS backend!!');
});

//GET
app.get("/students", (req, res) => {
    res.send(Object.values(dssv));
});
app.get("/students/:MaSV", (req, res) => {
    console.log(req.params.mssv);
    let i = 0;
    for (i; i < dssv.length; i++) {
        if (dssv[i].MaSV == req.params.MaSV) break;
    }
    if (i < dssv.length) res.send(dssv[i]);
    else res.send("Not FOUND !!!");
});

//POST
//POST Thêm mới sv
app.post("/students", urlParser, (req, res) => {
    var sv = req.body;
    var result = dssv.find(item => item.MaSV === sv.MaSV);
    console.log(result);
    if (result != null || result != undefined) {
        var obj = {
            success: false, msg: "Mã SV bị trùng!"
        };
        res.send(obj);
    }
    else {
        // const rawData = fs.readFileSync('DSSV.json', {encoding:'utf-8'});
        dssv.push(sv);
        fs.writeFile('DSSV.json', JSON.stringify(dssv), err => {
           if(err){
            console.log(err);
           }
           else {
            console.log("OK");
           }
        });

        var obj = {
            success: true, msg: "Thêm mới thành công!"
        };
        res.send(obj);
    }

});

app.put("/students", (req, res) => {
    res.send("PUT student!");
});
app.delete("/students", (req, res) => {
    res.send("DELETE student!");
});
app.listen(port, () => console.log(`App is running at port ${port}`));