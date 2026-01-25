const mongoose = require("mongoose");
const { CommonSchema } = require("./common.model");

const IdeaVersionHistorySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		idea: { type: String, required: true },
		archived: { type: Boolean, default: false },
		softDelete: { type: Boolean, default: false },
		userCreatedBy: { type: String, required: true },
		userUpdatedBy: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

const IdeaVersionHistory = mongoose.model(
  "IdeaVersionHistory",
  IdeaVersionHistorySchema,
  "idea_version_history",
);

module.exports = IdeaVersionHistory;
