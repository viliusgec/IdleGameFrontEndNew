import { redirect } from "@sveltejs/kit";

export const load = (({ cookies }) => {
	const jwt = cookies.get('jwt');
	if (cookies.get('jwt')) {
		throw redirect(307, `/profile`);
	}
	throw redirect(307, `/login`);
}) 
