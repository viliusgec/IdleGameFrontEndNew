import { redirect } from '@sveltejs/kit';
import { loadPlayerData } from '../../stores/playerStore';
import { loadPlayerSkillData } from '../../stores/skillStore';

export async function load({ cookies, url }) {

	let jwt = cookies.get('jwt') as string

	if (jwt === undefined) {
		throw redirect(307, `/register`);
	}

	let data = await loadPlayerData(jwt)
	let playerSkill = await loadPlayerSkillData(jwt)
	return { 
		player: data, 
		playSkils: playerSkill,
		token: jwt
	}
}
