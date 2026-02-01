import mongoose from 'mongoose';
const VideoVersionHistorySchema = new mongoose.Schema(
	{
		parentVideoId: {
			type: String
		},
		// child: {
		//   type: mongoose.ObjectId,
		//   ref: "CommonSchema",
		// },
		backgroundVisualsPrompt: {
			type: String,
			default: ''
		},
		backgroundVisualsVisuals: {
			type: String,
			default: ''
		},
		themePrompt: {
			type: String,
			default: ''
		},
		speechToTextOutput: {
			type: String,
			default: ''
		},
		srt: {
			type: String,
			default: ''
		},
		keywords: {
			type: String,
			default: ''
		},
		metadata: {
			type: String,
			default: ''
		},
		archived: { type: Boolean, default: false },
		softDelete: { type: Boolean, default: false },
		status: {
			type: String,
			default: 'NEXT'
		},
		type: { type: String, default: 'long' },
		domain: {
			type: String
		},
		title: { type: String, default: '' },
		description: { type: String, default: '' },
		userCreatedBy: { type: String, default: '' },
		userUpdatedBy: { type: String, default: '' },
		backgroundMusic: { type: String, default: '' },
		channelId: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

export const VideoVersionHistory = mongoose.model(
	'VideoVersionHistorySchema',
	VideoVersionHistorySchema,
	'video_version_history'
);
