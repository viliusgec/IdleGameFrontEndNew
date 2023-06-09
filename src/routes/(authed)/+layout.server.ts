import { redirect } from '@sveltejs/kit';
import { loadPlayerData } from '../../stores/playerStore';
import { loadPlayerSkillData } from '../../stores/skillStore';

export async function load({ cookies, url }) {

	let jwt = cookies.get('jwt') as string

	if (jwt === undefined) {
		console.log('gejus')
		throw redirect(307, `/register`);
	}

	// let jwt = cookies.get('jwt') as string
	let data = await loadPlayerData(jwt)
	console.log('data')
	console.log(jwt)
	let playerSkill = await loadPlayerSkillData(jwt)
	console.log(playerSkill)
	return { 
		player: data, 
		playSkils: playerSkill,
		token: jwt
	}
}
