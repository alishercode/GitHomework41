const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

// Foydalanuvchilar API
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Blog API
const blogsRouter = require('./routes/blogs');
app.use('/blogs', blogsRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
