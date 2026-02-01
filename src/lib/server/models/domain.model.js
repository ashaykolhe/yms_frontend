import mongoose from 'mongoose';

const DomainSchema = new mongoose.Schema(
	{
		channelId: { type: String, required: true },
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

export const Domain = mongoose.model('Domain', DomainSchema, 'domain');
