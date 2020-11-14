const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const {MONGODB_URI} = require('../config')
const url = MONGODB_URI;

app.get('/posts', (req,res)=>{
    MongoClient.connect(url, (err, db)=>{
        if (err) throw err;
        let dbo = db.db('flashcard');
        let query = {};
  dbo.collection("cards").find(query).toArray(function(err, result) {
            if (err)throw err;
            res.send(result);
            db.close();
        })
    });
})

app.get('/add/:id', (req,res)=>{
    var i = req.params.id; 
    MongoClient.connect(url, (err, db)=>{
        if (err) throw err;
        let dbo = db.db('flashcard');
        let obj = {term:'trm', definition:'def', id: i}
        dbo.collection('cards').insertOne(obj, (err, result)=>{
            if (err)throw err;
            res.send(result.ops[0]._id)
            db.close();
        })
    });
})

app.get('/delete/:id',(req,res)=>{
    let i = req.params.id;
    MongoClient.connect(url, (err,db)=>{
        if (err) throw err;
        let dbo = db.db("flashcard");
        let query = { id: i };
        dbo.collection("cards").deleteOne(query, function(err, obj) {
            if (err) throw err;
            res.send(`deleted at ${i}`)
            db.close();
        });
    })
})

app.get('/update', (req,result)=>{
    let i = req.query.id;
    let term = req.query.term;
    let def = req.query.def;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("flashcard");
        let query = { id: i };
        let newvalues = { $set: {term: term, definition: def, id: i } };
        dbo.collection("cards").updateOne(query, newvalues, function(err, res) {
          if (err) throw err;
          result.send(`updated at ${i},${term},${def}`);
          db.close();
        });
      });    
})


app.listen(5000, ()=>{
    console.log('db running')
})
