<script lang="ts">
	import LeaderboardCard from '$lib/components/LeaderboardTable.svelte';
	import { getLeaderboardBySkill } from '../../../stores/leaderboardStore';

	let activeSkill = 'Woodcutting';
	getLeaderboardBySkill(activeSkill);
</script>

<div class="flex flex-col w-full lg:flex-row justify-center">
	<div
		role="list"
		aria-label="Behind the scenes People"
		class="lg:flex pt-4 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
	>
		<div class="btn-group mb-4">
			<button
				id="sellButton"
				class="btn"
				class:btn-active={activeSkill === 'Woodcutting'}
				on:click={() => {
					activeSkill = 'Woodcutting';
					getLeaderboardBySkill(activeSkill);
				}}>Woodcutting</button
			>
			<button
				id="buyButton"
				class="btn"
				class:btn-active={activeSkill === 'Firemaking'}
				on:click={() => {
					activeSkill = 'Firemaking';
					getLeaderboardBySkill(activeSkill);
				}}>Firemaking</button
			>
			<button
				id="listingsButton"
				class="btn"
				class:btn-active={activeSkill === 'Mining'}
				on:click={() => {
					activeSkill = 'Mining';
					getLeaderboardBySkill(activeSkill);
				}}>Mining</button
			>
			<button
				id="listingsButton"
				class="btn"
				class:btn-active={activeSkill === 'Smithing'}
				on:click={() => {
					activeSkill = 'Smithing';
					getLeaderboardBySkill(activeSkill);
				}}>Smithing</button
			>
			<button
				id="listingsButton"
				class="btn"
				class:btn-active={activeSkill === 'Fishing'}
				on:click={() => {
					activeSkill = 'Fishing';
					getLeaderboardBySkill(activeSkill);
				}}>Fishing</button
			>
			<button
				id="listingsButton"
				class="btn"
				class:btn-active={activeSkill === 'Cooking'}
				on:click={() => {
					activeSkill = 'Cooking';
					getLeaderboardBySkill(activeSkill);
				}}>Cooking</button
			>
		</div>
		<LeaderboardCard />
	</div>
</div>
