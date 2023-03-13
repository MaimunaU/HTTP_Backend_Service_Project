//Maimuna Ullah, Web Development, Pd.7/8(Odd), 3/12/23
//Install express: npm install express

const express = require('express');
const app = express();
app.use(express.json());

//GET Request for home route
app.get('/', (req, res) => {
    res.send('This is a music app HTTP backend project by Maimuna Ullah.');
});

music = [
    {id: 1, genre: 'Pop', name: 'pop1', month: 2, year: 2000},
    {id: 2, genre: 'Hip Hop', name: 'hiphop1', month: 3, year: 2001},
    {id: 3, genre: 'Rap', name: 'rap1', month: 4, year: 2002},
    {id: 4, genre: 'Classical', name: 'classical1', month: 5, year: 2003},
    {id: 5, genre: 'Rock', name: 'rock1', month: 6, year: 2004},
    {id: 6, genre: 'Jazz', name: 'jazz1', month: 7, year: 2005},
    {id: 7, genre: 'Blues', name: 'blues1', month: 8, year: 2006},
    {id: 8, genre: 'Electronic', name: 'electronic1', month: 9, year: 2007},
];

//HTTP GET REQUESTS
  // 1. Displays all the music with all information 
app.get('/music', (req, res) => {
    res.send(music);
})
  // 2. Displays song by id
app.get('/music/:id', (req, res) => {
    song = music.find(c => c.id === parseInt(req.params.id));
    if(!song) {
        res.status(404).send('The song with the given ID does not exist.');
        return
    }
    res.send(song);
})
  // 3. Displays song by month (num 1-12)
app.get('/music/month/:month', (req, res) => {
    song = music.find(c => c.month === parseInt(req.params.month));
    if(!song) {
        res.status(404).send('The song(s) with the given month does not exist.');
        return
    }
    res.send(song);
})
  // 4. Displays song by year (num XXXX)
app.get('/music/year/:year', (req, res) => {
    song = music.find(c => c.year === parseInt(req.params.year));
    if(!song) {
        res.status(404).send('The song(s) with the given year does not exist.');
        return
    }
    res.send(song);
})
  // 5. Displays song by date (year/month)
app.get('/music/date/:month/:year', (req, res) => {
    song = music.find(c => (c.month === parseInt(req.params.month) && c.year === parseInt(req.params.year)));
    if(!song) {
        res.status(404).send('The song(s) with the given date (month/year) does not exist.');
        return
    }
    res.send(song);
})

//HTTP POST REQUESTS
app.post('/music', (req, res) => {
    if (req.body.genre.length < 3 || req.body.genre.length > 30) {
        res.status(404).send('Genre must be 3 to 30 characters long.');
        return 
    } 
    song = {
        id: music.length + 1,
        genre: req.body.genre,
        name: req.body.name,
        month: req.body.month,
        year: req.body.year
    }
    music.push(song);
    res.send(music);
});

//HTTP PUT REQUESTS
app.put('/music/:id', (req, res) => {
    song = music.find(c => c.id === parseInt(req.params.id));
    if (req.body.genre.length < 3 || req.body.genre.length > 30) {
        res.status(400).send('Genre must to be 3 to 30 characters long.');
        return
    }
    update = {
        id: song.id,
        genre: req.body.genre,
        name: req.body.name,
        month: req.body.month,
        year: req.body.year
    }
    music[song.id - 1] = update;
    res.status(200).send(update);
});

//HTTP DELETE REQUESTS 
app.delete('/music/:id', (req, res) => {
    song = music.find(c => c.id === parseInt(req.params.id));
    if(!song) {
        res.status(400).send('The song with the given ID does not exist.');
        return
    }
    idx = music.indexOf(song);
    res.status(200).send(music.splice(idx, 1));
})

//Listener
app.listen(3300, () => {
    console.log('Listening on port 3300 ...');
})

/* 
Reflection
1. Programs communicate with each other through requests. When a request is sent, 
the server looks through the parameters and decides what to send back.

2. I learned how to send GET, POST, PUT, and DELETE requests, as well as how to send 
specific status messages (aside from the default 200 OK status message, ex: 404 and 400).

3. This project cab be further extended by having more routes and filters, as well as 
more data (more genres, songs, songs per genre, etc). 
*/
