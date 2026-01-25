const mongoose = require("mongoose");
const { CommonSchema } = require("./common.model");

const StatusSchema = new mongoose.Schema(
	{
		status: [
			{
				type: String
			}
		]
	},
	{
		timestamps: true
	}
);

const Status = mongoose.model("Status", StatusSchema, "video_status");

module.exports = Status;
