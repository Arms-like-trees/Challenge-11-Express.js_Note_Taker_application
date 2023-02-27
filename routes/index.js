const express = require('express');
const app = express();
const fs = require('fs')
const uuid = require('../helpers/uuid')

//for reading the notes
app.get('/api/notes', function(req,res){
    const db = JSON.parse(fs.readFileSync('./db/db.json','utf-8',function(err,data){
        if (err) throw err;
        console.log({data})
        return data
    }))
    console.log({db})
    res.json(db)
})


// creating a new note
app.post('/api/notes',function(req,res){
    console.log(JSON.stringify(req.body))
    const { title, text} = req.body;

    const newNote = {
        title,
        text,
        id: uuid(),
    };

    let db =JSON.parse(fs.readFileSync('./db/db.json','utf-8',function(err,data){
        if (err) throw err
        console.log({data})
        return data
    }));
    db.push(newNote);
console.log(JSON.stringify(db));
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.sendStatus(200);

    

})


//deleting
app.delete(`/api/notes/:id`, function(req, res) {
    const noteDelet = req.params.id;

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parseData = JSON.parse(data);
            let select = parseData.find(objID => {
                return objID.id === noteDelet
            })
            const noteIndex = parseData.indexOf(select);
            if (noteIndex > -1) {
                parseData.splice(noteIndex, 1);
            }
            fs.writeFile('./db/db.json', JSON.stringify(parseData), (err) => {
                if (err) {
                    console.error(err)
                }
            })
            res.json(JSON.parse(data))
        }
    })
});

module.exports = app;