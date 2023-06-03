<script lang="ts">
	import { achievementsData, claimAchievement } from '../../stores/achievementsStore';

	export let token: string;
</script>

<div class="flex flex-col w-full lg:flex-row">
	<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
		<table class="table w-full">
			<thead>
				<tr>
					<th>Skill Type</th>
					<th>Required XP</th>
					<th>Reward</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each $achievementsData as achievement}
					<tr>
						<td> {achievement.skillType} </td>
						<td> {achievement.requiredXP} </td>
						<td> {achievement.reward} </td>
						<th>
							<!-- Check if player has required xp -->
							{#if achievement.achieved}
								<button class="btn btn-ghost btn-xs">Claimed</button>
							{:else}
								<button
									class="btn btn-ghost btn-xs"
									on:click={() => claimAchievement(token, achievement.id)}>Claim</button
								>
							{/if}
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
