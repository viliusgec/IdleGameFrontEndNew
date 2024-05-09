<script lang="ts">
	import { achievementsData, claimAchievement } from '../../stores/achievementsStore';

	export let token: string;
</script>

<div class="flex flex-col w-full lg:flex-row justify-center">
		<table class="table w-3/4">
			<thead>
				<tr>
					<th>Description</th>
					<th>Progress</th>
					<th>Reward (XP)</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each $achievementsData as achievement}
					<tr>
						<td> {achievement.description} </td>
						<td> {achievement.count} / {achievement.requiredCount} </td>
						<td> {achievement.reward} </td>
						<th>
							{#if achievement.achieved}
								<button class="btn btn-ghost btn-xs btn-disabled">Claimed</button>
							{:else if achievement.count < achievement.requiredCount}
								<button class="btn btn-ghost btn-xs btn-disabled">Claim</button>
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
