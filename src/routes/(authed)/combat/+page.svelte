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

	export let data;
	export let monsters: Monster[];
	export let battle: Battle;
	export let selected: string;

	onMount(async () => {
		await loadMonstersData(data.token);
	});

	monsterData.subscribe((value) => {
		monsters = value;
	});

	battleData.subscribe((value) => {
		battle = value;
		console.log(battle);
	});
</script>

<div class="mb-16">
	<dh-component>
		<h1 class="font-bold text-3xl text-center mb-1">Combat</h1>
		<h1 class="font-bold text-3xl text-center mb-1">Battle</h1>
		{#if battle.id != 0}
			<p class="text-gray-800 text-sm text-center">You are fighting {battle.monster}</p>
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
			{/if}
		{:else}
			<h1 class="font-bold text-3xl text-center mb-1">Select a monster</h1>
			<h1 class="font-bold text-3xl text-center mb-1">Monsters</h1>
			<select bind:value={selected}>
				{#each monsters as monster, i}
					<option value={monster.name}>
						{monster.name}
					</option>
				{/each}
			</select>
			<form method="POST" action="/combat">
				<button
					on:click={() => startBattle(selected, data.token)}
					type="button"
					class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
					>Start Battle</button
				>
			</form>
		{/if}
	</dh-component>
</div>
