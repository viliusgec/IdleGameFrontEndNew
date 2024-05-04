import { fail, redirect } from '@sveltejs/kit';
import * as userApi from '../../stores/userStore'

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, parent }) {
	await parent();
	if (cookies.get('jwt')) {
		throw redirect(307, `/bank`);
	}
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

        const body = await userApi.login(user);

		if (body === undefined) {
			return fail(401);
		}

		cookies.set('jwt', body.token, { path: '/' });
		throw redirect(307, '/bank');
	}
};
