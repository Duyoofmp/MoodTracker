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
		entries: {
			feedback: {
				type: String,
				required: true,
			},
			emotions: {
				anger: {
					type: Number,
					required: true,
				},
				happiness: {
					type: Number,
					required: true,
				},
				love: {
					type: Number,
					required: true,
				},
				neutral: {
					type: Number,
					required: true,
				},
				saddness: {
					type: Number,
					required: true,
				},
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);
