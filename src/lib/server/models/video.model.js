import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
	{
		// child: {
		//   type: mongoose.ObjectId,
		//   ref: "CommonSchema",
		// },
		backgroundVisualsPrompt: {
			type: String,
			default: ''
		},
		backgroundVisuals: {
			type: String,
			default: ''
		},
		videoPrompt: {
			type: String,
			default: ''
		},
		videoText: {
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
			type: String,
			default: ''
		},
		title: { type: String, default: '', unique: true, required: true },
		description: { type: String, default: '' },
		userCreatedBy: { type: String, default: '', required: true },
		userUpdatedBy: { type: String, default: '', required: true },
		backgroundMusicPrompt: { type: String, default: '' },
		backgroundMusic: { type: String, default: '' },
		thumbnailPrompt: { type: String, default: '' },
		channelId: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

export const Video = mongoose.model('Video', VideoSchema, 'video');
