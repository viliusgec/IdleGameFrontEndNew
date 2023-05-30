export const load = (({ cookies }) => {
	const jwt = cookies.get('jwt');
    cookies.set('sverdle', "viskas yra shit");
    const random = cookies.get('sverdle')
	return {
        jwt: jwt,
        rtext: random
	};
}) 
