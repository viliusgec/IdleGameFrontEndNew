<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Monster,
		Battle,
		battleData,
		attack,
		monsterData,
		loadMonstersData,
		startBattle,
		resetBattle
	} from '../../../stores/battleStore';
	import MonsterCard from '$lib/components/combat/MonsterCard.svelte';
	import MonsterCombatCard from '$lib/components/combat/MonsterCombatCard.svelte';
	export let data;
	export let monsters: Monster[];
	export let battle: Battle;

	onMount(async () => {
		await loadMonstersData(data.token);
	});

	monsterData.subscribe((value) => {
		monsters = value;
	});

	battleData.subscribe((value) => {
		battle = value;
	});
</script>

<div class="mb-16">
	<dh-component>
		{#if battle.id != 0}
		<h1 class="font-bold text-3xl text-center mb-1">Battle</h1>

		<!-- ------------------------------------ -->
		<MonsterCombatCard token = {data.token} />
	<!-- ----------------------------------------  -->




			<!-- <p class="text-gray-800 text-sm text-center">You are fighting {battle.monster}</p>
			<p class="text-gray-800 text-sm text-center">You have {battle.playerHP} health</p>
			<p class="text-gray-800 text-sm text-center">The monster has {battle.monsterHP} health</p>
			{#if battle.battleFinished}
				{#if battle.playerHP <= 0}
					<p class="text-gray-800 text-sm text-center">You have died</p>
				{:else if battle.monsterHP <= 0}
					<p class="text-gray-800 text-sm text-center">You have won</p>
				{/if}
				{#if battle.itemGiven}
					<p class="text-gray-800 text-sm text-center">You have received item</p>
				{/if}
				<form method="POST" action="/combat">
					<button
						on:click={() => resetBattle()}
						type="button"
						class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
						>Fight new enemy</button
					>
				</form>
			{:else}
				<form method="POST" action="/combat">
					<button
						on:click={() => attack(battle, data.token)}
						type="button"
						class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
						>Attack</button
					>
				</form>
			{/if} -->
		{:else}
			<h1 class="font-bold text-3xl text-center mb-1">Select a monster</h1>

			<div class="mb-16">
				<dh-component>
					<div class="container mx-auto">
						<div
							role="list"
							aria-label="Behind the scenes People "
							class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
						>
							{#each monsters as monster, i}
								<MonsterCard monster={monster} token = {data.token} />
							{/each}
						</div>
					</div>
				</dh-component>
			</div>
		{/if}
	</dh-component>
</div>
