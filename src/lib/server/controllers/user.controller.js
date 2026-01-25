import User from '$lib/server/models/user.model.js';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import { SECRET_JWT_KEY } from '$env/static/private';

const getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createUser = async (req, res) => {
	try {
		// if (req.body.referenceCode === "referencecode") {
		//   //TODO check if loggedin user is admin, only then assign new user admin role
		//   req.body.isAdmin = true;
		// } else {
		//   req.body.isAdmin = false;
		// }
		const existinguser = await User.findOne({
			email: req.body.email
		}).exec();
		if (existinguser) {
			return res.status(200).json({
				success: false,
				message: 'Email already exists. Please choose another email.'
			});
		}
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		req.body.password = hashedPassword;
		req.body.userCreatedBy = req.loggedInUser.email;
		req.body.userUpdatedBy = req.loggedInUser.email;
		const user = await User.create(req.body);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		req.body.userUpdatedBy = req.loggedInUser.email;
		const { id } = req.params;

		let user = await User.findByIdAndUpdate(id, req.body, {
			new: true
		});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.status(200).json({ message: 'User updated successfully', user: user._doc });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteUsers = async (req, res) => {
	try {
		const { ids } = req.params;
		const idsArray = ids.split(',');
		// const user = await User.findByIdAndDelete(id);
		const result = await User.deleteMany({
			_id: { $in: idsArray }
		});

		// if (!user) {
		//   return res.status(404).json({ message: "User not found" });
		// }

		res.status(200).json({ message: result.deletedCount + ' Users deleted permanently' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const softDeleteUsers = async (req, res) => {
	try {
		const { ids } = req.params;
		const idsArray = ids.split(',');
		// const user = await User.findByIdAndUpdate(id, {
		//   $set: { softDelete: true },
		// });

		// if (!user) {
		//   return res.status(404).json({ message: "User not found" });
		// }

		const result = await User.updateMany(
			{
				_id: { $in: idsArray },
				softDelete: false
			},
			{ $set: { softDelete: true } }
		);

		return res.status(200).json({
			message:
				'Matched : ' +
				result.matchedCount +
				' | Modified : ' +
				result.modifiedCount +
				' User deleted successfully'
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	try {
		const email = req.body.email;
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		// console.log(hashedPassword);
		// const password = req.body.password;
		// const user = await User.findOne({
		//   $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
		//   password: password, //TODO encrypt once auth is done
		// }).exec();
		const user = await User.findOne({
			email: email
			// password: hashedPassword, //TODO encrypt once auth is done
		}).exec();

		// console.log(user);

		if (user) {
			const match = await bcrypt.compare(req.body.password, user.password);
			if (match) {
				let token;
				try {
					//Creating jwt token
					token = jwt.sign(
						{
							userId: user._id,
							isAdmin: user.isAdmin,
							email: user.email
						},
						SECRET_JWT_KEY,
						{ expiresIn: '12h' }
					);
				} catch (err) {
					console.log(err);
					return res.status(500).json({ message: err.message });
				}
				return res.status(200).json({ success: true, token: token });
			}
		}
		return res.status(200).json({
			success: false,
			message: 'Invalid username/email or password'
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const checkIfEmailExists = async (req, res) => {
	try {
		const existinguser = await User.findOne({
			email: req.body.email
		}).exec();
		console.log(existinguser);
		if (existinguser) {
			return res.status(200).json({
				success: false,
				message: 'Email already exists. Please choose another email.'
			});
		}
		return res.status(200).json({ success: true });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

// module.exports = {
// 	getUsers,
// 	getUser,
// 	createUser,
// 	updateUser,
// 	deleteUsers,
// 	softDeleteUsers,
// 	login,
// 	checkIfEmailExists
// };
