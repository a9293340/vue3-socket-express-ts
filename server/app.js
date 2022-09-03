const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//DB
const dbConnect = require('./db/mysql')
const mongoClient = require('mongodb').MongoClient;

const indexRouter = require('./routes/index');
const studentsRouter = require('./routes/students');
const stdRouter = require('./routes/stu')
const http = require('http')
const app = express();

// Make DB
//MySQL
app.dbConnect = dbConnect;
//MongoDB
mongoClient.connect('mongodb://localhost:27017/students').then((client) => {
    console.log('MongoDb Connect successfully!');
    const db = client.db('students');
    const studentsCollection = db.collection('students');
    app.studentsCollection = studentsCollection;
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//TODO : START 測試開啟
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/stu',stdRouter)



// 解決跨域問題
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST','PATCH','DELETE'],
}));
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//TODO : END 測試開啟

//TODO : START build開啟

// app.use('/api', indexRouter);
// app.use('/api/users', usersRouter);
// var history = require('connect-history-api-fallback');
// app.use(express.static(path.join(__dirname, '../dist')));
// app.use(history());

//TODO : END build開啟

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



const debug = require('debug')('my-application');
app.set('port', process.env.PORT || 3000);

// 啟動監聽
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server, {cors: true});

app.io = io;

io.on('connection', (socket) => {
    socket.emit('connection', 'Socket Connected!')

    socket.on('message', (text) => {
        console.log(text)
        socket.emit('message', {'text': '收到惹'})
    })
    setInterval(() => {
        socket.emit('connected', {'data': Math.random()})
    }, 1000)
})


server.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

