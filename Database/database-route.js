const express = require('express');
const bodyParser = require('body-parser');
const {MYSQL} = require('../config')	

const app = express();



var mysql = require('mysql');

var db = mysql.createConnection({
  host: MYSQL.HOST
  user: MYSQL.USER,
  password: MYSQL.PASSWORD,
  database: MYSQL.DATABASE
});



app.get('/posts', function(req, res){    
    db.query("SELECT * FROM cards", (err,result)=>{
        if(err) throw err;
        res.send(result);
    });
    
    
});

app.get('/update', (req,res)=>{
    let id = req.query.id;
    let term = req.query.term;
    let def = req.query.def;
    
    
    let sql =`UPDATE cards SET term = '${term}', definition= '${def}' WHERE id = '${id}'`;
    db.query(sql, (error)=>{
        if(error)throw error;
    });
    db.query(`select * from cards where id = ${id}`, (error,result)=>{
        if(error)throw error;
        res.send(result);
    });
})

app.get('/delete/:id', (req,res)=>{
    let id = req.params.id;
    db.query(` DELETE FROM cards WHERE id=${id};`, (error)=>{
        if(error)throw error;
        res.send(`deleted at ${id}`);

    })

})

app.get('/add/:id', (req,res)=>{
    let id = req.params.id;
    db.query(`insert into cards (term, definition,id) values(NULL, NULL, ${id})`, (error)=>{
        if(error)throw error;
        res.send(`add at ${id}`)
    })
})

app.listen(5000, ()=>{
    console.log('DB route connected')
});