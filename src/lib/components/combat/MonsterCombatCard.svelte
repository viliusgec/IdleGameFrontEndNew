<script lang="ts">
	import {
		Battle,
		battleData,
		attack,
		resetBattle,
		selectedMonster
	} from '../../../stores/battleStore';

	export let token: string;
	let battle: Battle;

	battleData.subscribe((value) => {
		battle = value;
	});
</script>

<div class="container mx-auto">
	<div
		role="list"
		aria-label="Behind the scenes People "
		class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
	>
		{#if battle.battleFinished}
			<div class="card w-96 bg-white text-gray-800">
				<div class="card-body">
					{#if battle.playerHP <= 0}
						<h2 class="card-title">You lost!</h2>
					{:else if battle.monsterHP <= 0}
						<h2 class="card-title">You won!</h2>
					{/if}
					{#if battle.itemGiven}
						<p>You have received <b>{$selectedMonster.droppedItem}</b>!</p>
					{:else}
						<p>No items received</p>
					{/if}
					<div class="card-actions justify-end">
						<form method="POST" action="/combat">
							<button on:click={() => resetBattle()} type="button" class="btn text-white"
								>Fight new enemy</button
							>
						</form>
					</div>
				</div>
			</div>
		{:else}
			<div role="listitem" class="xl:w-2/5 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24">
				<div class="rounded overflow-hidden shadow-md bg-white">
					<div class="absolute -mt-20 w-full flex justify-center">
						<div class="h-32 w-32">
							<img
								src="src\lib\images\combat\{battle.monster}.svg"
								alt="Monster"
								class="rounded-full object-cover h-full w-full shadow-md"
							/>
						</div>
					</div>
					<div class="px-6 mt-16">
						<h1 class="font-bold text-primary text-3xl text-center mb-1">{battle.monster}</h1>
						<p class="text-gray-800 text-sm text-center">HP: {battle.monsterHP}</p>
						<form method="POST" action="/combat">
							<button
								on:click={() => attack(battle, token)}
								type="button"
								class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
								>Attack</button
							>
						</form>
					</div>
				</div>
			</div>
			<div role="listitem" class="xl:w-2/5 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24">
				<div class="rounded overflow-hidden shadow-md bg-white">
					<div class="absolute -mt-20 w-full flex justify-center">
						<div class="h-32 w-32">
							<img
								src="src\lib\images\combat\char.svg"
								alt="Monster"
								class="rounded-full object-cover h-full w-full shadow-md"
							/>
						</div>
					</div>
					<div class="px-6 mt-16">
						<h1 class="font-bold text-3xl text-primary text-center mb-1">{battle.player}</h1>
						<p class="text-gray-800 text-sm text-center">HP: {battle.playerHP}</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
