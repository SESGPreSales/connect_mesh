"use strict";
require("dotenv").config();
const { log } = require("console");
const axios = require("axios");
const express = require("express");

const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL;
const auth = process.env.AUTH;

const app = express();

app.use(express.json());

app.get("/devices/:id/status", async function (req, res) {
	console.log("** Debugging ...");

	console.log(`-- Base url set for fetch is : ${baseUrl}`);
	console.log(`going to fetch for devices using Authorization: ${auth} ...`);
	const response = await getDevices();

	console.log("-- response (only index = 0 ): ", response[0]);
	console.log(
		`-- going to fetch for status of uniqueId=${response[0].id} with Authorization: ${auth}`
	);
	// console.log(`Url for Status fetch: ${baseUrl}/${response[0].id}/status`);

	const stato = await getDeviceStatus(response[0]); //just check the only device for now... must be changed to for each later

	res.send(stato);
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
	res.status(err.status || 500).json({ error: err.message });
});

app.listen(port, () => {
	console.log("server runnning on port ", port);
});

const deviceMap = new Map();

async function getDevices() {
	try {
		const response = await axios.get(baseUrl, {
			headers: {
				Accept: "application/json",
				Authorization: auth,
			},
		});
		// console.log(response);
		if (response.status != 200)
			throw new Error(`Device fetch failed : ${response.status}`);

		return response.data.map(device => ({
			name: device.name,
			id: device.uniqueId,
		}));
	} catch (error) {
		console.error(error);
	}
}

async function getDeviceStatus(device) {
	try {
		console.log(
			`--getDeviceStatus-- received params: ${JSON.stringify(device)}...`
		);
		console.log(
			`--getDeviceStatus-- going to fetch device Status at: ${baseUrl}/${device.id}/status now ...`
		);

		const response = await axios.get(`${baseUrl}/${device.id}/status`, {
			headers: {
				Accept: "*/*",
				Authorization: auth,
			},
		});
		// console.log(response);
		if (response.status !== 200)
			throw new Error(`Status fetch failed : ${response.status}`);

		console.log(`returned response= ${JSON.stringify(response.data)}`);
		return response.data;
	} catch (error) {
		console.error(error.message);
	}
}

// getDevices("ef58a258-d8cc-46a6-bb5a-bdccc1ed9ac8");
