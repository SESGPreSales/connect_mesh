"use strict";
require("dotenv").config();
const { log } = require("console");
const axios = require("axios");

// const ngrok = require("@ngrok/ngrok");

// const createError = require("http-errors");
const express = require("express");
// const session = require("express-session");
// const DynamoDBStore = require("dynamodb-store");
const path = require("path");
// const morgan = require("morgan");

// const indexRouter = require("./routes/index");
// const devicesRouter = require("./routes/devices");
// const oauthRouter = require("./routes/oauth");
// const schemaRouter = require("./routes/schema");

const port = process.env.PORT || 3000;

const app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// app.use(morgan("HTTP :method :url :res[location] :status :response-time ms"));

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/schema", schemaRouter);

// app.use("/", indexRouter);
// app.use("/devices", devicesRouter);
// app.use("/oauth", oauthRouter);
// app.use("/schema", schemaRouter);

app.get("/devices", async function (req, res) {
	getDevices();
	res.send("done");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

app.listen(port, () => {
	console.log("server runnning on port ", port);
});
// Get your endpoint online using ngrok
// ngrok
//     .connect({
//         addr: port,
//         authtoken_from_env: true,
//         domain: process.env.NGROK_URL,
//     })
//     .then(listener => console.log(`Ingress established at: ${listener.url()}`));

const getDevices = function () {
	console.log("devices called ...");
};
