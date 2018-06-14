var express = require("express"),
    bodyParser = require("body-parser"),
    routes = require("./routes/routes"),
    mongoose = require("mongoose"),
    income = require("./model/income"),
    expense = require("./model/expense"),
    user = require("./model/user"),
    app = express();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/jpro');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Allow cross origin access control to all clients. neede for restful apis
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

routes(app);
app.use((req, res) => {
    res.status(404).send({
        url: req.originalUrl + ' not found!  Zereshk!!!'
    })
});

var server = app.listen(3000, () => {
    console.log("app running on port.", server.address().port);
});
// important for security reasons
app.disable('x-powered-by');