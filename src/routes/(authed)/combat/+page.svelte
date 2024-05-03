<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Monster,
		Battle,
		battleData,
		monsterData,
		loadMonstersData
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
			<h1 class="font-bold text-3xl text-primary text-center mb-1">Battle</h1>
			<MonsterCombatCard token={data.token} />
		{:else}
			<h1 class="font-bold text-3xl text-center mb-1 text-primary">Select a monster</h1>

			<div class="mb-16">
				<dh-component>
					<div class="container mx-auto">
						<div
							role="list"
							aria-label="Behind the scenes People "
							class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
						>
							{#each monsters as monster, i}
								<MonsterCard {monster} token={data.token} />
							{/each}
						</div>
					</div>
				</dh-component>
			</div>
		{/if}
	</dh-component>
</div>
