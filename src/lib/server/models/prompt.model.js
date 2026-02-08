import mongoose from 'mongoose';
const PromptSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		prompt: { type: String, required: true },
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

export const Prompt = mongoose.model('Prompt', PromptSchema, 'prompt');