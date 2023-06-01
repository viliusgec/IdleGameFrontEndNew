<script lang="ts">
	import { leaderboardData, getLeaderboardBySkill } from '../../stores/leaderboardStore';
	// export let skill: string;
	// getLeaderboardBySkill(skill);
	// export function selectItem(){
	// 	selectedPlayerItemData.set(playerItem)
	// }
</script>

<div class="flex flex-col w-full lg:flex-row">
	<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
		<table class="table w-full">
			<thead>
				<tr>
					<th>Rank</th>
					<th>Name</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody>
				{#each $leaderboardData as leader, i}
					<tr>
						<td>#{i+1}</td>
						<td>
							<div>
								<div class="font-bold">{leader.playerUsername}</div>
							</div>
						</td>
						<td> {leader.experience} </td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
