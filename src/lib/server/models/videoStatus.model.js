import mongoose from 'mongoose';
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

export const Status = mongoose.model('Status', StatusSchema, 'video_status');
