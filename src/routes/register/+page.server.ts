import { fail, redirect } from '@sveltejs/kit';
import * as userApi from '../../stores/userStore'

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, parent }) {
	await parent();
	cookies.set('jwt', '', { path: '/' });
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const user = {
			username: data.get('username'),
			email: data.get('email'),
			password: data.get('password')
		};

        const body = await userApi.register(user);

		if (body === undefined) {
			return fail(401);
		}

		throw redirect(307, '/login');
	}
};
