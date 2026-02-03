import { error, fail, json, redirect } from '@sveltejs/kit';
import { cookie_options, formBody } from '../../lib/server/utils.js';
import { User } from '$lib/server/models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '$env/static/private';

// export const load = async ({ cookies }) => {
// 	return { user: 'ashay' };
// };

export const actions = {
	login: async ({ request, cookies }) => {
		const formdata = await request.formData();
		const data = formBody(formdata);
		// console.table([...data.entries()]);
		// console.log([...data.entries()]);
		console.log('formbody');
		console.log(data);
		// const email = data.get('email');
		// const password = data.get('password');
		const email = data.email;
		const password = data.password;
		console.log('email ' + email + ' password ' + password);
		const hashedPassword = await bcrypt.hash(password, 10);
		console.log(hashedPassword);
		const user = await User.findOne({
			email: email
		}).exec();

		if (user) {
			console.log('user ' + user);
			const match = await bcrypt.compare(password, user.password);
			if (match) {
				try {
					let token = jwt.sign(
						{
							userId: user._id,
							isAdmin: user.isAdmin,
							email: user.email,
							name: user.name
						},
						SECRET_JWT_KEY,
						{ expiresIn: '12h' }
					);
					cookies.set('auth-token', token, cookie_options);
				} catch (err) {
					return error(500, { message: err.message });
				}
				throw redirect(301, '/long');
			}
		}
		return fail(400, { email, message: 'Invalid username/email or password' });
	}
};
