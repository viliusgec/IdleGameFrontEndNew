<script lang="ts">
	import LeaderboardCard from '$lib/components/LeaderboardTable.svelte';
	import { getLeaderboardBySkill } from '../../../stores/leaderboardStore';
	
	let activeSkill = 'Woodcutting';
	getLeaderboardBySkill(activeSkill); //Neveik be to cia
</script>

<div
						role="list"
						aria-label="Behind the scenes People"
						class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
					>
					<div class="btn-group">
						<button
							id="sellButton"
							class="btn"
							class:btn-active = {activeSkill === 'Woodcutting'}
							on:click={() => {
								activeSkill = 'Woodcutting';
								getLeaderboardBySkill(activeSkill);
							}}>Woodcutting</button
						>
						<button
							id="buyButton"
							class="btn"
							class:btn-active = {activeSkill === 'Firemaking'}
							on:click={() => {
								activeSkill = 'Firemaking';
								getLeaderboardBySkill(activeSkill);
							}}>Firemaking</button
						>
						<button
							id="listingsButton"
							class="btn"
							class:btn-active = {activeSkill === 'Mining'}
							on:click={() => {
								activeSkill = 'Mining';
								getLeaderboardBySkill(activeSkill);
							}}>Mining</button
						>
					</div>
						<LeaderboardCard />
					</div>
