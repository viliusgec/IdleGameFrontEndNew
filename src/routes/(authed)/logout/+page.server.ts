import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies }) => {
        cookies.delete('jwt')
        throw redirect(307, '/login');
	}
};
