import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		archived: { type: Boolean, default: false },
		softDelete: { type: Boolean, default: false },
		active: { type: Boolean, default: false },
		isAdmin: { type: Boolean, default: false },
		userCreatedBy: { type: String, default: '' },
		userUpdatedBy: { type: String, default: '' }
	},
	{
		timestamps: true
	}
);

export const User = mongoose.model('User', UserSchema, 'user');
