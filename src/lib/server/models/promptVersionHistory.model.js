import mongoose from 'mongoose';

const PromptVersionHistorySchema = new mongoose.Schema(
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

export const PromptVersionHistory = mongoose.model(
	'PromptVersionHistory',
	PromptVersionHistorySchema,
	'prompt_version_history'
);