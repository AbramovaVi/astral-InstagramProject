const { join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');

let { posts, users } = require('./post');

const app = express();

app.use(bodyParser());
app.use(express.static(join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.get('/data', (req, res) => {
    res.send({posts,users});
});

app.post('/like', (req, res) => {
   const { id, user } = req.body.params;

   const likes = posts.map( item  => {
       if (item.id === id) {
               if (!item.likedUsers.includes(user)) {
               item.likedUsers.push(user);
           } else { item.likedUsers.splice(item.likedUsers.indexOf(user), 1)}
       }
       return item;
   });

    res.send(likes);
});

app.post('/signup', (req, res) => {
    users.push(req.body.param);
    res.sendStatus(200);
});

app.post('/comment', (req, res) => {
   posts = req.body;
   res.send(posts);
});

app.post('/delete', (req, res) => {
    posts = req.body;
    res.send(posts);
});


app.listen(4000, () => console.log('port 4000'));
