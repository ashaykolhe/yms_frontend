const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: { type: String, required: true },
		keywords: { type: String, required: true },
		archived: { type: Boolean, default: false },
		softDelete: { type: Boolean, default: false },
		userCreatedBy: { type: String, required: true },
		userUpdatedBy: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

export const Channel = mongoose.model("Channel", ChannelSchema, "channel");
