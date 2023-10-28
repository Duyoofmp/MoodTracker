const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
	{
		date: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		entries:
			{
				feedback: {
					type: String,
					required: true,
				},
				emotions: {
					Sad: {
						type: Number,
						required: true,
					},
					Neutral: {
						type: Number,
						required: true,
					},
					Happy: {
						type: Number,
						required: true,
					},
				},
			},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);
