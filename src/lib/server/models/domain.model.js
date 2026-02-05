import mongoose from 'mongoose';

const DomainSchema = new mongoose.Schema(
	{
		channelId: { type: String, required: true },
		title: {
			type: String,
			required: true
		},
		description: { type: String, default: '' },
		archived: { type: Boolean, default: false },
		softDelete: { type: Boolean, default: false },
		userCreatedBy: { type: String, required: true },
		userUpdatedBy: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

export const Domain = mongoose.model('Domain', DomainSchema, 'domain');
