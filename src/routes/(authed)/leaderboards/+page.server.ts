import { getLeaderboardBySkill } from '../../../stores/leaderboardStore';

export async function load({ parent }) {
	await parent();
	await getLeaderboardBySkill('Woodcutting');
}
