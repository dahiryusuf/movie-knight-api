const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db)
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const watchPartiesRouter = require('./routes/watchParties');



const app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api',watchPartiesRouter(dbHelpers));


app.get("/api/candidates", (req,res) => {
  const candidates = [{name: "Martin"}, {name: "Carl"}];

  res.json(candidates);
})

module.exports = app;
