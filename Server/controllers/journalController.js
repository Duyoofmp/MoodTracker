const Journal = require("../models/journal");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../errors/customError");
const mongoose = require("mongoose");
const moment = require("moment");

exports.addJournal = BigPromise(async (req, res, next) => {
	const { feedback, userId } = req.body;
	const currentDate = moment().format("DD/MM/YYYY");

	if (!feedback || !userId) {
		return next(new CustomError("Please provide feedback and emotion", 401));
	}

	var formdata = new FormData();
	formdata.append("input", feedback);

	var requestOptions = {
		method: "POST",
		body: formdata,
		redirect: "follow",
	};

	fetch("http://haleel.pythonanywhere.com/test", requestOptions)
		.then((response) => response.json())
		.then(async (emotionsData) => {

			const emotions = {
				Sad: emotionsData.negative,
				Neutral: emotionsData.neutral,
				Happy: emotionsData.positive,
			};
			const trimmedUserId = userId.slice(1, -1);
			

			const journalEntry = await Journal.create({
				date: currentDate,
				user: trimmedUserId,
				entries: {
					feedback,
					emotions,
				},
			});
			

			res.status(201).json({
				success: true,
				journalEntry,
			});
		})
		.catch((error) => {
			console.log("Error:", error);
			return next(new CustomError("Failed to fetch external data", 500));
		});
});

exports.getSumOfEmotionsForDay = async (req, res, next) => {
	const userId = req.query.userId;

	try {
		const currentDate = moment().format("DD/MM/YYYY");

		if (!userId) {
			return next(new CustomError("Please provide a valid user ID", 400));
		}

		const dataArray = [];

		
			const trimmedUserId = userId.slice(1, -1);
			const documents = await Journal.find({
				date: currentDate,
				user: trimmedUserId,
			});

			documents.forEach((docs) => {
				dataArray.push(docs.entries.emotions);
			});

		res.status(200).json({
			DataArray: dataArray,
		});
	} catch (error) {
		console.error("Error:", error);
		return next(new CustomError("Failed to calculate emotion sums for the specified date and user", 500));
	}
};


exports.getSumOfEmotionsForWeek = async (req, res, next) => { 
	const userId = req.query.userId;

	try {
		const currentDate = moment().format("DD/MM/YYYY");

		if (!userId) {
			return next(new CustomError("Please provide a valid user ID", 400));
		}

		const dataArray = [];

		
			const trimmedUserId = userId.slice(1, -1);
			const sevenDaysAgo = moment().subtract(7, "days").format("DD/MM/YYYY");

			const documents = await Journal.find({
				date: {
					$gte: sevenDaysAgo,
					$lte: currentDate,
				},
				user: trimmedUserId,
			});

			documents.forEach((docs) => {
				dataArray.push(docs.entries.emotions);
			});

		res.status(200).json({
			DataArray: dataArray,
		});
	} catch (error) {
		console.error("Error:", error);
		return next(
			new CustomError(
				"Failed to calculate emotion sums for the specified date and user",
				500
			)
		);
	}

}