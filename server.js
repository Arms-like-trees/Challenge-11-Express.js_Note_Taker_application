const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes')
const PORT = process.env.PORT || 3001;
const api = require ('./routes/index')

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//for the static page
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);


app.use('/api', api);
   

//GET route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

//  GET route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
