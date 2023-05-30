import { redirect } from '@sveltejs/kit';
import { loadPlayerData } from '../../../stores/playerStore';
import { loadPlayerSkillData } from '../../../stores/skillStore';
import { Skill, trainSkill, playerSkillData } from '../../../stores/skillStore';

export async function load({ cookies, parent }) {
	
	await parent();
	// let data = await loadPlayerData(jwt)
	// let playerSkill = await loadPlayerSkillData(jwt)
	// return { 
	// 	player: data, 
	// 	playSkils: playerSkill
	// }
}

// export const actions = {
// 	default: async ({ cookies, request }) => {
// 		const data = await request.formData();

// 		const user = {
// 			username: data.get('username'),
// 			email: data.get('email'),
// 			password: data.get('password')
//             id: number;
//             name: string;
//             experience: number;
// 		} as Skill;
//         let token = cookies.get('jwt');
//         const body = await trainSkill(user, token);

// 		// if (body === undefined) {
// 		// 	return fail(401);
// 		// }

		
// 		// throw redirect(307, '/profile');
// 	}
// };
