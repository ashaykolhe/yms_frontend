import mongoose from 'mongoose';
const IdeaSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		idea: { type: String, required: true },
		archived: { type: Boolean, default: false },
		softDelete: { type: Boolean, default: false },
		userCreatedBy: { type: String, required: true },
		userUpdatedBy: { type: String, required: true },
		channelId: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

export const Idea = mongoose.model('Idea', IdeaSchema, 'idea');